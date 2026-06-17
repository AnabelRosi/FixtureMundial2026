from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from models.users import Users
from models.db import db
import jwt
import os
from datetime import datetime, timedelta
from functools import wraps

api_bp = Blueprint('api', __name__, url_prefix='/api')

SECRET_KEY = os.getenv('SECRET_KEY', 'fifa2026secretkey')

def generate_token(user):
    payload = {
        'user_id': user.id,
        'username': user.name,
        'role': user.type,
        'exp': datetime.utcnow() + timedelta(hours=24)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
        if not token:
            return jsonify({'message': 'Token requerido'}), 401
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = Users.query.get(data['user_id'])
            if not current_user:
                return jsonify({'message': 'Usuario no encontrado'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expirado'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token inválido'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

def admin_required(f):
    @wraps(f)
    def decorated(current_user, *args, **kwargs):
        if not current_user.is_admin():
            return jsonify({'message': 'Se requieren permisos de administrador'}), 403
        return f(current_user, *args, **kwargs)
    return decorated

# ══════════════════════════════════════════════════════════════════════════════
# AUTH
# ══════════════════════════════════════════════════════════════════════════════

@api_bp.route('/login', methods=['POST'])
@cross_origin()
def api_login():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': 'Usuario y contraseña son requeridos'}), 400
    user = Users.query.filter_by(name=data['username']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({'message': 'Usuario o contraseña incorrectos'}), 401
    if not user.is_active:
        return jsonify({'message': 'Usuario desactivado'}), 403
    token = generate_token(user)
    return jsonify({
        'token': token,
        'user': {
            'id': user.id,
            'username': user.name,
            'email': user.email,
            'role': user.type
        }
    }), 200

@api_bp.route('/register', methods=['POST'])
@cross_origin()
def api_register():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'Datos requeridos'}), 400
    username = data.get('username')
    email    = data.get('email')
    password = data.get('password')
    if not username or not email or not password:
        return jsonify({'message': 'username, email y password son requeridos'}), 400
    if Users.query.filter_by(name=username).first():
        return jsonify({'message': 'El nombre de usuario ya existe'}), 409
    if Users.query.filter_by(email=email).first():
        return jsonify({'message': 'El email ya está registrado'}), 409
    new_user = Users(name=username, email=email, type='user')
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    token = generate_token(new_user)
    return jsonify({
        'token': token,
        'user': {
            'id': new_user.id,
            'username': new_user.name,
            'email': new_user.email,
            'role': new_user.type
        }
    }), 201

@api_bp.route('/me', methods=['GET'])
@cross_origin()
@token_required
def api_me(current_user):
    return jsonify({
        'id': current_user.id,
        'username': current_user.name,
        'email': current_user.email,
        'role': current_user.type
    }), 200

# ══════════════════════════════════════════════════════════════════════════════
# USUARIOS
# ══════════════════════════════════════════════════════════════════════════════

@api_bp.route('/users', methods=['GET'])
@cross_origin()
@token_required
@admin_required
def api_get_users(current_user):
    users = Users.query.all()
    return jsonify([{
        'id': u.id,
        'username': u.name,
        'email': u.email,
        'role': u.type,
        'is_active': u.is_active,
        'createdAt': u.created_at.strftime('%Y-%m-%d') if u.created_at else None
    } for u in users]), 200

@api_bp.route('/users', methods=['POST'])
@cross_origin()
@token_required
@admin_required
def api_create_user(current_user):
    data = request.get_json()
    username = data.get('username')
    email    = data.get('email')
    password = data.get('password')
    role     = data.get('role', 'user')
    if not username or not email or not password:
        return jsonify({'message': 'username, email y password son requeridos'}), 400
    if Users.query.filter_by(name=username).first():
        return jsonify({'message': 'El nombre de usuario ya existe'}), 409
    new_user = Users(name=username, email=email, type=role)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        'id': new_user.id,
        'username': new_user.name,
        'email': new_user.email,
        'role': new_user.type,
        'createdAt': new_user.created_at.strftime('%Y-%m-%d') if new_user.created_at else None
    }), 201

@api_bp.route('/users/<int:user_id>', methods=['PUT'])
@cross_origin()
@token_required
@admin_required
def api_update_user(current_user, user_id):
    user = Users.query.get_or_404(user_id)
    data = request.get_json()
    if 'username' in data:
        existing = Users.query.filter_by(name=data['username']).first()
        if existing and existing.id != user_id:
            return jsonify({'message': 'El nombre de usuario ya existe'}), 409
        user.name = data['username']
    if 'email' in data:
        existing = Users.query.filter_by(email=data['email']).first()
        if existing and existing.id != user_id:
            return jsonify({'message': 'El email ya está registrado'}), 409
        user.email = data['email']
    if 'role' in data:
        user.type = data['role']
    if 'password' in data and data['password']:
        user.set_password(data['password'])
    if 'is_active' in data:
        user.is_active = data['is_active']
    db.session.commit()
    return jsonify({
        'id': user.id,
        'username': user.name,
        'email': user.email,
        'role': user.type,
        'is_active': user.is_active
    }), 200

@api_bp.route('/users/<int:user_id>', methods=['DELETE'])
@cross_origin()
@token_required
@admin_required
def api_delete_user(current_user, user_id):
    if current_user.id == user_id:
        return jsonify({'message': 'No podés eliminar tu propia cuenta'}), 400
    user = Users.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Usuario eliminado correctamente'}), 200

# ══════════════════════════════════════════════════════════════════════════════
# EQUIPOS
# ══════════════════════════════════════════════════════════════════════════════

@api_bp.route('/teams', methods=['GET'])
@cross_origin()
def get_teams():
    from models.teams import Teams
    teams = Teams.query.all()
    return jsonify([{
        'id': t.id,
        'name': t.name,
        'city': t.city,
        'country': t.country
    } for t in teams])

@api_bp.route('/teams/<int:team_id>', methods=['GET'])
@cross_origin()
def get_team(team_id):
    from models.teams import Teams
    team = Teams.query.get_or_404(team_id)
    return jsonify({
        'id': team.id,
        'name': team.name,
        'city': team.city,
        'country': team.country
    })

# ══════════════════════════════════════════════════════════════════════════════
# JUGADORES
# ══════════════════════════════════════════════════════════════════════════════

@api_bp.route('/players', methods=['GET'])
@cross_origin()
def get_players():
    from models.player import Player
    players = Player.query.all()
    return jsonify([{
        'id': p.id,
        'name': p.name,
        'team': p.team,
        'position': p.position,
        'goals': p.goals or 0,
        'assists': p.assists or 0
    } for p in players])

@api_bp.route('/players/<int:player_id>', methods=['GET'])
@cross_origin()
def get_player(player_id):
    from models.player import Player
    player = Player.query.get_or_404(player_id)
    return jsonify({
        'id': player.id,
        'name': player.name,
        'team': player.team,
        'position': player.position,
        'goals': player.goals or 0,
        'assists': player.assists or 0
    })