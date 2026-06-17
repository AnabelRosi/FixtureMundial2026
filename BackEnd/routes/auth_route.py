from flask import Blueprint,render_template,request,redirect,url_for,flash
from flask_login import current_user, login_user,logout_user,login_required

from auth.auth import admin_required, roles_required, superadmin_required
from models.users import Users
from models.db import db


auth_bp = Blueprint("auth_bp",__name__, url_prefix="/auth")

@auth_bp.route('/login',methods=["GET","POST"])
def login():
    #ruta de inicio de sesion
    if current_user.is_authenticated:
        return redirect(url_for("auth_bp.dashboard"))

    if request.method == 'POST':
        name = request.form.get("username")
        password = request.form.get("password")

        user = Users.query.filter_by(name=name).first()

        if user and user.check_password(password):
            login_user(user)
            next_page = request.args.get('next')
            return redirect(next_page or url_for('auth_bp.dashboard'))
        else:
            flash("Usuario o contraseña incorrecto", "error")
    return render_template('login.html')

@auth_bp.route('/logout')
@login_required
def logout():
    #Ruta de cierre
    logout_user()
    flash("Has cerrado sesion exitosamente", "success")
    return redirect(url_for("auth_bp.login"))

@auth_bp.route('/dashboard')
@login_required
def dashboard():
    #Pag principal despues del login
    return render_template("dashboard.html", user= current_user)

@auth_bp.route('/register',methods=["GET","POST"])
def register():
    #Ruta para registro de usuario
    if current_user.is_authenticated:
        return redirect(url_for("auth_bp.dashboard"))
    if request.method == 'POST':
        name = request.form.get("username")
        password = request.form.get("password")
        email = request.form.get("email")
        type = request.form.get("type", "user")

        if Users.query.filter_by(name=name).first():
            flash("Usuario ya existente", "error")
            return redirect(url_for("auth_bp.register"))

        user = Users(name=name, email=email, type=type)
        user.set_password(password)

        db.session.add(user)
        db.session.commit()

        flash("Usuario creado exitosamente", "success")
        return redirect(url_for("auth_bp.login"))
    return render_template('register.html')

@auth_bp.route('/profile')
@login_required
def profile():
    #Perfil del usuario
    return render_template('profile.html', user=current_user)

@auth_bp.route('/admin')
@login_required
@admin_required
def admin():
    #panel del admin. Solo Admin y superadmin
    users = Users.query.all()
    return render_template('admin.html', users=users, role='admin')

@auth_bp.route('/superadmin')
@login_required
@superadmin_required
def superadmin():
    # panel del superAdmin. Solo superadmin
    users = Users.query.all()
    return render_template('superadmin.html', users=users, role='superadmin')

@auth_bp.errorhandler(401)
def unauthorized(error):
    flash("Debes iniciar sesion para acceder a esta pag", "error")
    return redirect(url_for("auth_bp.login"))

@auth_bp.errorhandler(403)
def forbidden(error):
    flash("No tienes permisos para acceder a esta pag", "error")
    return redirect(url_for("auth_bp.dashboard"))


