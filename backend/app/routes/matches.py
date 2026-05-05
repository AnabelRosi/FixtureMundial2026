from flask import Blueprint, jsonify
from app.models import Partido

matches_bp = Blueprint('matches', __name__)

@matches_bp.route('/api/partidos', methods=['GET'])
def get_partidos():
    partidos = Partido.obtener_todos()
    return jsonify(partidos)