import { ArrowLeft, User } from 'lucide-react';
import { teams, type Player } from '../../data/mockData';
import { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';

interface TeamDetailProps {
  teamId: string;
  onBack: () => void;
}

interface ApiPlayer {
  id: number;
  name: string;
  team: string;
  position: string;
  goals: number;
  assists: number;
}

export function TeamDetail({ teamId, onBack }: TeamDetailProps) {
  // 1. Buscar el equipo en el mock (para tener bandera, nombre, etc.)
  const team = teams.find(t => t.id === teamId);

  // 2. Estado para los jugadores que vienen de la API
  const [apiPlayers, setApiPlayers] = useState<ApiPlayer[]>([]);
  const [loading, setLoading] = useState(false);

  // 3. useEffect para traer los jugadores de la API
  useEffect(() => {
    const fetchPlayers = async () => {
      if (!team) return;
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/players');
        const data = await response.json();
        if (response.ok) {
          // Filtramos los jugadores que pertenecen a este equipo
          const filtered = data.filter((p: ApiPlayer) => p.team === team.name);
          setApiPlayers(filtered);
        }
      } catch (error) {
        console.error('Error al cargar jugadores:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, [team]);

  if (!team) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Equipo no encontrado</p>
        <button onClick={onBack} className="mt-4 text-[#003B7A] hover:underline">
          Volver a grupos
        </button>
      </div>
    );
  }

  // Función para mapear posición al español
  const getPositionLabel = (pos: string) => {
    const map: Record<string, string> = {
      'GK': 'Arquero',
      'DF': 'Defensor',
      'MF': 'Mediocampista',
      'FW': 'Delantero',
    };
    return map[pos] || pos;
  };

  // Si el equipo tiene jugadores en el mock (ej: Argentina), los mostramos, 
  // pero si vienen de la API, los reemplazamos.
  // Decidimos: mostrar SIEMPRE los de la API si hay, sino los del mock.
  const displayPlayers = apiPlayers.length > 0 ? apiPlayers : team.players;

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#003B7A] hover:text-[#0055A5] mb-6"
      >
        <ArrowLeft size={20} />
        Volver a grupos
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Cabecera del equipo */}
        <div className="bg-gradient-to-r from-[#003B7A] to-[#0055A5] px-8 py-8 text-white">
          <div className="flex items-center gap-6">
            <img
              src={`https://flagcdn.com/w80/${team.flagCode}.png`}
              alt={team.name}
              className="w-24 h-16 object-cover rounded-xl shadow-lg"
            />
            <div>
              <h1 className="text-4xl font-bold">{team.name}</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-white/80">
                <span>🏆 {team.bestResult}</span>
                <span>🌍 Ranking FIFA: {team.fifaRanking}</span>
                <span>👨‍🏫 DT: {team.coach}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Plantel */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Plantel {displayPlayers.length > 0 && `(${displayPlayers.length} jugadores)`}
          </h2>

          {loading ? (
            <div className="text-center py-12 text-gray-500">
              <div className="animate-spin w-10 h-10 border-4 border-[#003B7A] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Cargando jugadores...</p>
            </div>
          ) : displayPlayers.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">
              <User size={40} className="mx-auto text-gray-300 mb-3" />
              <p>El plantel completo será anunciado próximamente.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayPlayers.map((player: any) => (
                <div
                  key={player.id}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#003B7A] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {player.number || '?'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{player.name}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{getPositionLabel(player.position)}</span>
                        {player.goals !== undefined && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                            ⚽ {player.goals} goles
                          </span>
                        )}
                      </div>
                      {player.club && (
                        <div className="text-xs text-gray-400">{player.club}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}