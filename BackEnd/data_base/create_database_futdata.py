import pymysql

connection = pymysql.connect(
    host="localhost",
    user="root",
    password=""
)

cursor = connection.cursor()

import os

sql_path = os.path.join(os.path.dirname(__file__), "futdata.sql")

with open(sql_path, "r", encoding="utf-8") as file:
    sql_script = file.read()

for command in sql_script.split(";"):
    if command.strip():
        cursor.execute(command)

connection.commit()
cursor.close()
connection.close()

print("Base de datos creada correctamente")