import { MapPin, Users, Calendar } from 'lucide-react';
import { stadiums } from '../../data/mockData';
import { useState } from 'react';

export function Stadiums() {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedStadium, setSelectedStadium] = useState<string | null>(null);

  const stadium = selectedStadium ? stadiums.find(s => s.id === selectedStadium) : null;

  const countries = ['all', 'Estados Unidos', 'México', 'Canadá'];

  const filteredStadiums = stadiums.filter(s =>
    selectedCountry === 'all' || s.country === selectedCountry
  );

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      'México': '🇲🇽',
      'Canadá': '🇨🇦',
      'Estados Unidos': '🇺🇸'
    };
    return flags[country] || '🏟️';
  };

  if (stadium) {
    return (
      <div>
        <button
          onClick={() => setSelectedStadium(null)}
          className="flex items-center gap-2 text-[#003B7A] hover:text-[#0055A5] mb-6"
        >
          ← Volver a estadios
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-80">
            <img
              src={stadium.image}
              alt={stadium.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '';
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-2">{stadium.name}</h1>
              <div className="flex items-center gap-2 text-white/90">
                <span className="text-2xl">{getCountryFlag(stadium.country)}</span>
                <MapPin size={18} />
                <span className="text-lg">{stadium.city}, {stadium.country}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <Users size={28} className="text-[#003B7A] mx-auto mb-2" />
                <p className="text-3xl font-bold text-[#003B7A]">{stadium.capacity.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-1">Capacidad</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <Calendar size={28} className="text-green-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-green-600">{stadium.yearBuilt}</p>
                <p className="text-sm text-gray-600 mt-1">Año de inauguración</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 text-center">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-purple-600 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
                <p className="text-3xl font-bold text-purple-600">{stadium.matches}</p>
                <p className="text-sm text-gray-600 mt-1">Partidos programados</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">Información adicional</h3>
              <p className="text-gray-700">
                El {stadium.name} es uno de los estadios más emblemáticos que albergará partidos
                del Mundial FIFA 2026. Con capacidad para {stadium.capacity.toLocaleString()} espectadores,
                será sede de {stadium.matches} encuentros emocionantes durante el torneo en {stadium.city}, {stadium.country}.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl mb-8 text-gray-800">Estadios del Mundial 2026</h1>

      {/* FILTRO POR PAÍS */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Filtrar por País</h3>
        <div className="flex flex-wrap gap-3">
          {countries.map(country => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
                selectedCountry === country
                  ? 'bg-[#003B7A] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {country === 'all' ? 'Todos' : `${getCountryFlag(country)} ${country}`}
            </button>
          ))}
        </div>
      </div>

      {/* GRID DE ESTADIOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStadiums.map(stadium => (
          <div
            key={stadium.id}
            onClick={() => setSelectedStadium(stadium.id)}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden border border-gray-100 group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={stadium.image}
                alt={stadium.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="text-2xl">{getCountryFlag(stadium.country)}</span>
                <span className="text-white text-sm font-medium">{stadium.city}</span>
              </div>
              <div className="absolute top-3 right-3 bg-[#003B7A] text-white px-3 py-1 rounded-full text-xs font-semibold">
                {stadium.matches} partidos
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{stadium.name}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users size={15} className="text-[#003B7A]" />
                  <span>{stadium.capacity.toLocaleString()} espectadores</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-[#003B7A]" />
                  <span>Inaugurado en {stadium.yearBuilt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-[#003B7A]" />
                  <span>{stadium.country}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}