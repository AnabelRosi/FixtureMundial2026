export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  club: string;
  age: number;
  height: number;
  weight: number;
  caps: number;
  goals: number;
  assists: number;
  minutes: number;
  yellowCards: number;
  redCards: number;
  worldCupHistory: string;
}

export interface Team {
  id: string;
  name: string;
  flag: string;
  flagCode: string;
  confederation: string;
  coach: string;
  fifaRanking: number;
  worldCupParticipations: number;
  bestResult: string;
  group: string;
  players: Player[];
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  stadium: string;
  city: string;
  group: string;
  homeScore?: number;
  awayScore?: number;
  phase: 'Group Stage' | 'Round of 32' | 'Round of 16' | 'Quarter Finals' | 'Semi Finals' | 'Final';
  status: 'scheduled' | 'live' | 'finished';
}

export interface Stadium {
  id: string;
  name: string;
  city: string;
  country: 'México' | 'Canadá' | 'Estados Unidos';
  capacity: number;
  yearBuilt: number;
  matches: number;
  image: string;
}

export interface GroupStanding {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}


export const stadiums: Stadium[] = [
  {
    id: 'azteca',
    name: 'Estadio Azteca',
    city: 'Ciudad de México',
    country: 'México',
    capacity: 87523,
    yearBuilt: 1966,
    matches: 8,
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80'
  },
  {
    id: 'metlife',
    name: 'MetLife Stadium',
    city: 'Nueva Jersey',
    country: 'Estados Unidos',
    capacity: 82500,
    yearBuilt: 2010,
    matches: 8,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80'
  },
  {
    id: 'sofi',
    name: 'SoFi Stadium',
    city: 'Los Ángeles',
    country: 'Estados Unidos',
    capacity: 70240,
    yearBuilt: 2020,
    matches: 7,
    image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=800&q=80'
  },
  {
    id: 'att',
    name: 'AT&T Stadium',
    city: 'Arlington',
    country: 'Estados Unidos',
    capacity: 80000,
    yearBuilt: 2009,
    matches: 7,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80'
  },
  {
    id: 'bmo',
    name: 'BMO Field',
    city: 'Toronto',
    country: 'Canadá',
    capacity: 45500,
    yearBuilt: 2007,
    matches: 6,
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80'
  },
  {
    id: 'bbva',
    name: 'Estadio BBVA',
    city: 'Monterrey',
    country: 'México',
    capacity: 53500,
    yearBuilt: 2015,
    matches: 6,
    image: 'https://images.unsplash.com/photo-1556816213-354f0e306e2d?w=800&q=80'
  },
  {
    id: 'akron',
    name: 'Estadio Akron',
    city: 'Guadalajara',
    country: 'México',
    capacity: 46232,
    yearBuilt: 2010,
    matches: 5,
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80'
  },
  {
    id: 'bc-place',
    name: 'BC Place',
    city: 'Vancouver',
    country: 'Canadá',
    capacity: 54500,
    yearBuilt: 1983,
    matches: 5,
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&q=80'
  },
  {
    id: 'gillette',
    name: 'Gillette Stadium',
    city: 'Boston',
    country: 'Estados Unidos',
    capacity: 65878,
    yearBuilt: 2002,
    matches: 6,
    image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80'
  },
  {
    id: 'arrowhead',
    name: 'Arrowhead Stadium',
    city: 'Kansas City',
    country: 'Estados Unidos',
    capacity: 76416,
    yearBuilt: 1972,
    matches: 6,
    image: 'https://images.unsplash.com/photo-1540747913346-19212a4b423e?w=800&q=80'
  },
  {
    id: 'nrg',
    name: 'NRG Stadium',
    city: 'Houston',
    country: 'Estados Unidos',
    capacity: 72220,
    yearBuilt: 2002,
    matches: 7,
    image: 'https://images.unsplash.com/photo-1567959879413-e25de39be9c0?w=800&q=80'
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    country: 'Estados Unidos',
    capacity: 71000,
    yearBuilt: 2017,
    matches: 8,
    image: 'https://images.unsplash.com/photo-1504016798967-59a258e6a746?w=800&q=80'
  },
  {
    id: 'lincoln',
    name: 'Lincoln Financial Field',
    city: 'Filadelfia',
    country: 'Estados Unidos',
    capacity: 69796,
    yearBuilt: 2003,
    matches: 6,
    image: 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=800&q=80'
  },
  {
    id: 'levi',
    name: "Levi's Stadium",
    city: 'San Francisco',
    country: 'Estados Unidos',
    capacity: 68500,
    yearBuilt: 2014,
    matches: 6,
    image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80'
  },
  {
    id: 'snapdragon',
    name: 'Snapdragon Stadium',
    city: 'San Diego',
    country: 'Estados Unidos',
    capacity: 35000,
    yearBuilt: 2022,
    matches: 5,
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80'
  },
  {
    id: 'estadio-ciudad',
    name: 'Estadio Ciudad de los Deportes',
    city: 'Ciudad de México',
    country: 'México',
    capacity: 42114,
    yearBuilt: 1954,
    matches: 5,
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80'
  },
];

export const teams: Team[] = [
  // GRUPO A
  { id: 'mex', name: 'México', flag: '🇲🇽', flagCode: 'mx', confederation: 'CONCACAF', coach: 'Javier Aguirre', fifaRanking: 12, worldCupParticipations: 17, bestResult: 'Cuartos de Final (1970, 1986)', group: 'A', players: [] },
  { id: 'rsa', name: 'Sudáfrica', flag: '🇿🇦', flagCode: 'za', confederation: 'CAF', coach: 'Hugo Broos', fifaRanking: 60, worldCupParticipations: 3, bestResult: 'Fase de Grupos', group: 'A', players: [] },
  { id: 'kor', name: 'Corea del Sur', flag: '🇰🇷', flagCode: 'kr', confederation: 'AFC', coach: 'Hong Myung-bo', fifaRanking: 22, worldCupParticipations: 11, bestResult: 'Semifinal (2002)', group: 'A', players: [] },
  { id: 'cze', name: 'Chequia', flag: '🇨🇿', flagCode: 'cz', confederation: 'UEFA', coach: 'Ivan Hasek', fifaRanking: 37, worldCupParticipations: 9, bestResult: 'Semifinal (1990)', group: 'A', players: [] },

  // GRUPO B
  { id: 'can', name: 'Canadá', flag: '🇨🇦', flagCode: 'ca', confederation: 'CONCACAF', coach: 'Jesse Marsch', fifaRanking: 40, worldCupParticipations: 3, bestResult: 'Fase de Grupos (2022)', group: 'B', players: [] },
  { id: 'sui', name: 'Suiza', flag: '🇨🇭', flagCode: 'ch', confederation: 'UEFA', coach: 'Murat Yakin', fifaRanking: 19, worldCupParticipations: 12, bestResult: 'Cuartos de Final (1934, 1938, 1954)', group: 'B', players: [] },
  { id: 'qat', name: 'Qatar', flag: '🇶🇦', flagCode: 'qa', confederation: 'AFC', coach: 'Marquez Lopez', fifaRanking: 58, worldCupParticipations: 2, bestResult: 'Fase de Grupos (2022)', group: 'B', players: [] },
  { id: 'bih', name: 'Bosnia y Herzegovina', flag: '🇧🇦', flagCode: 'ba', confederation: 'UEFA', coach: 'Sergej Barbarez', fifaRanking: 63, worldCupParticipations: 2, bestResult: 'Fase de Grupos (2014)', group: 'B', players: [] },

  // GRUPO C
  { id: 'bra', name: 'Brasil', flag: '🇧🇷', flagCode: 'br', confederation: 'CONMEBOL', coach: 'Dorival Júnior', fifaRanking: 5, worldCupParticipations: 22, bestResult: 'Campeón (5 veces)', group: 'C', players: [] },
  { id: 'mar', name: 'Marruecos', flag: '🇲🇦', flagCode: 'ma', confederation: 'CAF', coach: 'Walid Regragui', fifaRanking: 14, worldCupParticipations: 7, bestResult: 'Semifinal (2022)', group: 'C', players: [] },
  { id: 'hai', name: 'Haití', flag: '🇭🇹', flagCode: 'ht', confederation: 'CONCACAF', coach: 'Marc Collat', fifaRanking: 83, worldCupParticipations: 1, bestResult: 'Fase de Grupos (1974)', group: 'C', players: [] },
  { id: 'sco', name: 'Escocia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', flagCode: 'gb-sct', confederation: 'UEFA', coach: 'Steve Clarke', fifaRanking: 39, worldCupParticipations: 8, bestResult: 'Fase de Grupos', group: 'C', players: [] },

  // GRUPO D
  { id: 'usa', name: 'Estados Unidos', flag: '🇺🇸', flagCode: 'us', confederation: 'CONCACAF', coach: 'Mauricio Pochettino', fifaRanking: 11, worldCupParticipations: 11, bestResult: 'Tercer Lugar (1930)', group: 'D', players: [] },
  { id: 'par', name: 'Paraguay', flag: '🇵🇾', flagCode: 'py', confederation: 'CONMEBOL', coach: 'Gustavo Alfaro', fifaRanking: 55, worldCupParticipations: 9, bestResult: 'Cuartos de Final (1986, 2010)', group: 'D', players: [] },
  { id: 'aus', name: 'Australia', flag: '🇦🇺', flagCode: 'au', confederation: 'AFC', coach: 'Tony Popovic', fifaRanking: 23, worldCupParticipations: 6, bestResult: 'Cuartos de Final (2006)', group: 'D', players: [] },
  { id: 'tur', name: 'Turquía', flag: '🇹🇷', flagCode: 'tr', confederation: 'UEFA', coach: 'Vincenzo Montella', fifaRanking: 29, worldCupParticipations: 3, bestResult: 'Tercer Lugar (2002)', group: 'D', players: [] },

  // GRUPO E
  { id: 'ger', name: 'Alemania', flag: '🇩🇪', flagCode: 'de', confederation: 'UEFA', coach: 'Julian Nagelsmann', fifaRanking: 10, worldCupParticipations: 20, bestResult: 'Campeón (4 veces)', group: 'E', players: [] },
  { id: 'cur', name: 'Curazao', flag: '🇨🇼', flagCode: 'cw', confederation: 'CONCACAF', coach: 'Remko Bicentini', fifaRanking: 89, worldCupParticipations: 1, bestResult: 'Fase de Grupos (2026)', group: 'E', players: [] },
  { id: 'civ', name: 'Costa de Marfil', flag: '🇨🇮', flagCode: 'ci', confederation: 'CAF', coach: 'Emerse Faé', fifaRanking: 48, worldCupParticipations: 4, bestResult: 'Fase de Grupos', group: 'E', players: [] },
  { id: 'ecu', name: 'Ecuador', flag: '🇪🇨', flagCode: 'ec', confederation: 'CONMEBOL', coach: 'Sébastien Beccacece', fifaRanking: 32, worldCupParticipations: 4, bestResult: 'Segunda Ronda (2006)', group: 'E', players: [] },

  // GRUPO F
  { id: 'ned', name: 'Países Bajos', flag: '🇳🇱', flagCode: 'nl', confederation: 'UEFA', coach: 'Ronald Koeman', fifaRanking: 7, worldCupParticipations: 11, bestResult: 'Subcampeón (1974, 1978, 2010)', group: 'F', players: [] },
  { id: 'jpn', name: 'Japón', flag: '🇯🇵', flagCode: 'jp', confederation: 'AFC', coach: 'Hajime Moriyasu', fifaRanking: 17, worldCupParticipations: 8, bestResult: 'Segunda Ronda', group: 'F', players: [] },
  { id: 'tun', name: 'Túnez', flag: '🇹🇳', flagCode: 'tn', confederation: 'CAF', coach: 'Faouzi Benzarti', fifaRanking: 30, worldCupParticipations: 6, bestResult: 'Fase de Grupos', group: 'F', players: [] },
  { id: 'swe', name: 'Suecia', flag: '🇸🇪', flagCode: 'se', confederation: 'UEFA', coach: 'Jon Dahl Tomasson', fifaRanking: 24, worldCupParticipations: 12, bestResult: 'Subcampeón (1958)', group: 'F', players: [] },

  // GRUPO G
  { id: 'bel', name: 'Bélgica', flag: '🇧🇪', flagCode: 'be', confederation: 'UEFA', coach: 'Domenico Tedesco', fifaRanking: 3, worldCupParticipations: 14, bestResult: 'Tercer Lugar (2018)', group: 'G', players: [] },
  { id: 'egy', name: 'Egipto', flag: '🇪🇬', flagCode: 'eg', confederation: 'CAF', coach: 'Hossam Hassan', fifaRanking: 34, worldCupParticipations: 4, bestResult: 'Fase de Grupos', group: 'G', players: [] },
  { id: 'irn', name: 'Irán', flag: '🇮🇷', flagCode: 'ir', confederation: 'AFC', coach: 'Amir Ghalenoei', fifaRanking: 20, worldCupParticipations: 6, bestResult: 'Fase de Grupos', group: 'G', players: [] },
  { id: 'nzl', name: 'Nueva Zelanda', flag: '🇳🇿', flagCode: 'nz', confederation: 'OFC', coach: 'Darren Bazeley', fifaRanking: 97, worldCupParticipations: 3, bestResult: 'Fase de Grupos', group: 'G', players: [] },

  // GRUPO H
  { id: 'esp', name: 'España', flag: '🇪🇸', flagCode: 'es', confederation: 'UEFA', coach: 'Luis de la Fuente', fifaRanking: 8, worldCupParticipations: 16, bestResult: 'Campeón (2010)', group: 'H', players: [] },
  { id: 'cpv', name: 'Cabo Verde', flag: '🇨🇻', flagCode: 'cv', confederation: 'CAF', coach: 'Bubista', fifaRanking: 71, worldCupParticipations: 1, bestResult: 'Fase de Grupos (2026)', group: 'H', players: [] },
  { id: 'ksa', name: 'Arabia Saudita', flag: '🇸🇦', flagCode: 'sa', confederation: 'AFC', coach: 'Roberto Mancini', fifaRanking: 56, worldCupParticipations: 7, bestResult: 'Segunda Ronda (1994)', group: 'H', players: [] },
  { id: 'uru', name: 'Uruguay', flag: '🇺🇾', flagCode: 'uy', confederation: 'CONMEBOL', coach: 'Marcelo Bielsa', fifaRanking: 14, worldCupParticipations: 14, bestResult: 'Campeón (1930, 1950)', group: 'H', players: [] },

  // GRUPO I
  { id: 'fra', name: 'Francia', flag: '🇫🇷', flagCode: 'fr', confederation: 'UEFA', coach: 'Didier Deschamps', fifaRanking: 2, worldCupParticipations: 16, bestResult: 'Campeón (1998, 2018)', group: 'I', players: [] },
  { id: 'sen', name: 'Senegal', flag: '🇸🇳', flagCode: 'sn', confederation: 'CAF', coach: 'Aliou Cissé', fifaRanking: 18, worldCupParticipations: 4, bestResult: 'Cuartos de Final (2002)', group: 'I', players: [] },
  { id: 'nor', name: 'Noruega', flag: '🇳🇴', flagCode: 'no', confederation: 'UEFA', coach: 'Stale Solbakken', fifaRanking: 26, worldCupParticipations: 3, bestResult: 'Cuartos de Final (1938)', group: 'I', players: [] },
  { id: 'irq', name: 'Irak', flag: '🇮🇶', flagCode: 'iq', confederation: 'AFC', coach: 'Jesús Casas', fifaRanking: 58, worldCupParticipations: 2, bestResult: 'Fase de Grupos (1986)', group: 'I', players: [] },

  // GRUPO J
  {
    id: 'arg', name: 'Argentina', flag: '🇦🇷', flagCode: 'ar', confederation: 'CONMEBOL', coach: 'Lionel Scaloni', fifaRanking: 1, worldCupParticipations: 18, bestResult: 'Campeón (1978, 1986, 2022)', group: 'J',
    players: [
      { id: 'messi', name: 'Lionel Messi', number: 10, position: 'FW', club: 'Inter Miami', age: 38, height: 170, weight: 72, caps: 187, goals: 106, assists: 58, minutes: 15890, yellowCards: 8, redCards: 0, worldCupHistory: 'Qatar 2022: Campeón, 7 goles' },
      { id: 'dibu', name: 'Emiliano Martínez', number: 23, position: 'GK', club: 'Aston Villa', age: 33, height: 195, weight: 88, caps: 45, goals: 0, assists: 0, minutes: 4050, yellowCards: 3, redCards: 0, worldCupHistory: 'Qatar 2022: Campeón, Guante de Oro' }
    ]
  },
  { id: 'alg', name: 'Argelia', flag: '🇩🇿', flagCode: 'dz', confederation: 'CAF', coach: 'Vladimir Petkovic', fifaRanking: 35, worldCupParticipations: 4, bestResult: 'Segunda Ronda (2014)', group: 'J', players: [] },
  { id: 'aut', name: 'Austria', flag: '🇦🇹', flagCode: 'at', confederation: 'UEFA', coach: 'Ralf Rangnick', fifaRanking: 25, worldCupParticipations: 7, bestResult: 'Tercer Lugar (1954)', group: 'J', players: [] },
  { id: 'jor', name: 'Jordania', flag: '🇯🇴', flagCode: 'jo', confederation: 'AFC', coach: 'Hussein Ammouta', fifaRanking: 68, worldCupParticipations: 1, bestResult: 'Fase de Grupos (2026)', group: 'J', players: [] },

  // GRUPO K
  { id: 'por', name: 'Portugal', flag: '🇵🇹', flagCode: 'pt', confederation: 'UEFA', coach: 'Roberto Martínez', fifaRanking: 6, worldCupParticipations: 9, bestResult: 'Tercer Lugar (1966)', group: 'K', players: [] },
  { id: 'col', name: 'Colombia', flag: '🇨🇴', flagCode: 'co', confederation: 'CONMEBOL', coach: 'Néstor Lorenzo', fifaRanking: 13, worldCupParticipations: 7, bestResult: 'Cuartos de Final (2014)', group: 'K', players: [] },
  { id: 'uzb', name: 'Uzbekistán', flag: '🇺🇿', flagCode: 'uz', confederation: 'AFC', coach: 'Srecko Katanec', fifaRanking: 62, worldCupParticipations: 1, bestResult: 'Fase de Grupos (2026)', group: 'K', players: [] },
  { id: 'cod', name: 'R.D. Congo', flag: '🇨🇩', flagCode: 'cd', confederation: 'CAF', coach: 'Sébastien Desabre', fifaRanking: 52, worldCupParticipations: 2, bestResult: 'Cuartos de Final (1970)', group: 'K', players: [] },

  // GRUPO L
  { id: 'eng', name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', flagCode: 'gb-eng', confederation: 'UEFA', coach: 'Thomas Tuchel', fifaRanking: 4, worldCupParticipations: 16, bestResult: 'Campeón (1966)', group: 'L', players: [] },
  { id: 'cro', name: 'Croacia', flag: '🇭🇷', flagCode: 'hr', confederation: 'UEFA', coach: 'Zlatko Dalic', fifaRanking: 9, worldCupParticipations: 7, bestResult: 'Subcampeón (2018)', group: 'L', players: [] },
  { id: 'gha', name: 'Ghana', flag: '🇬🇭', flagCode: 'gh', confederation: 'CAF', coach: 'Otto Addo', fifaRanking: 61, worldCupParticipations: 4, bestResult: 'Cuartos de Final (2010)', group: 'L', players: [] },
  { id: 'pan', name: 'Panamá', flag: '🇵🇦', flagCode: 'pa', confederation: 'CONCACAF', coach: 'Thomas Christiansen', fifaRanking: 77, worldCupParticipations: 2, bestResult: 'Fase de Grupos (2018)', group: 'L', players: [] },
];

export const matches: Match[] = [
  {
    id: 'm1',
    homeTeam: 'México',
    awayTeam: 'Sudáfrica',
    date: '2026-06-11',
    time: '15:00',
    stadium: 'Estadio Azteca',
    city: 'Ciudad de México',
    group: 'A',
    homeScore: 2,
    awayScore: 0,
    phase: 'Group Stage',
    status: 'finished'
  },
  {
    id: 'm2',
    homeTeam: 'Corea del Sur',
    awayTeam: 'Chequia',
    date: '2026-06-11',
    time: '22:00',
    stadium: 'Estadio Akron',
    city: 'Guadalajara',
    group: 'A',
    homeScore: 2,
    awayScore: 1,
    phase: 'Group Stage',
    status: 'finished'
  },
  {
    id: 'm3',
    homeTeam: 'Canadá',
    awayTeam: 'Bosnia y Herzegovina',
    date: '2026-06-12',
    time: '15:00',
    stadium: 'BMO Field',
    city: 'Toronto',
    group: 'B',
    phase: 'Group Stage',
    status: 'scheduled'
  },
  {
    id: 'm4',
    homeTeam: 'Qatar',
    awayTeam: 'Suiza',
    date: '2026-06-13',
    time: '15:00',
    stadium: 'MetLife Stadium',
    city: 'Nueva Jersey',
    group: 'B',
    phase: 'Group Stage',
    status: 'scheduled'
  },
  {
    id: 'm5',
    homeTeam: 'Brasil',
    awayTeam: 'Marruecos',
    date: '2026-06-13',
    time: '21:00',
    stadium: 'SoFi Stadium',
    city: 'Los Ángeles',
    group: 'C',
    phase: 'Group Stage',
    status: 'scheduled'
  },
  {
    id: 'm6',
    homeTeam: 'Estados Unidos',
    awayTeam: 'Paraguay',
    date: '2026-06-14',
    time: '15:00',
    stadium: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    group: 'D',
    phase: 'Group Stage',
    status: 'scheduled'
  },
  {
    id: 'm7',
    homeTeam: 'Francia',
    awayTeam: 'Senegal',
    date: '2026-06-14',
    time: '21:00',
    stadium: 'Gillette Stadium',
    city: 'Boston',
    group: 'I',
    phase: 'Group Stage',
    status: 'scheduled'
  },
  {
    id: 'm8',
    homeTeam: 'Argentina',
    awayTeam: 'Argelia',
    date: '2026-06-15',
    time: '18:00',
    stadium: 'MetLife Stadium',
    city: 'Nueva Jersey',
    group: 'J',
    phase: 'Group Stage',
    status: 'scheduled'
  },
  {
    id: 'm9',
    homeTeam: 'España',
    awayTeam: 'Cabo Verde',
    date: '2026-06-15',
    time: '21:00',
    stadium: 'Lincoln Financial Field',
    city: 'Filadelfia',
    group: 'H',
    phase: 'Group Stage',
    status: 'scheduled'
  },
  {
    id: 'm10',
    homeTeam: 'Portugal',
    awayTeam: 'Colombia',
    date: '2026-06-16',
    time: '18:00',
    stadium: 'NRG Stadium',
    city: 'Houston',
    group: 'K',
    phase: 'Group Stage',
    status: 'scheduled'
  },
];

export const groupStandings: Record<string, GroupStanding[]> = {
  A: [
    { team: 'México', played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 0, goalDifference: 2, points: 3 },
    { team: 'Corea del Sur', played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 1, goalDifference: 1, points: 3 },
    { team: 'Sudáfrica', played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 2, goalDifference: -2, points: 0 },
    { team: 'Chequia', played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 2, goalDifference: -1, points: 0 },
  ],
  B: [
    { team: 'Canadá', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Suiza', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Qatar', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Bosnia y Herzegovina', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  ],
  C: [
    { team: 'Brasil', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Marruecos', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Haití', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Escocia', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  ],
  D: [
    { team: 'Estados Unidos', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Paraguay', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Australia', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Turquía', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  ],
  E: [
    { team: 'Alemania', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Curazao', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Costa de Marfil', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Ecuador', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  ],
  F: [
    { team: 'Países Bajos', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Japón', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Túnez', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Suecia', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  ],
  G: [
    { team: 'Bélgica', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Egipto', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Irán', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Nueva Zelanda', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  ],
  H: [
    { team: 'España', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Cabo Verde', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Arabia Saudita', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Uruguay', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  ],
  I: [
    { team: 'Francia', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Senegal', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Noruega', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Irak', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  ],
  J: [
    { team: 'Argentina', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Argelia', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Austria', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Jordania', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  ],
  K: [
    { team: 'Portugal', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Colombia', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Uzbekistán', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'R.D. Congo', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  ],
  L: [
    { team: 'Inglaterra', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Croacia', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Ghana', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { team: 'Panamá', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  ],
};