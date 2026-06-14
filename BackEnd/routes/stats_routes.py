
from flask import Blueprint, jsonify
from ..models import db, Match
from sqlalchemy import func

stats_bp = Blueprint('stats', __name__)

@stats_bp.route('/goals-per-team', methods=['GET'])
def goals_per_team():
    home_goals = db.session.query(Match.home_team, func.sum(Match.home_score).label('goals')).filter(Match.home_score != None).group_by(Match.home_team).all()
    away_goals = db.session.query(Match.away_team, func.sum(Match.away_score).label('goals')).filter(Match.away_score != None).group_by(Match.away_team).all()

    goals = {}
    for team, g in home_goals:
        goals[team] = g if g else 0    
    for team, g in away_goals:
        goals[team] = goals.get(team, 0) + (g if g else 0)

    return jsonify(goals), 200

@stats_bp.route('/matches-per-stage', methods=['GET'])
def matches_per_stage():
    stages = db.session.query(Match.stage, func.count(Match.id)).group_by(Match.stage).all()
    return jsonify([{'stage': s, 'count': c} for s, c in stages]), 200
