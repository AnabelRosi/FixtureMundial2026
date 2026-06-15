import { Calendar, MapPin, Clock } from 'lucide-react';
import { matches, teams } from '../../data/mockData';
import { useState } from 'react';

export function Fixtures() {
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [filterPhase, setFilterPhase] = useState<string>('all');

  const groups = ['all', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const phases = ['all', 'Group Stage', 'Round of 32', 'Round of 16', 'Quarter Finals', 'Semi Finals', 'Final'];

  const phaseLabels: Record<string, string> = {
    'Group Stage': 'Fase de Grupos',
    'Round of 32': 'Dieciseisavos de Final',
    'Round of 16': 'Octavos de Final',
    'Quarter Finals': 'Cuartos de Final',
    'Semi Finals': 'Semifinales',
    'Final': 'Final',
  };

  const filteredMatches = matches.filter(match => {
    const groupMatch = filterGroup === 'all' || match.group === filterGroup;
    const phaseMatch = filterPhase === 'all' || match.phase === filterPhase;
    return groupMatch && phaseMatch;
  });

  const getFlagImg = (teamName: string) => {
    const team = teams.find(t => t.name === teamName);
    if (!team) return <span className="text-4xl">🏴</span>;
    return (
      <img
        src={`https://flagcdn.com/w80/${team.flagCode}.png`}
        alt={teamName}
        className="w-16 h-11 object-cover rounded shadow-md"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    );
  };

  const getStatusBadge = (status: string) => {
    if (status === 'finished') return <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Finalizado</span>;
    if (status === 'live') return <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">EN VIVO</span>;
    return <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Programado</span>;
  };

  return (
    <div>
      <h1 className="text-4xl mb-8 text-gray-800">Fixture del Mundial</h1>

      {/* FILTROS */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Grupo</label>
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B7A]"
            >
              <option value="all">Todos los grupos</option>
              {groups.slice(1).map(group => (
                <option key={group} value={group}>Grupo {group}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Fase</label>
            <select
              value={filterPhase}
              onChange={(e) => setFilterPhase(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B7A]"
            >
              <option value="all">Todas las fases</option>
              {phases.slice(1).map(phase => (
                <option key={phase} value={phase}>{phaseLabels[phase]}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* LISTA DE PARTIDOS */}
      <div className="space-y-4">
        {filteredMatches.map(match => (
          <div key={match.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">

            {/* HEADER PARTIDO */}
            <div className="bg-gradient-to-r from-[#003B7A] to-[#0055A5] px-6 py-3">
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar size={15} />
                  <span>{match.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={15} />
                  <span>{match.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} />
                  <span>{match.city}</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  {getStatusBadge(match.status)}
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Grupo {match.group}
                  </span>
                </div>
              </div>
            </div>

            {/* CUERPO PARTIDO */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                {/* EQUIPO LOCAL */}
                <div className="flex items-center gap-4 flex-1">
                  {getFlagImg(match.homeTeam)}
                  <div className="text-lg font-semibold text-gray-800">{match.homeTeam}</div>
                </div>

                {/* MARCADOR O VS */}
                <div className="text-center px-6">
                  {match.status === 'finished' ? (
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold text-[#003B7A]">{match.homeScore}</span>
                      <span className="text-2xl text-gray-400">-</span>
                      <span className="text-4xl font-bold text-[#003B7A]">{match.awayScore}</span>
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-[#003B7A]">VS</div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">{phaseLabels[match.phase]}</div>
                </div>

                {/* EQUIPO VISITANTE */}
                <div className="flex items-center gap-4 flex-1 md:flex-row-reverse">
                  {getFlagImg(match.awayTeam)}
                  <div className="text-lg font-semibold text-gray-800 md:text-right">{match.awayTeam}</div>
                </div>

              </div>

              {/* ESTADIO */}
              <div className="mt-4 pt-4 border-t border-gray-100 text-center text-sm text-gray-500">
                <MapPin size={14} className="inline mr-1" />
                {match.stadium}
              </div>
            </div>

          </div>
        ))}
      </div>

      {filteredMatches.length === 0 && (
        <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-600">
          <p>No se encontraron partidos con los filtros seleccionados.</p>
        </div>
      )}
    </div>
  );
}