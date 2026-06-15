import { matches, teams } from '../../data/mockData';
import { useEffect, useState } from 'react';

interface HomeProps {
  onNavigate: (section: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const startDate = new Date('2026-06-11T18:00:00');
    const updateCountdown = () => {
      const now = new Date();
      const diff = startDate.getTime() - now.getTime();
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const upcomingMatch = matches.find(m => m.status === 'scheduled');
  const lastResult = matches.find(m => m.status === 'finished');
  const featuredMatch = matches[0];

  const getFlagImg = (teamName: string, size: string = 'w40') => {
    const team = teams.find(t => t.name === teamName);
    if (!team) return null;
    return (
      <img
        src={`https://flagcdn.com/${size}/${team.flagCode}.png`}
        alt={teamName}
        className="h-7 object-cover rounded shadow-sm"
      />
    );
  };

  return (
    <div className="space-y-12">

      {/* BANNER PRINCIPAL */}
      <section className="relative text-white overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
        <img
          src="/src/assets/epicbanner.jpg"
          alt="FIFA World Cup 2026"
          className="absolute inset-0 w-full h-full object-cover object-[center_10%]"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)]"></div>
        </div>
        <div className="relative px-8 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl mb-4">Mundial de Fútbol FIFA 2026</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">Estados Unidos • México • Canadá</p>
          <button
            onClick={() => onNavigate('fixtures')}
            className="bg-white text-[#003B7A] px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
          >
            Ver Fixture
          </button>
        </div>
      </section>

      {/* TARJETAS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* PRÓXIMO PARTIDO */}
        <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <img src="/src/assets/proximospartidos.jpg" alt="Próximo Partido" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" fill="none"/>
                  <polygon points="12,2 14.5,8 21,8 16,12.5 18,19 12,15 6,19 8,12.5 3,8 9.5,8" fill="white"/>
                </svg>
              </div>
              <h3 className="font-semibold text-white">Próximo Partido</h3>
            </div>
            {upcomingMatch && (
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="flex items-center gap-2">
                  {getFlagImg(upcomingMatch.homeTeam)}
                  <span className="font-semibold text-white text-lg">{upcomingMatch.homeTeam}</span>
                </div>
                <div className="text-white/80 text-sm font-medium">vs</div>
                <div className="flex items-center gap-2">
                  {getFlagImg(upcomingMatch.awayTeam)}
                  <span className="font-semibold text-white text-lg">{upcomingMatch.awayTeam}</span>
                </div>
                <p className="text-sm text-white/80 pt-2">{upcomingMatch.date} • {upcomingMatch.time}</p>
              </div>
            )}
          </div>
        </div>

        {/* ÚLTIMO RESULTADO */}
        <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <img src="/src/assets/ultimosresultados.webp" alt="Último Resultado" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="white"/>
                </svg>
              </div>
              <h3 className="font-semibold text-white">Último Resultado</h3>
            </div>
            {lastResult && (
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="flex items-center gap-2">
                  {getFlagImg(lastResult.homeTeam)}
                  <span className="font-semibold text-white text-lg">{lastResult.homeTeam}</span>
                  <span className="text-2xl font-bold text-white">{lastResult.homeScore}</span>
                </div>
                <div className="text-white/70 text-sm font-medium">vs</div>
                <div className="flex items-center gap-2">
                  {getFlagImg(lastResult.awayTeam)}
                  <span className="font-semibold text-white text-lg">{lastResult.awayTeam}</span>
                  <span className="text-2xl font-bold text-white">{lastResult.awayScore}</span>
                </div>
                <p className="text-sm text-white/80 pt-2">{lastResult.stadium}</p>
              </div>
            )}
          </div>
        </div>

        {/* SELECCIONES */}
        <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <img src="/src/assets/selecciones.webp" alt="Selecciones" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="white"/>
                </svg>
              </div>
              <h3 className="font-semibold text-white">Selecciones</h3>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-5xl font-bold text-white">48</div>
              <p className="text-white/80 mt-2">Equipos Participantes</p>
            </div>
          </div>
        </div>

        {/* GOLEADORES */}
        <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <img src="/src/assets/goleadoresdeltorneo.webp" alt="Goleadores del Torneo" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white"/>
                </svg>
              </div>
              <h3 className="font-semibold text-white">Goleadores</h3>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <div className="flex items-center gap-2 w-full">
                <span className="text-yellow-400 font-bold">1°</span>
                {getFlagImg('Argentina')}
                <span className="text-white font-semibold flex-1 text-left">Messi</span>
                <span className="text-white font-bold">3 ⚽</span>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="text-gray-400 font-bold">2°</span>
                {getFlagImg('Francia')}
                <span className="text-white font-semibold flex-1 text-left">Mbappé</span>
                <span className="text-white font-bold">2 ⚽</span>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="text-amber-600 font-bold">3°</span>
                {getFlagImg('Brasil')}
                <span className="text-white font-semibold flex-1 text-left">Vinicius</span>
                <span className="text-white font-bold">2 ⚽</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* PARTIDO DESTACADO */}
      <section>
        <h2 className="text-3xl mb-6 text-gray-800">Partido Destacado</h2>
        <div className="bg-gradient-to-br from-[#003B7A] to-[#0055A5] text-white rounded-xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center flex-1">
              <div className="flex justify-center mb-3">
                {getFlagImg(featuredMatch.homeTeam, 'w80')}
              </div>
              <h3 className="text-2xl font-semibold">{featuredMatch.homeTeam}</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">VS</div>
              <div className="text-sm text-white/80">{featuredMatch.date}</div>
              <div className="text-sm text-white/80">{featuredMatch.time}</div>
              <div className="mt-3 text-sm text-white/90">{featuredMatch.stadium}</div>
            </div>
            <div className="text-center flex-1">
              <div className="flex justify-center mb-3">
                {getFlagImg(featuredMatch.awayTeam, 'w80')}
              </div>
              <h3 className="text-2xl font-semibold">{featuredMatch.awayTeam}</h3>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}