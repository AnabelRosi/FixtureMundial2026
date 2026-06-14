from functools import wraps
from flask import abort, redirect, url_for, flash
from flask_login import current_user

def admin_required(f):
    #Decorador que verifica si el usuario es admin o superadmin
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated:
            flash('Debes iniciar sesión para acceder a esta página', 'error')
            return redirect(url_for('login'))
        if not current_user.is_admin():
            flash('No tienes permisos de administrador para acceder a esta página', 'error')
            abort(403)
        return f(*args, **kwargs)
    return decorated_function

def superadmin_required(f):
    # Decorador que verifica si el usuario es superadmin
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated:
            flash('Debes iniciar sesión para acceder a esta página', 'error')
            return redirect(url_for('login'))
        if not current_user.is_superadmin():
            flash('No tienes permisos de superadministrador para acceder a esta página', 'error')
            abort(403)
        return f(*args, **kwargs)
    return decorated_function

def roles_required(*roles):
    #Verifica si el usuario tiene un rol especifico
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not current_user.is_authenticated:
                flash('Debes iniciar sesión para acceder a esta página', 'error')
                return redirect(url_for('login'))

            if current_user.role not in roles:
                flash(f'Necesitas uno de estos roles: {", ".join(roles)}', 'error')
                abort(403)
            return f(*args, **kwargs)
        return decorated_function
    return decorator

