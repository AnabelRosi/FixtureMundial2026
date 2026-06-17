import pymysql

connection = pymysql.connect(
    host="localhost",
    user="root",
    password="",
    database="FUTDATA"
)

cursor = connection.cursor()