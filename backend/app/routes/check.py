from flask import Blueprint, jsonify
from app.models import Partido

check_bp = Blueprint('check', __name__)

@check_bp.route('/api/partidos/<int:id>/marcar', methods=['PATCH'])
def marcar_partido(id):
    nuevo_estado, status_code = Partido.toggle_visto(id)
    if not nuevo_estado:
        return jsonify({'error': 'Partido no encontrado'}), 404
    return jsonify({'id': id, 'visto': nuevo_estado})