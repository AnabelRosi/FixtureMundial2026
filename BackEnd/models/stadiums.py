from .db import db

class Stadiums(db.Model):
    __tablename__ = 'stadiums'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100))
    country = db.Column(db.String(100))
    capacity = db.Column(db.Integer)