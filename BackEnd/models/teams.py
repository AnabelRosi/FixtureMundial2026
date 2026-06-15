from .db import db
from flask_login import UserMixin
class Teams(db.Model):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)

    def __str__(self):
        return f"Team: {self.name} from {self.city}, {self.country}"