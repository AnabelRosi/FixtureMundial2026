from functools import wraps
from flask import abort, redirect, url_for, flash
from flask_login import current_user


def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated:
            flash('Debes iniciar sesión para acceder a esta página', 'error')
            return redirect(url_for('auth_bp.login'))

        if not current_user.is_admin():
            flash('No tienes permisos de administrador para acceder a esta página', 'error')
            abort(403)

        return f(*args, **kwargs)
    return decorated_function


def roles_required(*roles):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not current_user.is_authenticated:
                flash('Debes iniciar sesión para acceder a esta página', 'error')
                return redirect(url_for('auth_bp.login'))

            if current_user.type not in roles:
                flash(f'Necesitas uno de estos roles: {", ".join(roles)}', 'error')
                abort(403)

            return f(*args, **kwargs)
        return decorated_function
    return decorator

def superadmin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated:
            flash('Debes iniciar sesión para acceder a esta página', 'error')
            return redirect(url_for('auth_bp.login'))

        if not current_user.is_superadmin():
            flash('No tienes permisos de superadmin para acceder a esta página', 'error')
            abort(403)

        return f(*args, **kwargs)
    return decorated_function