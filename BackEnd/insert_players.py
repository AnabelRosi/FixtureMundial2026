from app import app
from models.db import db
from models.player import Player
from models.teams import Teams

# Datos de prueba: jugadores destacados (nombres de equipos coinciden con mockData)
players_data = [
    # Argentina
    {"name": "Lionel Messi", "team": "Argentina", "position": "FW", "goals": 3, "assists": 2},
    {"name": "Emiliano Martínez", "team": "Argentina", "position": "GK", "goals": 0, "assists": 0},
    {"name": "Ángel Di María", "team": "Argentina", "position": "FW", "goals": 1, "assists": 1},
    {"name": "Nicolás Otamendi", "team": "Argentina", "position": "DF", "goals": 0, "assists": 0},
    {"name": "Leandro Paredes", "team": "Argentina", "position": "MF", "goals": 0, "assists": 1},
    {"name": "Rodrigo De Paul", "team": "Argentina", "position": "MF", "goals": 0, "assists": 0},
    {"name": "Lautaro Martínez", "team": "Argentina", "position": "FW", "goals": 2, "assists": 0},
    {"name": "Julián Álvarez", "team": "Argentina", "position": "FW", "goals": 1, "assists": 1},
    
    # Brasil
    {"name": "Vinicius Jr.", "team": "Brasil", "position": "FW", "goals": 2, "assists": 1},
    {"name": "Rodrygo", "team": "Brasil", "position": "FW", "goals": 1, "assists": 0},
    {"name": "Alisson Becker", "team": "Brasil", "position": "GK", "goals": 0, "assists": 0},
    {"name": "Marquinhos", "team": "Brasil", "position": "DF", "goals": 0, "assists": 0},
    {"name": "Casemiro", "team": "Brasil", "position": "MF", "goals": 0, "assists": 1},
    {"name": "Neymar", "team": "Brasil", "position": "FW", "goals": 2, "assists": 1},
    {"name": "Raphinha", "team": "Brasil", "position": "FW", "goals": 1, "assists": 0},
    {"name": "Lucas Paquetá", "team": "Brasil", "position": "MF", "goals": 0, "assists": 1},
    
    # Francia
    {"name": "Kylian Mbappé", "team": "Francia", "position": "FW", "goals": 2, "assists": 2},
    {"name": "Antoine Griezmann", "team": "Francia", "position": "FW", "goals": 1, "assists": 1},
    {"name": "Mike Maignan", "team": "Francia", "position": "GK", "goals": 0, "assists": 0},
    {"name": "Jules Koundé", "team": "Francia", "position": "DF", "goals": 0, "assists": 0},
    {"name": "Aurélien Tchouaméni", "team": "Francia", "position": "MF", "goals": 0, "assists": 1},
    {"name": "Ousmane Dembélé", "team": "Francia", "position": "FW", "goals": 1, "assists": 1},
    {"name": "Marcus Thuram", "team": "Francia", "position": "FW", "goals": 0, "assists": 0},
    
    # España
    {"name": "Lamine Yamal", "team": "España", "position": "FW", "goals": 1, "assists": 2},
    {"name": "Álvaro Morata", "team": "España", "position": "FW", "goals": 2, "assists": 0},
    {"name": "Pedri", "team": "España", "position": "MF", "goals": 0, "assists": 1},
    {"name": "Gavi", "team": "España", "position": "MF", "goals": 0, "assists": 0},
    {"name": "Rodri", "team": "España", "position": "MF", "goals": 0, "assists": 0},
    {"name": "Unai Simón", "team": "España", "position": "GK", "goals": 0, "assists": 0},
    {"name": "Dani Olmo", "team": "España", "position": "FW", "goals": 1, "assists": 0},
    
    # Inglaterra
    {"name": "Harry Kane", "team": "Inglaterra", "position": "FW", "goals": 3, "assists": 0},
    {"name": "Jude Bellingham", "team": "Inglaterra", "position": "MF", "goals": 1, "assists": 2},
    {"name": "Bukayo Saka", "team": "Inglaterra", "position": "FW", "goals": 1, "assists": 1},
    {"name": "Declan Rice", "team": "Inglaterra", "position": "MF", "goals": 0, "assists": 0},
    {"name": "Phil Foden", "team": "Inglaterra", "position": "FW", "goals": 0, "assists": 1},
    {"name": "Jordan Pickford", "team": "Inglaterra", "position": "GK", "goals": 0, "assists": 0},
    
    # Alemania
    {"name": "Jamal Musiala", "team": "Alemania", "position": "MF", "goals": 1, "assists": 1},
    {"name": "Florian Wirtz", "team": "Alemania", "position": "MF", "goals": 0, "assists": 2},
    {"name": "Manuel Neuer", "team": "Alemania", "position": "GK", "goals": 0, "assists": 0},
    {"name": "Joshua Kimmich", "team": "Alemania", "position": "MF", "goals": 0, "assists": 0},
    {"name": "Kai Havertz", "team": "Alemania", "position": "FW", "goals": 1, "assists": 0},
    
    # Portugal
    {"name": "Cristiano Ronaldo", "team": "Portugal", "position": "FW", "goals": 2, "assists": 0},
    {"name": "João Félix", "team": "Portugal", "position": "FW", "goals": 0, "assists": 1},
    {"name": "Bruno Fernandes", "team": "Portugal", "position": "MF", "goals": 1, "assists": 1},
    {"name": "Bernardo Silva", "team": "Portugal", "position": "MF", "goals": 0, "assists": 0},
    {"name": "Diogo Costa", "team": "Portugal", "position": "GK", "goals": 0, "assists": 0},
    
    # Países Bajos
    {"name": "Virgil van Dijk", "team": "Países Bajos", "position": "DF", "goals": 0, "assists": 0},
    {"name": "Frenkie de Jong", "team": "Países Bajos", "position": "MF", "goals": 0, "assists": 1},
    {"name": "Memphis Depay", "team": "Países Bajos", "position": "FW", "goals": 1, "assists": 0},
    {"name": "Cody Gakpo", "team": "Países Bajos", "position": "FW", "goals": 0, "assists": 0},
    
    # Bélgica
    {"name": "Kevin De Bruyne", "team": "Bélgica", "position": "MF", "goals": 1, "assists": 2},
    {"name": "Romelu Lukaku", "team": "Bélgica", "position": "FW", "goals": 2, "assists": 0},
    {"name": "Thibaut Courtois", "team": "Bélgica", "position": "GK", "goals": 0, "assists": 0},
]

with app.app_context():
    # Asegurar que los equipos existan en la tabla teams
    team_names = set(p["team"] for p in players_data)
    for name in team_names:
        if not Teams.query.filter_by(name=name).first():
            db.session.add(Teams(name=name, city="", country=""))
    db.session.commit()
    print("✅ Equipos verificados/creados.")

    # Insertar jugadores (evitar duplicados)
    inserted = 0
    for p in players_data:
        existing = Player.query.filter_by(name=p["name"], team=p["team"]).first()
        if not existing:
            db.session.add(Player(**p))
            inserted += 1
    db.session.commit()
    print(f"✅ {inserted} jugadores insertados correctamente.")