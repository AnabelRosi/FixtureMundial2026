import { useState, useEffect } from 'react'

interface Partido {
  id: number;
  etapa: string;
  local: string;
  visitante: string;
  fecha: string;
  hora: string;
  sede: string;
  visto: number;
}

function App() {
  const [partidos, setPartidos] = useState<Partido[]>([])
  const [progreso, setProgreso] = useState(0)

  // Cargar partidos del backend
  useEffect(() => {
    fetch('http://localhost:5000/api/partidos')
      .then(res => res.json())
      .then(data => {
        setPartidos(data)
        const vistos = data.filter((p: Partido) => p.visto === 1).length
        setProgreso(vistos)
      })
      .catch(error => console.error('Error al cargar partidos:', error))
  }, [])

  // Marcar partido como visto
  const marcarPartido = (id: number) => {
    fetch(`http://localhost:5000/api/partidos/${id}/marcar`, {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(data => {
        const nuevosPartidos = partidos.map(p => 
          p.id === id ? { ...p, visto: data.visto } : p
        )
        setPartidos(nuevosPartidos)
        const vistos = nuevosPartidos.filter(p => p.visto === 1).length
        setProgreso(vistos)
      })
      .catch(error => console.error('Error al marcar partido:', error))
  }

  // Reiniciar checklist
  const reiniciar = () => {
    fetch('http://localhost:5000/api/reiniciar', {
      method: 'POST'
    })
      .then(() => {
        const nuevosPartidos = partidos.map(p => ({ ...p, visto: 0 }))
        setPartidos(nuevosPartidos)
        setProgreso(0)
      })
      .catch(error => console.error('Error al reiniciar:', error))
  }

  return (
    <div>
      <h1>Mundial 2026</h1>
      <p>Progreso: {progreso} de {partidos.length}</p>
      <button onClick={reiniciar}>Reiniciar</button>
      
      {partidos.map(partido => (
        <div key={partido.id}>
          <h3>{partido.local} vs {partido.visitante}</h3>
          <p>{partido.fecha} - {partido.hora}</p>
          <p>{partido.etapa}</p>
          <label>
            <input 
              type="checkbox" 
              checked={partido.visto === 1}
              onChange={() => marcarPartido(partido.id)}
            />
            Marcar como visto
          </label>
        </div>
      ))}
    </div>
  )
}

export default App