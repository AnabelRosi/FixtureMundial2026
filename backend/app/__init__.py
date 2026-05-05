from flask import Flask
from flask_cors import CORS
from .database import get_db
import json
import os

def init_db():
    """Inicializa la base de datos solo si está vacía."""
    conn = get_db()
    cursor = conn.cursor()

    # Crear tabla si no existe
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS partidos (
            id INTEGER PRIMARY KEY,
            etapa TEXT,
            local TEXT,
            visitante TEXT,
            fecha TEXT,
            hora TEXT,
            sede TEXT,
            visto INTEGER DEFAULT 0
        )
    ''')

    # Verificar si la tabla está vacía
    cursor.execute('SELECT COUNT(*) FROM partidos')
    count = cursor.fetchone()[0]

    if count == 0:
        print("Cargando datos iniciales...")
        json_path = os.path.join(os.path.dirname(__file__), '..', 'fixture.json')
        if not os.path.exists(json_path):
            print(f"❌ Error: No se encuentra el archivo {json_path}")
            conn.close()
            return

        with open(json_path, 'r', encoding='utf-8') as f:
            partidos_data = json.load(f)

        for partido in partidos_data:
            cursor.execute('''
                INSERT INTO partidos (id, etapa, local, visitante, fecha, hora, sede, visto)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (partido['id'], partido['etapa'], partido['local'], partido['visitante'],
                  partido['fecha'], partido['hora'], partido['sede'], partido['visto']))

        conn.commit()
        print(f"✅ Base de datos inicializada con {len(partidos_data)} partidos.")
    else:
        print(f"ℹ️ La base de datos ya contiene {count} partidos. No se modificó.")

    conn.close()


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mundial.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Permitir CORS para el frontend en desarrollo
    CORS(app)

    # Inicializar la base de datos al arrancar la aplicación
    with app.app_context():
        init_db()

    # Importar y registrar los Blueprints
    from .routes.matches import matches_bp
    from .routes.check import check_bp
    from .routes.reset import reset_bp

    app.register_blueprint(matches_bp)
    app.register_blueprint(check_bp)
    app.register_blueprint(reset_bp)

    return app