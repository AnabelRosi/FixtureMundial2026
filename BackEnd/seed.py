
import json
from datetime import datetime
from pathlib import Path
from app import create_app          
from models import db, Teams, Stadiums, Match, Player   #

# Rutas a los JSON 
BASE_DIR = Path(__file__).parent
FIXTURE_PATH = BASE_DIR / 'data' / 'fixture.json'
PLAYERS_PATH = BASE_DIR / 'data' / 'players.json'

def parse_date(date_str, time_str):
    """Convierte '11 June' y '15:00' a objeto date (año 2026)"""
    month_map = {
        'June': 6, 'July': 7, 'August': 8, 'May': 5,
        'April': 4, 'March': 3, 'February': 2, 'January': 1
    }
    parts = date_str.split()
    day = int(parts[0])
    month = month_map.get(parts[1])
    if not month:
        raise ValueError(f"Mes desconocido: {parts[1]}")
    return datetime(2026, month, day).date()

def load_fixture():
    with open(FIXTURE_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def load_players():
    with open(PLAYERS_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def seed():
    app = create_app()
    with app.app_context():
        # 1. Crear equipos (Teams) con city/country vacíos
        print("🏟️ Creando equipos...")
        fixture = load_fixture()
        team_names = set()
        for group_name, matches in fixture['groups'].items():
            for m in matches:
                team_names.add(m['home'])
                team_names.add(m['away'])
        for round_name, matches in fixture['knockout'].items():
            for m in matches:
                if not m['home'].startswith(('Winner', 'Loser', '1', '2', '3rd')):
                    team_names.add(m['home'])
                if not m['away'].startswith(('Winner', 'Loser', '1', '2', '3rd')):
                    team_names.add(m['away'])
        
        team_id_map = {}
        for name in sorted(team_names):
            team = Teams.query.filter_by(name=name).first()
            if not team:
                team = Teams(name=name, city='', country='')
                db.session.add(team)
                db.session.flush()
                print(f"  ✅ Creado equipo: {name} (ID {team.id})")
            else:
                print(f"  ℹ️ Equipo ya existe: {name} (ID {team.id})")
            team_id_map[name] = team.id
        db.session.commit()

        # 2. Crear estadios (Stadiums) a partir de los venues del fixture
        print("\n🏟️ Creando estadios...")
        venue_names = set()
        for group_name, matches in fixture['groups'].items():
            for m in matches:
                venue_names.add(m['venue'])
        for round_name, matches in fixture['knockout'].items():
            for m in matches:
                venue_names.add(m['venue'])
        
        stadium_id_map = {}
        for venue_name in sorted(venue_names):
            stadium = Stadiums.query.filter_by(name=venue_name).first()
            if not stadium:
                parts = [p.strip() for p in venue_name.split(',')]
                city = parts[1] if len(parts) > 1 else None
                country = parts[2] if len(parts) > 2 else None
                stadium = Stadiums(name=venue_name, city=city, country=country)
                db.session.add(stadium)
                db.session.flush()
                print(f"  ✅ Creado estadio: {venue_name} (ID {stadium.id})")
            else:
                print(f"  ℹ️ Estadio ya existe: {venue_name} (ID {stadium.id})")
            stadium_id_map[venue_name] = stadium.id
        db.session.commit()

        # 3. Cargar partidos (Match)
        print("\n⚽ Cargando partidos...")
        # Fase de grupos
        for group_name, matches in fixture['groups'].items():
            for m in matches:
                match_date = parse_date(m['date'], m['time'])
                stadium_id = stadium_id_map.get(m['venue'])
                if not stadium_id:
                    print(f"  ❌ Estadio no encontrado: {m['venue']}")
                    continue
                existing = Match.query.filter_by(
                    home_team=m['home'],
                    away_team=m['away'],
                    match_date=match_date,
                    stage=group_name
                ).first()
                if existing:
                    continue
                match = Match(
                    stage=group_name,
                    home_team=m['home'],
                    away_team=m['away'],
                    match_date=match_date,
                    stadium_id=stadium_id,
                    checked=bool(m.get('checked', 0))
                )
                db.session.add(match)
        # Eliminatorias
        for round_name, matches in fixture['knockout'].items():
            for m in matches:
                if m['home'].startswith(('Winner', 'Loser', '1', '2', '3rd')):
                    continue
                if m['away'].startswith(('Winner', 'Loser', '1', '2', '3rd')):
                    continue
                match_date = parse_date(m['date'], m['time'])
                stadium_id = stadium_id_map.get(m['venue'])
                if not stadium_id:
                    print(f"  ❌ Estadio no encontrado: {m['venue']}")
                    continue
                existing = Match.query.filter_by(
                    home_team=m['home'],
                    away_team=m['away'],
                    match_date=match_date,
                    stage=round_name
                ).first()
                if existing:
                    continue
                match = Match(
                    stage=round_name,
                    home_team=m['home'],
                    away_team=m['away'],
                    match_date=match_date,
                    stadium_id=stadium_id,
                    checked=bool(m.get('checked', 0))
                )
                db.session.add(match)
        db.session.commit()
        print(f"  ✅ Partidos cargados. Total: {Match.query.count()}")

        # 4. Cargar jugadores (Player)
        try:
            players_data = load_players()
            print("\n👥 Cargando jugadores...")
            id_to_name = {v: k for k, v in team_id_map.items()}
            for p in players_data['players']:
                team_id = p.get('team ID')
                team_name = id_to_name.get(team_id)
                if not team_name:
                    print(f"  ⚠️ Equipo ID {team_id} no encontrado. Jugador {p['name']} omitido.")
                    continue
                full_name = f"{p['name']} {p['surname']}"
                existing = Player.query.filter_by(name=full_name, team=team_name).first()
                if existing:
                    continue
                player = Player(
                    name=full_name,
                    team=team_name,
                    position=p.get('position', ''),
                    goals=p.get('goals', 0),
                    assists=p.get('assists', 0)
                )
                db.session.add(player)
            db.session.commit()
            print(f"  ✅ Jugadores cargados. Total: {Player.query.count()}")
        except FileNotFoundError:
            print("  ℹ️ No se encontró players.json, omitiendo jugadores.")
        except Exception as e:
            print(f"  ❌ Error al cargar jugadores: {e}")

        print("\n🎉 ¡Seed completado!")

if __name__ == '__main__':
    seed()