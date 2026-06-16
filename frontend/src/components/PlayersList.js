import React, { useEffect, useState } from 'react';

function PlayersList() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/players')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        return response.json();
      })
      .then(data => {
        setPlayers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando jugadores...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Jugadores del Mundial 2026</h1>
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Posición</th>
            <th>Goles</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.ID}>
              <td>{player.ID}</td>
              <td>{player.name}</td>
              <td>{player.surname}</td>
              <td>{player.age}</td>
              <td>{player.position}</td>
              <td>{player.goals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayersList;