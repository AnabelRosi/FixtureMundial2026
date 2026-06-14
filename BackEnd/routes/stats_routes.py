# Endpoints para estadísticas
from flask import Blueprint, jsonify
from ..models import db, Match
from sqlalchemy import func

stats_bp = Blueprint('stats', __name__)

# GET /api/stats/goals-per-team
