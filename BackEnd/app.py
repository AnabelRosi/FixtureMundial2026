from flask import Flask, redirect, url_for
from flask_login import LoginManager

from BackEnd.routes.auth_route import auth_bp
from models.db import db
from models.user import User
from config.config import DATABASE_CONNECTION_URI

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_CONNECTION_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "auth_bp.login"
login_manager.login_message = "Por favor inicia sesion de login"
login_manager.login_message_category = "error"

app.register_blueprint(auth_bp)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    return redirect('/login')

with app.app_context():
    db.create_all()

    if not User.query.filter_by(username="superadmin").first():
        superadmin = User(
            username="superadmin",
            email="superadmin@superadmin.com",
            role="superadmin",
        )
        superadmin.set_password("superadmin123")
        db.session.add(superadmin)

        admin = User(
            username="admin",
            email="admin@admin.com",
            role="admin",
        )
        admin.set_password("admin123")
        db.session.add(admin)

        user = User(
            username="user",
            email="user@user.com",
        )
        user.set_password("user123")
        db.session.add(user)

        db.session.commit()
        print("Ejmplo de superadmin, admin y user completos")

    if __name__ == "__main__":
        app.run(debug=True)


