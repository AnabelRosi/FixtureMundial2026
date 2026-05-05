from flask import Blueprint, jsonify
from app.models import Partido

reset_bp = Blueprint('reset', __name__)

@reset_bp.route('/api/reiniciar', methods=['POST'])
def reiniciar_checklist():
    Partido.resetear_vistos()
    return jsonify({'mensaje': 'Checklist reiniciado'}), 200