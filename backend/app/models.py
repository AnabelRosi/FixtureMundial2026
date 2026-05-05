from .database import get_db

class Partido:
    """Define la estructura de un partido y operaciones de BD."""

    @staticmethod
    def obtener_todos():
        """Obtiene todos los partidos, ordenados por ID."""
        conn = get_db()
        partidos = conn.execute('SELECT * FROM partidos ORDER BY id').fetchall()
        conn.close()
        return [dict(p) for p in partidos]

    @staticmethod
    def toggle_visto(partido_id):
        """Cambia el estado 'visto' de un partido."""
        conn = get_db()
        current = conn.execute(
            'SELECT visto FROM partidos WHERE id = ?', (partido_id,)
        ).fetchone()
        if not current:
            return None, None

        nuevo_estado = 1 - current['visto']
        conn.execute(
            'UPDATE partidos SET visto = ? WHERE id = ?',
            (nuevo_estado, partido_id)
        )
        conn.commit()
        conn.close()
        return nuevo_estado, 200

    @staticmethod
    def resetear_vistos():
        """Reinicia el estado 'visto' de TODOS los partidos."""
        conn = get_db()
        conn.execute('UPDATE partidos SET visto = 0')
        conn.commit()
        conn.close()
        return True