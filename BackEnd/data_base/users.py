from bcrypt import hashpw, gensalt
from .database import connection, cursor

def create_user(name, email, password):
    password_hash = hashpw(
        password.encode(),
        gensalt()
    ).decode()

    cursor.execute("""
        INSERT INTO users
        (name, email, password_hash)
        VALUES (%s, %s, %s)
    """, (name, email, password_hash))

    connection.commit()


def update_user(user_id, name, email, password):
    password_hash = hashpw(
        password.encode(),
        gensalt()
    ).decode()

    cursor.execute("""
        UPDATE users
        SET name = %s, email = %s, password_hash = %s
        WHERE id = %s
    """, (name, email, password_hash, user_id))

    connection.commit()


def delete_user(user_id):
    cursor.execute(
        "DELETE FROM users WHERE id = %s",
        (user_id,)
    )

    connection.commit()
