from models.db import db

class Player(db.Model):
    __tablename__ = 'players'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    team = db.Column(db.String(100), nullable=False)
    position = db.Column(db.String(50), nullable=False)
    goals = db.Column(db.Integer, default=0)
    assists = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'team': self.team,
            'position': self.position,
            'goals': self.goals or 0,
            'assists': self.assists or 0
        }