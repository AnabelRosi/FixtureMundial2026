import { ArrowLeft, User } from 'lucide-react';
import { teams, type Player, type Team } from '../../data/mockData';
import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';

interface TeamDetailProps {
  teamId: string;
  onBack: () => void;
}

export function TeamDetail({ teamId, onBack }: TeamDetailProps) {
  // Cuando el backend esté listo, reemplazá null por la URL:
  // const { data: apiTeam } = useFetch<Team>(`http://localhost:5000/api/teams/${teamId}`);
  const { data: apiTeam } = useFetch<Team>(null);
  const team = apiTeam ?? teams.find(t => t.id === teamId);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  if (!team) return null;

  if (selectedPlayer) {
    return (
      <div>
        <button
          onClick={() => setSelectedPlayer(null)}
          className="flex items-center gap-2 text-[#003B7A] hover:text-[#0055A5] mb-6"
        >
          <ArrowLeft size={20} />
          Volver al plantel
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-gradient-to-br from-[#003B7A] to-[#0055A5] rounded-xl flex items-center justify-center">
                <User size={80} className="text-white" />
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <img
                  src={`https://flagcdn.com/w80/${team.flagCode}.png`}
                  alt={team.name}                
                  className="w-32 h-24 object-cover rounded-xl shadow-lg"
                />
                <h1 className="text-4xl mb-2 text-gray-800">{selectedPlayer.name}</h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="text-2xl font-bold text-[#003B7A]">#{selectedPlayer.number}</span>
                  <span>{selectedPlayer.position}</span>
                  <span>•</span>
                  <span>{selectedPlayer.club}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Edad</div>
                  <div className="text-2xl font-bold text-[#003B7A]">{selectedPlayer.age}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Altura</div>
                  <div className="text-2xl font-bold text-[#003B7A]">{selectedPlayer.height} cm</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Peso</div>
                  <div className="text-2xl font-bold text-[#003B7A]">{selectedPlayer.weight} kg</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Partidos</div>
                  <div className="text-2xl font-bold text-[#003B7A]">{selectedPlayer.caps}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Goles</div>
                  <div className="text-2xl font-bold text-[#003B7A]">{selectedPlayer.goals}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Asistencias</div>
                  <div className="text-2xl font-bold text-[#003B7A]">{selectedPlayer.assists}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Minutos</div>
                  <div className="text-2xl font-bold text-[#003B7A]">{selectedPlayer.minutes.toLocaleString()}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Tarjetas Amarillas</div>
                  <div className="text-2xl font-bold text-yellow-500">{selectedPlayer.yellowCards}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Tarjetas Rojas</div>
                  <div className="text-2xl font-bold text-red-500">{selectedPlayer.redCards}</div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Historial en Mundiales</h3>
                <p className="text-gray-700">{selectedPlayer.worldCupHistory}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#003B7A] hover:text-[#0055A5] mb-6"
      >
        <ArrowLeft size={20} />
        Volver a grupos
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-[#003B7A] to-[#0055A5] text-white p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-8xl">{team.flag}</div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl mb-2">{team.name}</h1>
              <div className="flex flex-wrap gap-4 text-white/90 justify-center md:justify-start">
                <span>Confederación: {team.confederation}</span>
                <span>•</span>
                <span>Ranking FIFA: #{team.fifaRanking}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-gray-600">Director Técnico</div>
            <div className="text-lg font-semibold text-gray-800">{team.coach}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Participaciones en Mundiales</div>
            <div className="text-lg font-semibold text-gray-800">{team.worldCupParticipations}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Mejor Resultado</div>
            <div className="text-lg font-semibold text-gray-800">{team.bestResult}</div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl mb-6 text-gray-800">Plantel de Jugadores</h2>
        {team.players.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.players.map(player => (
              <div
                key={player.id}
                onClick={() => setSelectedPlayer(player)}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#003B7A] to-[#0055A5] rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={32} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl font-bold text-[#003B7A]">#{player.number}</span>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">{player.position}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1 truncate">{player.name}</h3>
                    <p className="text-sm text-gray-600 truncate">{player.club}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-600">
            <p>El plantel completo será anunciado próximamente.</p>
          </div>
        )}
      </div>
    </div>
  );
}
