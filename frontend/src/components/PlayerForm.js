import React, { useState, useEffect } from 'react';

function PlayerForm({ player, onSave, onCancel }) {
  // Estado inicial con TODOS los campos del jugador
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    age: 0,
    height: 1.75,
    weight: 75,
    position: '',
    jersey_number: 0,
    team_outside_world_cup: '',
    debut_date: '',
    goals: 0,
    assists: 0,
    games_played: 0,
    photo: '',
    team_id: 0
  });

  // Cuando se recibe un jugador para editar, se cargan sus datos en el formulario
  useEffect(() => {
    if (player) {
      setFormData({
        name: player.name || '',
        surname: player.surname || '',
        age: player.age || 0,
        height: player.height || 1.75,
        weight: player.weight || 75,
        position: player.position || '',
        jersey_number: player["jersey number"] || 0,
        team_outside_world_cup: player["team outside the World Cup"] || '',
        debut_date: player["date of debut with the national team"] || '',
        goals: player.goals || 0,
        assists: player.assists || 0,
        games_played: player["games played"] || 0,
        photo: player.photo || '',
        team_id: player["team ID"] || 0
      });
    }
  }, [player]);

  // Manejar cambios en cualquier campo
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value
    });
  };

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Convertir los nombres de los campos al formato que espera el backend
    const payload = {
      name: formData.name,
      surname: formData.surname,
      age: formData.age,
      height: formData.height,
      weight: formData.weight,
      position: formData.position,
      "jersey number": formData.jersey_number,
      "team outside the World Cup": formData.team_outside_world_cup,
      "date of debut with the national team": formData.debut_date,
      goals: formData.goals,
      assists: formData.assists,
      "games played": formData.games_played,
      photo: formData.photo,
      "team ID": formData.team_id
    };
    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      marginBottom: '20px', 
      padding: '15px', 
      border: '2px solid #007bff', 
      borderRadius: '8px',
      backgroundColor: '#f8f9fa'
    }}>
      <h3 style={{ marginTop: 0 }}>{player ? 'Editar Jugador' : 'Crear Nuevo Jugador'}</h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
        gap: '12px' 
      }}>
        {/* Campo: Nombre */}
        <div>
          <label><strong>Nombre</strong> <span style={{color: 'red'}}>*</span></label>
          <input 
            name="name" 
            placeholder="Ej: Lionel" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '6px' }}
          />
        </div>

        {/* Campo: Apellido */}
        <div>
          <label><strong>Apellido</strong> <span style={{color: 'red'}}>*</span></label>
          <input 
            name="surname" 
            placeholder="Ej: Messi" 
            value={formData.surname} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '6px' }}
          />
        </div>

        {/* Campo: Edad */}
        <div>
          <label><strong>Edad</strong> (años)</label>
          <input 
            name="age" 
            type="number" 
            placeholder="Ej: 38" 
            value={formData.age} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '6px' }}
          />
        </div>

        {/* Campo: Altura */}
        <div>
          <label><strong>Altura</strong> (metros)</label>
          <input 
            name="height" 
            type="number" 
            step="0.01" 
            placeholder="Ej: 1.70" 
            value={formData.height} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '6px' }}
          />
        </div>

        {/* Campo: Peso */}
        <div>
          <label><strong>Peso</strong> (kg)</label>
          <input 
            name="weight" 
            type="number" 
            placeholder="Ej: 72" 
            value={formData.weight} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '6px' }}
          />
        </div>

        {/* Campo: Posición */}
        <div>
          <label><strong>Posición</strong></label>
          <input 
            name="position" 
            placeholder="Forward / Midfielder / Defender / Goalkeeper" 
            value={formData.position} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '6px' }}
          />
        </div>

        {/* Campo: Número de camiseta */}
        <div>
          <label><strong>N° Camiseta</strong></label>
          <input 
            name="jersey_number" 
            type="number" 
            placeholder="Ej: 10" 
            value={formData.jersey_number} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '6px' }}
          />
        </div>

        {/* Campo: Club actual */}
        <div>
          <label><strong>Club actual</strong></label>
          <input 
            name="team_outside_world_cup" 
            placeholder="Ej: Inter Miami" 
            value={formData.team_outside_world_cup} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '6px' }}
          />
        </div>

        {/* Campo: Fecha de debut */}
        <div>
          <label><strong>Fecha debut</strong> (YYYY-MM-DD)</label>
          <input 
            name="debut_date" 
            placeholder="Ej: 2005-08-17" 
            value={formData.debut_date} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '6px' }}
          />
        </div>

        {/* Campo: Goles */}
        <div>
          <label><strong>Goles</strong></label>
          <input 
            name="goals" 
            type="number" 
            placeholder="Ej: 112" 
            value={formData.goals} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '6px' }}
          />
        </div>

        {/* Campo: Asistencias */}
        <div>
          <label><strong>Asistencias</strong></label>
          <input 
            name="assists" 
            type="number" 
            placeholder="Ej: 58" 
            value={formData.assists} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '6px' }}
          />
        </div>

        {/* Campo: Partidos jugados */}
        <div>
          <label><strong>Partidos jugados</strong></label>
          <input 
            name="games_played" 
            type="number" 
            placeholder="Ej: 190" 
            value={formData.games_played} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '6px' }}
          />
        </div>

        {/* Campo: URL de foto */}
        <div>
          <label><strong>URL de foto</strong></label>
          <input 
            name="photo" 
            placeholder="/images/players/1.jpg" 
            value={formData.photo} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '6px' }}
          />
        </div>

        {/* Campo: ID del equipo */}
        <div>
          <label><strong>ID del equipo</strong> (1-48)</label>
          <input 
            name="team_id" 
            type="number" 
            placeholder="Ej: 37" 
            value={formData.team_id} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '6px' }}
          />
        </div>
      </div>

      {/* Botones */}
      <div style={{ marginTop: '15px' }}>
        <button 
          type="submit" 
          style={{ 
            padding: '8px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Guardar
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          style={{ 
            padding: '8px 20px', 
            marginLeft: '10px', 
            backgroundColor: '#6c757d', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default PlayerForm;