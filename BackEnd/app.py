from flask import Flask, redirect, url_for
from flask_login import LoginManager
from flask_cors import CORS

from routes.auth_route import auth_bp
from routes.api_routes import api_bp          # ← NUEVO
from models.db import db
from models.users import Users
from config.config import DATABASE_CONNECTION_URI


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_CONNECTION_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'fifa2026secretkey'

# Habilita CORS para que React (localhost:5173) pueda llamar al backend
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://localhost:3000"]}})

db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "auth_bp.login"
login_manager.login_message = "Por favor inicia sesion de login"
login_manager.login_message_category = "error"

# Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(api_bp)               # ← NUEVO

@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))

@app.route('/')
def index():
    return redirect('/login')

with app.app_context():
    db.create_all()

    if not Users.query.filter_by(name="admin").first():
        admin = Users(
            name="admin",
            email="admin@admin.com",
            type="admin",
        )
        admin.set_password("admin123")
        db.session.add(admin)

        user = Users(
            name="user",
            email="user@user.com",
            type="user",
        )
        user.set_password("user123")
        db.session.add(user)

        db.session.commit()
        print("Usuarios de ejemplo creados: admin / user")

if __name__ == "__main__":
    app.run(debug=True)
