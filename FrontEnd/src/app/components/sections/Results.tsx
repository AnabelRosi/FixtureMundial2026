import { MapPin, Calendar, Clock } from 'lucide-react';
import { matches, teams } from '../../data/mockData';
import { useFetch } from '../../hooks/useFetch';
import { useState } from 'react';

interface MatchResult {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  time: string;
  stadium: string;
  city: string;
  group: string;
  phase: string;
  status: string;
}

export function Results() {
  const [filterGroup, setFilterGroup] = useState<string>('all');

  const { data: apiResults, loading, error } = useFetch<MatchResult[]>(null);
  // Cuando el backend esté listo, reemplazá null por:
  // useFetch<MatchResult[]>('http://localhost:5000/api/results')

  const finishedMatches = matches.filter(m => m.status === 'finished');
  const allResults: MatchResult[] = (apiResults ?? finishedMatches) as MatchResult[];

  const groups = ['all', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  const filteredResults = allResults.filter(match =>
    filterGroup === 'all' || match.group === filterGroup
  );

  const getFlagImg = (teamName: string) => {
    const team = teams.find(t => t.name === teamName);
    if (!team) return <span className="text-5xl">🏴</span>;
    return (
      <img
        src={`https://flagcdn.com/w80/${team.flagCode}.png`}
        alt={teamName}
        className="w-20 h-14 object-cover rounded-lg shadow-md"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    );
  };

  const getWinner = (match: MatchResult) => {
    const home = match.homeScore ?? 0;
    const away = match.awayScore ?? 0;
    if (home > away) return 'home';
    if (away > home) return 'away';
    return 'draw';
  };

  const getResultLabel = (match: MatchResult) => {
    const home = match.homeScore ?? 0;
    const away = match.awayScore ?? 0;
    if (home > away) return `${match.homeTeam} ganó por ${home}-${away}`;
    if (home === away) return `Empate ${home}-${away}`;
    return `${match.awayTeam} ganó por ${away}-${home}`;
  };

  return (
    <div>
      <h1 className="text-4xl mb-8 text-gray-800">Resultados</h1>

      {/* FILTRO */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Filtrar por Grupo</h3>
        <div className="flex flex-wrap gap-3">
          {groups.map(group => (
            <button
              key={group}
              onClick={() => setFilterGroup(group)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
                filterGroup === group
                  ? 'bg-[#003B7A] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {group === 'all' ? 'Todos' : `Grupo ${group}`}
            </button>
          ))}
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="bg-white rounded-xl p-12 text-center text-gray-500 shadow-lg">
          <div className="animate-spin w-10 h-10 border-4 border-[#003B7A] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Cargando resultados...</p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6 text-red-700">
          <p className="font-semibold">Error al cargar resultados desde el servidor.</p>
          <p className="text-sm mt-1">Mostrando datos locales.</p>
        </div>
      )}

      {/* RESULTADOS */}
      {!loading && filteredResults.length > 0 ? (
        <div className="space-y-6">
          {filteredResults.map(match => {
            const winner = getWinner(match);
            return (
              <div key={match.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">

                {/* HEADER */}
                <div className="bg-gradient-to-r from-[#003B7A] to-[#0055A5] px-6 py-3">
                  <div className="flex items-center justify-between text-sm text-white/90">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{match.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>{match.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Finalizado
                      </span>
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Grupo {match.group}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CUERPO */}
                <div className="p-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* LOCAL */}
                    <div className={`flex items-center gap-4 flex-1 ${winner === 'home' ? 'opacity-100' : 'opacity-70'}`}>
                      {getFlagImg(match.homeTeam)}
                      <div>
                        <div className="text-2xl font-semibold text-gray-800">{match.homeTeam}</div>
                        <div className="text-sm text-gray-500 mt-1">Local</div>
                        {winner === 'home' && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold mt-1 inline-block">
                            Ganador
                          </span>
                        )}
                      </div>
                    </div>

                    {/* MARCADOR */}
                    <div className="text-center">
                      <div className="flex items-center gap-4">
                        <div className={`text-5xl font-bold ${winner === 'home' ? 'text-[#003B7A]' : 'text-gray-400'}`}>
                          {match.homeScore}
                        </div>
                        <div className="text-2xl text-gray-300">-</div>
                        <div className={`text-5xl font-bold ${winner === 'away' ? 'text-[#003B7A]' : 'text-gray-400'}`}>
                          {match.awayScore}
                        </div>
                      </div>
                      {winner === 'draw' && (
                        <div className="text-sm text-gray-500 mt-2 font-semibold">Empate</div>
                      )}
                    </div>

                    {/* VISITANTE */}
                    <div className={`flex items-center gap-4 flex-1 md:flex-row-reverse ${winner === 'away' ? 'opacity-100' : 'opacity-70'}`}>
                      {getFlagImg(match.awayTeam)}
                      <div className="md:text-right">
                        <div className="text-2xl font-semibold text-gray-800">{match.awayTeam}</div>
                        <div className="text-sm text-gray-500 mt-1">Visitante</div>
                        {winner === 'away' && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold mt-1 inline-block">
                            Ganador
                          </span>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* ESTADIO */}
                  <div className="mt-6 pt-6 border-t border-gray-100 text-center text-gray-500 text-sm">
                    <MapPin size={14} className="inline mr-1" />
                    {match.stadium}, {match.city}
                  </div>

                  {/* RESUMEN */}
                  <div className="mt-4 bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-1">Resumen</h4>
                    <p className="text-gray-700 text-sm">{getResultLabel(match)}</p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : !loading && (
        <div className="bg-gray-50 rounded-xl p-12 text-center text-gray-600">
          <p className="text-lg">Aún no hay resultados disponibles.</p>
          <p className="text-sm mt-2">Los resultados aparecerán aquí una vez que comiencen los partidos.</p>
        </div>
      )}
    </div>
  );
}