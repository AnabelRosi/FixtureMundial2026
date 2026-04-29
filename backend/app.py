# backend/app.py
import sqlite3
import json
import os
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATABASE = 'mundial.db'  # Nombre de la base de datos
JSON_DATA = 'fixture.json'

# --- Función para inicializar la base de datos con los datos del fixture ---
def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
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
    cursor.execute('SELECT COUNT(*) FROM partidos')
    count = cursor.fetchone()[0]
    if count == 0:
        if not os.path.exists(JSON_DATA):
            print(f"❌ Error: No se encuentra el archivo {JSON_DATA}")
            conn.close()
            return
        with open(JSON_DATA, 'r', encoding='utf-8') as f:
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
        print(f"ℹ️ La base de datos ya contiene datos. No se modificó.")
    conn.close()

# --- Función para conectar a la base de datos ---
def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# ==================== ENDPOINTS ====================

# Obtener todos los partidos
@app.route('/api/partidos', methods=['GET'])
def get_partidos():
    conn = get_db()
    partidos = conn.execute('SELECT * FROM partidos ORDER BY id').fetchall()
    conn.close()
    return jsonify([dict(p) for p in partidos])

# Marcar un partido como visto
@app.route('/api/partidos/<int:id>/marcar', methods=['PATCH'])
def marcar_partido(id):
    conn = get_db()
    current = conn.execute('SELECT visto FROM partidos WHERE id = ?', (id,)).fetchone()
    if not current:
        return jsonify({'error': 'Partido no encontrado'}), 404
    nuevo_estado = 1 - current['visto']
    conn.execute('UPDATE partidos SET visto = ? WHERE id = ?', (nuevo_estado, id))
    conn.commit()
    conn.close()
    return jsonify({'id': id, 'visto': nuevo_estado})

# Reiniciar todos los checkboxes
@app.route('/api/reiniciar', methods=['POST'])
def reiniciar_checklist():
    conn = get_db()
    conn.execute('UPDATE partidos SET visto = 0')
    conn.commit()
    conn.close()
    return jsonify({'mensaje': 'Checklist reiniciado'}), 200

# ==================== EJECUCIÓN ====================
if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)