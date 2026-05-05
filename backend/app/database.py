import sqlite3

DATABASE = 'mundial.db'

def get_db():
    """Establece la conexión con la base de datos."""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row # Para acceder a las columnas por nombre
    return conn