from flask import Flask, jsonify, request
from flask_cors import CORS
from models.player import Player

app = Flask(__name__)
CORS(app)

# ---------- RUTAS GET ----------
@app.route('/api/players', methods=['GET'])
def get_players():
    players = Player.load_all()
    return jsonify([p.to_dict() for p in players])

@app.route('/api/players/team/<int:team_id>', methods=['GET'])
def get_players_by_team(team_id):
    players = Player.get_by_team(team_id)
    return jsonify([p.to_dict() for p in players])

@app.route('/api/players/<int:player_id>', methods=['GET'])
def get_player(player_id):
    player = Player.get_by_id(player_id)
    if player:
        return jsonify(player.to_dict())
    return jsonify({"error": "Jugador no encontrado"}), 404

# ---------- RUTA POST (CREAR) ----------
@app.route('/api/players', methods=['POST'])
def create_player():
    data = request.get_json()
    if not data.get('name') or not data.get('surname'):
        return jsonify({"error": "Faltan nombre o apellido"}), 400

    all_players = Player.load_all()
    new_id = max([p.id for p in all_players], default=0) + 1

    player = Player(
        id=new_id,
        name=data.get('name', ''),
        surname=data.get('surname', ''),
        age=data.get('age', 0),
        height=data.get('height', 1.75),
        weight=data.get('weight', 75),
        position=data.get('position', ''),
        jersey_number=data.get('jersey number', 0),
        team_outside_world_cup=data.get('team outside the World Cup', ''),
        debut_date=data.get('date of debut with the national team', ''),
        goals=data.get('goals', 0),
        assists=data.get('assists', 0),
        games_played=data.get('games played', 0),
        photo=data.get('photo', ''),
        team_id=data.get('team ID', 0)
    )
    player.save()
    return jsonify(player.to_dict()), 201

# ---------- RUTA PUT (ACTUALIZAR) ----------
@app.route('/api/players/<int:player_id>', methods=['PUT'])
def update_player(player_id):
    data = request.get_json()
    player = Player.get_by_id(player_id)
    if not player:
        return jsonify({"error": "Jugador no encontrado"}), 404

    player.name = data.get('name', player.name)
    player.surname = data.get('surname', player.surname)
    player.age = data.get('age', player.age)
    player.height = data.get('height', player.height)
    player.weight = data.get('weight', player.weight)
    player.position = data.get('position', player.position)
    player.jersey_number = data.get('jersey number', player.jersey_number)
    player.team_outside_world_cup = data.get('team outside the World Cup', player.team_outside_world_cup)
    player.debut_date = data.get('date of debut with the national team', player.debut_date)
    player.goals = data.get('goals', player.goals)
    player.assists = data.get('assists', player.assists)
    player.games_played = data.get('games played', player.games_played)
    player.photo = data.get('photo', player.photo)
    player.team_id = data.get('team ID', player.team_id)

    player.save()
    return jsonify(player.to_dict())

# ---------- RUTA DELETE (ELIMINAR) ----------
@app.route('/api/players/<int:player_id>', methods=['DELETE'])
def delete_player(player_id):
    player = Player.get_by_id(player_id)
    if not player:
        return jsonify({"error": "Jugador no encontrado"}), 404
    player.delete()
    return jsonify({"message": "Jugador eliminado correctamente"})

# ---------- PUNTO DE ENTRADA ----------
if __name__ == '__main__':
    app.run(debug=True, port=5000)