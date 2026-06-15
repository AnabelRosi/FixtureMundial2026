import { groupStandings, teams } from '../../data/mockData';
import { useState } from 'react';

export function Standings() {
  const [selectedGroup, setSelectedGroup] = useState<string>('A');
  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  const currentStandings = groupStandings[selectedGroup] || [];

  const getTeamFlag = (teamName: string) => {
    const team = teams.find(t => t.name === teamName);
    if (!team) return null;
    return (
      <img
        src={`https://flagcdn.com/w40/${team.flagCode}.png`}
        alt={teamName}
        className="w-10 h-7 object-cover rounded shadow-sm"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    );
  };

  return (
    <div>
      <h1 className="text-4xl mb-8 text-gray-800">Tabla de Posiciones</h1>

      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {groups.map(group => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedGroup === group
                  ? 'bg-[#003B7A] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Grupo {group}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#003B7A] to-[#0055A5] text-white px-6 py-4">
          <h2 className="text-2xl font-bold">Grupo {selectedGroup}</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-600">#</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-600">Equipo</th>
                <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-gray-600">PJ</th>
                <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-gray-600">PG</th>
                <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-gray-600">PE</th>
                <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-gray-600">PP</th>
                <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-gray-600">GF</th>
                <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-gray-600">GC</th>
                <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-gray-600">DG</th>
                <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-gray-600 bg-blue-50">PTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentStandings.map((standing, index) => (
                <tr key={standing.team} className={`hover:bg-gray-50 ${index < 2 ? 'bg-green-50/30' : ''}`}>
                  <td className="px-6 py-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                      index < 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getTeamFlag(standing.team)}
                      <span className="font-semibold text-gray-800">{standing.team}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-700">{standing.played}</td>
                  <td className="px-6 py-4 text-center text-gray-700">{standing.won}</td>
                  <td className="px-6 py-4 text-center text-gray-700">{standing.drawn}</td>
                  <td className="px-6 py-4 text-center text-gray-700">{standing.lost}</td>
                  <td className="px-6 py-4 text-center text-gray-700">{standing.goalsFor}</td>
                  <td className="px-6 py-4 text-center text-gray-700">{standing.goalsAgainst}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-semibold ${
                      standing.goalDifference > 0 ? 'text-green-600' :
                      standing.goalDifference < 0 ? 'text-red-600' :
                      'text-gray-700'
                    }`}>
                      {standing.goalDifference > 0 ? '+' : ''}{standing.goalDifference}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center bg-blue-50">
                    <span className="text-xl font-bold text-[#003B7A]">{standing.points}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span>Clasifican a octavos de final</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-3">Leyenda</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-700">
          <div><span className="font-semibold">PJ:</span> Partidos Jugados</div>
          <div><span className="font-semibold">PG:</span> Partidos Ganados</div>
          <div><span className="font-semibold">PE:</span> Partidos Empatados</div>
          <div><span className="font-semibold">PP:</span> Partidos Perdidos</div>
          <div><span className="font-semibold">GF:</span> Goles a Favor</div>
          <div><span className="font-semibold">GC:</span> Goles en Contra</div>
          <div><span className="font-semibold">DG:</span> Diferencia de Gol</div>
          <div><span className="font-semibold">PTS:</span> Puntos</div>
        </div>
      </div>
    </div>
  );
}