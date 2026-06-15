from .database import connection, cursor
def create_player(name,surname,age,position,jersey_number,goals,assists,matches_played,photo,team_id,height,weight,team_outside_the_world_cup,date_of_debut):

    cursor.execute("""
        INSERT INTO players
        (name, surname, age, position, jersey_number, goals, assists, matches_played, photo, team_id, height, weight, team_outside_the_world_cup, date_of_debut)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (name,surname,age,position,jersey_number,goals,assists,matches_played,photo,team_id,height,weight,team_outside_the_world_cup,date_of_debut))

    connection.commit()
def update_player(player_id,name,surname,age,position,jersey_number,goals,assists,matches_played,photo,team_id,height,weight,team_outside_the_world_cup,date_of_debut):

    cursor.execute("""
        UPDATE players
        SET name = %s, surname = %s, age = %s, position = %s, jersey_number = %s, goals = %s, assists = %s, matches_played = %s, photo = %s, team_id = %s, height = %s, weight = %s, team_outside_the_world_cup = %s, date_of_debut = %s
        WHERE id = %s
    """, (name,surname,age,position,jersey_number,goals,assists,matches_played,photo,team_id,height,weight,team_outside_the_world_cup,date_of_debut,player_id))

    connection.commit()
def delete_player(player_id):
    cursor.execute(
        "DELETE FROM players WHERE id = %s",
        (player_id,)
    )

    connection.commit()