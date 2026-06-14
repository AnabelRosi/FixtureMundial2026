# Endpoints para partidos (listar, actualizar resultados)
from flask import Blueprint, request, jsonify
from ..models import db, Match
from .auth_routes import token_required

matches_bp = Blueprint('matches', __name__)

@matches_bp.route('/matches', methods=['GET'])
def get_matches():
    stage = request.args.get('stage')
    date = request.args.get('date')
    group = request.args.get('group')

    query = Match.query
    if stage:
        query = query.filter(Match.stage==stage)
    if date:
        query = query.filter_by(Match.date==date)
    if group:
        query = query.filter(Match.stage.like(f'Grupo {group}%'))

    matches = query.order_by(Match.id).all()
    return jsonify([m.to_dict() for m in matches]), 200

@matches_bp.route('/matches/<int:match_id>', methods=['PUT'])
@token_required 
@admin_required
def update_match_result(match_id):
    match = Match.query.get_or_404(match_id)
    data = request.get_json()

    if 'home_score' in data:
        match.home_score = data['home_score']
    if 'away_score' in data:
        match.away_score = data['away_score']
    if 'checked' in data:
        match.checked = data['checked'] 
    if 'date' in data:
        match.date = data['date']   
    if 'time' in data:
        match.time = data['time']
    if 'venue' in data:
        match.venue = data['venue']

    db.session.commit()
    return jsonify(match.to_dict()), 200

@matches_bp.route('/groups', methods=['GET'])
def get_groups():
    groups = [chr(ord)('A') + str(i) for i in range(12)]
    return jsonify(groups), 200
