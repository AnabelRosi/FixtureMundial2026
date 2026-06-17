import json
from app import app
from models.db import db
from models.player import Player
from models.teams import Teams

# Ruta al archivo JSON
JSON_PATH = "data/players.json"

def import_players():
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    players_data = data.get("players", [])
    if not players_data:
        print("❌ No se encontraron jugadores en el archivo.")
        return

    with app.app_context():
        # Crear un diccionario para mapear team_id -> nombre del equipo
        team_map = {}
        for team in Teams.query.all():
            team_map[team.id] = team.name

        inserted = 0
        skipped = 0

        for p in players_data:
            # Obtener el nombre del equipo
            team_id = p.get("team ID")
            team_name = team_map.get(team_id)
            if not team_name:
                print(f"⚠️ Equipo no encontrado para ID {team_id}, jugador {p.get('name')} omitido.")
                skipped += 1
                continue

            # Extraer datos básicos
            name = p.get("name", "").strip()
            surname = p.get("surname", "").strip()
            full_name = f"{name} {surname}".strip()
            if not full_name:
                full_name = name

            position = p.get("position", "")
            # Mapear posiciones en inglés a abreviaturas si es necesario
            # Pero dejamos como está, el frontend muestra el nombre completo
            goals = p.get("goals", 0) or 0
            assists = p.get("assists", 0) or 0

            # Verificar si el jugador ya existe (por nombre y equipo)
            existing = Player.query.filter_by(name=full_name, team=team_name).first()
            if existing:
                # Actualizar datos si se desea (opcional)
                # existing.position = position
                # existing.goals = goals
                # existing.assists = assists
                # db.session.commit()
                skipped += 1
                continue

            new_player = Player(
                name=full_name,
                team=team_name,
                position=position,
                goals=goals,
                assists=assists
            )
            db.session.add(new_player)
            inserted += 1

        db.session.commit()
        print(f"✅ Jugadores insertados: {inserted}")
        print(f"⏭️ Jugadores omitidos (ya existían o sin equipo): {skipped}")

if __name__ == "__main__":
    import_players()