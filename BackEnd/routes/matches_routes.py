from flask import Blueprint, request, jsonify
from ..models import Match
from ..extensions import db
from .auth_routes import token_required, admin_required
from sqlalchemy import or_

matches_bp = Blueprint('matches', __name__)

# ==================== READ  ====================
@matches_bp.route('/', methods=['GET'])
def get_matches():
   
    stage = request.args.get('stage')
    date = request.args.get('date')
    home = request.args.get('home')
    away = request.args.get('away')
    team = request.args.get('team')
    team1 = request.args.get('team1')
    team2 = request.args.get('team2')

    query = Match.query

    # Filtros básicos
    if stage:
        query = query.filter(Match.stage == stage)
    if date:
        query = query.filter(Match.date == date)
    
    # Filtros por equipos
    if home:
        query = query.filter(Match.home_team == home)
    if away:
        query = query.filter(Match.away_team == away)
    if team:
        query = query.filter(or_(Match.home_team == team, Match.away_team == team))
    if team1 and team2:
        # Enfrentamiento directo: un partido donde estén ambos equipos (sin importar local/visitante)
        query = query.filter(
            or_(
                (Match.home_team == team1) & (Match.away_team == team2),
                (Match.home_team == team2) & (Match.away_team == team1)
            )
        )

    matches = query.order_by(Match.id).all()
    return jsonify([m.to_dict() for m in matches]), 200

# ==================== READ (uno por ID) ====================
@matches_bp.route('/<int:match_id>', methods=['GET'])
def get_match(match_id):
    match = Match.query.get_or_404(match_id)
    return jsonify(match.to_dict()), 200

# ==================== CREATE ====================
@matches_bp.route('/', methods=['POST'])
@token_required
@admin_required
def create_match():
    data = request.get_json()
    required_fields = ['stage', 'home_team', 'away_team', 'date', 'time', 'venue']
    missing = [f for f in required_fields if f not in data]
    if missing:
        return jsonify({'message': f'Faltan campos: {missing}'}), 400

    match = Match(
        stage=data['stage'],
        home_team=data['home_team'],
        away_team=data['away_team'],
        date=data['date'],
        time=data['time'],
        venue=data['venue'],
        home_score=data.get('home_score'),
        away_score=data.get('away_score'),
        checked=data.get('checked', False)
    )
    db.session.add(match)
    db.session.commit()
    return jsonify(match.to_dict()), 201

# ==================== UPDATE ====================
@matches_bp.route('/<int:match_id>', methods=['PUT'])
@token_required
@admin_required
def update_match(match_id):
    match = Match.query.get_or_404(match_id)
    data = request.get_json()
    updatable_fields = ['stage', 'home_team', 'away_team', 'date', 'time', 
                        'venue', 'home_score', 'away_score', 'checked']
    for field in updatable_fields:
        if field in data:
            setattr(match, field, data[field])
    db.session.commit()
    return jsonify(match.to_dict()), 200

# ==================== DELETE ====================
@matches_bp.route('/<int:match_id>', methods=['DELETE'])
@token_required
@admin_required
def delete_match(match_id):
    match = Match.query.get_or_404(match_id)
    db.session.delete(match)
    db.session.commit()
    return jsonify({'message': 'Partido eliminado correctamente'}), 200