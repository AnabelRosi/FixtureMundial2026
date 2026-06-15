from .database import connection, cursor
def create_stadium(name, city, country, capacity):

    cursor.execute("""
        INSERT INTO stadiums
        (name, city, country, capacity)
        VALUES (%s, %s, %s, %s)
    """, (name, city, country, capacity))

    connection.commit()
def update_stadium(stadium_id, name, city, country, capacity):

    cursor.execute("""
        UPDATE stadiums
        SET name = %s, city = %s, country = %s, capacity = %s
        WHERE id = %s
    """, (name, city, country, capacity, stadium_id))

    connection.commit()
def delete_stadium(stadium_id):
    cursor.execute(
        "DELETE FROM stadiums WHERE id = %s",
        (stadium_id,)
    )

    connection.commit()