import json
import os

class Player:
    """Clase que representa un jugador de fútbol."""
    
    def __init__(self, id, name, surname, age, height, weight, position, 
                 jersey_number, team_outside_world_cup, debut_date, 
                 goals, assists, games_played, photo, team_id):
        self.id = id
        self.name = name
        self.surname = surname
        self.age = age
        self.height = height
        self.weight = weight
        self.position = position
        self.jersey_number = jersey_number
        self.team_outside_world_cup = team_outside_world_cup
        self.debut_date = debut_date
        self.goals = goals
        self.assists = assists
        self.games_played = games_played
        self.photo = photo
        self.team_id = team_id

    def to_dict(self):
        """Convierte el objeto en un diccionario para serializar a JSON."""
        return {
            "ID": self.id,
            "name": self.name,
            "surname": self.surname,
            "age": self.age,
            "height": self.height,
            "weight": self.weight,
            "position": self.position,
            "jersey number": self.jersey_number,
            "team outside the World Cup": self.team_outside_world_cup,
            "date of debut with the national team": self.debut_date,
            "goals": self.goals,
            "assists": self.assists,
            "games played": self.games_played,
            "photo": self.photo,
            "team ID": self.team_id
        }

    @classmethod
    def load_all(cls):
        """Carga todos los jugadores desde el archivo JSON."""
        json_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'players.json')
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        players = []
        for p in data['players']:
            player = cls(
                id=p['ID'],
                name=p['name'],
                surname=p['surname'],
                age=p['age'],
                height=p['height'],
                weight=p['weight'],
                position=p['position'],
                jersey_number=p['jersey number'],
                team_outside_world_cup=p['team outside the World Cup'],
                debut_date=p['date of debut with the national team'],
                goals=p['goals'],
                assists=p['assists'],
                games_played=p['games played'],
                photo=p['photo'],
                team_id=p['team ID']
            )
            players.append(player)
        return players

    @classmethod
    def get_by_team(cls, team_id):
        """Filtra jugadores por team ID."""
        all_players = cls.load_all()
        return [p for p in all_players if p.team_id == team_id]

    @classmethod
    def get_by_id(cls, player_id):
        """Busca un jugador por su ID."""
        all_players = cls.load_all()
        for p in all_players:
            if p.id == player_id:
                return p
        return None

    @classmethod
    def save_all(cls, players_list):
        """Guarda una lista de objetos Player en el archivo JSON."""
        json_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'players.json')
        players_dict = [p.to_dict() for p in players_list]
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump({"players": players_dict}, f, indent=2, ensure_ascii=False)

    def save(self):
        """Guarda este jugador (crea o actualiza) en el JSON."""
        all_players = Player.load_all()
        for i, p in enumerate(all_players):
            if p.id == self.id:
                all_players[i] = self
                break
        else:
            all_players.append(self)
        Player.save_all(all_players)

    def delete(self):
        """Elimina este jugador del JSON."""
        all_players = Player.load_all()
        all_players = [p for p in all_players if p.id != self.id]
        Player.save_all(all_players)