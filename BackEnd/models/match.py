# app/models/match.py
from ..extensions import db
from datetime import datetime

class Match(db.Model):
    __tablename__ = 'matches'

    id = db.Column(db.Integer, primary_key=True)
    
    # Fase del torneo: "Grupo A", "Round of 32", "Quarterfinals", etc.
    stage = db.Column(db.String(50), nullable=False)
    
    # Equipos 
    home_team = db.Column(db.String(100), nullable=False)
    away_team = db.Column(db.String(100), nullable=False)
    
    # Resultados 
    home_score = db.Column(db.Integer, default=None)
    away_score = db.Column(db.Integer, default=None)
    
    # Fecha y hora 
    date = db.Column(db.String(20), nullable=False)
    time = db.Column(db.String(10), nullable=False)
    
    # Estadio
    venue = db.Column(db.String(200), nullable=False)
    
    # Indica si el partido ya fue jugado / verificado por un admin
    checked = db.Column(db.Boolean, default=False)
    

    # ==================== MÉTODOS ====================
    
    def to_dict(self):
        """Convierte el partido a diccionario para respuestas JSON"""
        return {
            'id': self.id,
            'stage': self.stage,
            'home': self.home_team,
            'away': self.away_team,
            'home_score': self.home_score,
            'away_score': self.away_score,
            'date': self.date,
            'time': self.time,
            'venue': self.venue,
            'checked': self.checked
        }
    
    def is_played(self):
        """Indica si el partido ya tiene resultado cargado"""
        return self.home_score is not None and self.away_score is not None
    
    def winner(self):
        """Devuelve el nombre del equipo ganador o None si empate o no jugado"""
        if not self.is_played():
            return None
        if self.home_score > self.away_score:
            return self.home_team
        elif self.away_score > self.home_score:
            return self.away_team
        else:
            return None  # empate
    
    def update_score(self, home_score, away_score, checked=True):
        """Actualiza el resultado del partido (método de conveniencia)"""
        self.home_score = home_score
        self.away_score = away_score
        self.checked = checked
        db.session.commit()
    
    def __repr__(self):
        return f"<Match {self.home_team} vs {self.away_team} ({self.stage})>"