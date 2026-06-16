from flask import Flask, jsonify, request
from flask_cors import CORS
from models.player import Player

app = Flask(__name__)
CORS(app)  # Permite peticiones desde el frontend React

# Ruta para obtener todos los jugadores
@app.route('/api/players', methods=['GET'])
def get_players():
    players = Player.load_all()
    # Convertir cada objeto Player a diccionario
    players_dict = [p.to_dict() for p in players]
    return jsonify(players_dict)

# Ruta para obtener jugadores por team ID (por ejemplo, /api/players/team/45)
@app.route('/api/players/team/<int:team_id>', methods=['GET'])
def get_players_by_team(team_id):
    players = Player.get_by_team(team_id)
    players_dict = [p.to_dict() for p in players]
    return jsonify(players_dict)

# Ruta para obtener un jugador por su ID
@app.route('/api/players/<int:player_id>', methods=['GET'])
def get_player(player_id):
    player = Player.get_by_id(player_id)
    if player:
        return jsonify(player.to_dict())
    else:
        return jsonify({"error": "Jugador no encontrado"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)