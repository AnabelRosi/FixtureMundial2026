from fixture.BackEnd.data_base.database import connection, cursor
def create_team(name, city, country):

    cursor.execute("""
        INSERT INTO teams
        (name, city, country)
        VALUES (%s, %s, %s)
    """, (name, city, country))

    connection.commit()