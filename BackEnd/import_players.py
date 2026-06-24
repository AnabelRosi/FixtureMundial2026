import json
from app import app
from models.db import db
from models.player import Player
from models.teams import Teams

JSON_PATH = "data/players.json"

def import_players():
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    players_data = data.get("players", [])
    if not players_data:
        print("❌ No se encontraron jugadores en el archivo.")
        return

    with app.app_context():
        # Mapeo de team_id a nombre de equipo
        team_map = {}
        for team in Teams.query.all():
            team_map[team.id] = team.name

        inserted = 0
        skipped = 0

        for p in players_data:
            team_id = p.get("team ID")
            team_name = team_map.get(team_id)
            if not team_name:
                print(f"⚠️ Equipo no encontrado para ID {team_id}, jugador {p.get('name')} omitido.")
                skipped += 1
                continue

            full_name = f"{p.get('name', '')} {p.get('surname', '')}".strip()
            if not full_name:
                full_name = p.get('name', 'Sin nombre')

            # Verificar si ya existe
            existing = Player.query.filter_by(name=full_name, team=team_name).first()
            if existing:
                skipped += 1
                continue

            new_player = Player(
                name=full_name,
                team=team_name,
                position=p.get('position', ''),
                goals=p.get('goals', 0) or 0,
                assists=p.get('assists', 0) or 0
            )
            db.session.add(new_player)
            inserted += 1

        db.session.commit()
        print(f"✅ Jugadores insertados: {inserted}")
        print(f"⏭️ Jugadores omitidos (ya existían o sin equipo): {skipped}")

if __name__ == "__main__":
    import_players()