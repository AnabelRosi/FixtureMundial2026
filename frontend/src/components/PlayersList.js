import React, { useEffect, useState } from 'react';
import PlayerForm from './PlayerForm';

function PlayersList() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // ============================================
  // CARGA INICIAL: usa refreshPlayers
  // ============================================
  useEffect(() => {
    refreshPlayers();
  }, []);

  // ============================================
  // REFRESH CON ORDENAMIENTO (ID=1 al principio)
  // ============================================
  const refreshPlayers = () => {
    fetch('http://localhost:5000/api/players')
      .then(res => res.json())
      .then(data => {
        const index = data.findIndex(player => player.ID === 1);
        if (index > 0) {
          const player = data.splice(index, 1)[0];
          data = [player, ...data];
        }
        setPlayers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  // ============================================
  // CREATE, UPDATE, DELETE
  // ============================================
  const handleCreate = (newPlayerData) => {
    fetch('http://localhost:5000/api/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlayerData)
    })
      .then(res => res.json())
      .then(() => {
        refreshPlayers();
        setShowForm(false);
      });
  };

  const handleUpdate = (updatedData) => {
    fetch(`http://localhost:5000/api/players/${editingPlayer.ID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    })
      .then(res => res.json())
      .then(() => {
        refreshPlayers();
        setEditingPlayer(null);
        setShowForm(false);
      });
  };

  const handleDelete = (playerId) => {
    if (window.confirm('¿Eliminar este jugador?')) {
      fetch(`http://localhost:5000/api/players/${playerId}`, { method: 'DELETE' })
        .then(() => refreshPlayers());
    }
  };

  if (loading) return <div>Cargando jugadores...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Jugadores del Mundial 2026</h1>
      <button onClick={() => { setEditingPlayer(null); setShowForm(true); }}>Crear Jugador</button>
      {(showForm || editingPlayer) && (
        <PlayerForm
          player={editingPlayer}
          onSave={editingPlayer ? handleUpdate : handleCreate}
          onCancel={() => { setShowForm(false); setEditingPlayer(null); }}
        />
      )}
      
      <div style={{ overflowX: 'auto' }}>
        <table border="1" style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px', fontSize: '14px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Edad</th>
              <th>Altura</th>
              <th>Peso</th>
              <th>Posición</th>
              <th>N° Camiseta</th>
              <th>Club</th>
              <th>Debut</th>
              <th>Goles</th>
              <th>Asistencias</th>
              <th>Partidos</th>
              <th>Team ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {players.map(player => (
              <tr key={player.ID}>
                <td>{player.ID}</td>
                <td>{player.name}</td>
                <td>{player.surname}</td>
                <td>{player.age}</td>
                <td>{player.height}</td>
                <td>{player.weight}</td>
                <td>{player.position}</td>
                <td>{player["jersey number"]}</td>
                <td>{player["team outside the World Cup"]}</td>
                <td>{player["date of debut with the national team"]}</td>
                <td>{player.goals}</td>
                <td>{player.assists}</td>
                <td>{player["games played"]}</td>
                <td>{player["team ID"]}</td>
                <td>
                  <button onClick={() => { setEditingPlayer(player); setShowForm(true); }}>Editar</button>
                  <button onClick={() => handleDelete(player.ID)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Total de jugadores: {players.length}</p>
    </div>
  );
}

export default PlayersList;