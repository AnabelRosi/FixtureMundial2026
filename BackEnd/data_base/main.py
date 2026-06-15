from .stadiums import create_stadium, update_stadium, delete_stadium
from .player import create_player, update_player, delete_player
from .users import create_user, update_user, delete_user
create_stadium("Estadio Monumental", "Buenos Aires", "Argentina", 70000)
print("Estadio creado")