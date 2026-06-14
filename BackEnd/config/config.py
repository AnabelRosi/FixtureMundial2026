from dotenv import load_dotenv
import os

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

# Obtener la variable de entorno para la configuración de la base de datos
user = os.getenv("MYSQL_USER")
password = os.getenv("MYSQL_PASSWORD")
host = os.getenv("MYSQL_HOST")
database = os.getenv("MYSQL_DB")

DATABASE_CONNECTION_URI = f"mysql+pymysql://{user}:{password}@{host}/{database}"