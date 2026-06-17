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
   image: '/src/assets/Estadio_Azsteca.webp'
  },
  {
    id: 'metlife',
    name: 'MetLife Stadium',
    city: 'Nueva Jersey',
    country: 'Estados Unidos',
    capacity: 82500,
    yearBuilt: 2010,
    matches: 8,
    image: '/src/assets/MetLife_Stadium.webp'
  },
  {
    id: 'sofi',
    name: 'SoFi Stadium',
    city: 'Los Ángeles',
    country: 'Estados Unidos',
    capacity: 70240,
    yearBuilt: 2020,
    matches: 7,
    image: '/src/assets/SoFI_Stadium.webp'
  },
  {
    id: 'att',
    name: 'AT&T Stadium',
    city: 'Arlington',
    country: 'Estados Unidos',
    capacity: 80000,
    yearBuilt: 2009,
    matches: 7,
    image: '/src/assets/AT&T_Stadium.webp'
  },
  {
    id: 'bmo',
    name: 'BMO Field',
    city: 'Toronto',
    country: 'Canadá',
    capacity: 45500,
    yearBuilt: 2007,
    matches: 6,
    image:  '/src/assets/BMO_Stadio.webp'
  },
  {
    id: 'bbva',
    name: 'Estadio BBVA',
    city: 'Monterrey',
    country: 'México',
    capacity: 53500,
    yearBuilt: 2015,
    matches: 6,
    image: '/src/assets/Estadio_BBVA.webp'
  },
  {
    id: 'akron',
    name: 'Estadio Akron',
    city: 'Guadalajara',
    country: 'México',
    capacity: 46232,
    yearBuilt: 2010,
    matches: 5,
    image: '/src/assets/Akron_Stadio.webp'
  },
  {
    id: 'bc-place',
    name: 'BC Place',
    city: 'Vancouver',
    country: 'Canadá',
    capacity: 54500,
    yearBuilt: 1983,
    matches: 5,
    image: '/src/assets/BC_stadium.webp'
  },
  {
    id: 'gillette',
    name: 'Gillette Stadium',
    city: 'Boston',
    country: 'Estados Unidos',
    capacity: 65878,
    yearBuilt: 2002,
    matches: 6,
    image: '/src/assets/Guillette_Stadium.webp'
  },
  {
    id: 'arrowhead',
    name: 'Arrowhead Stadium',
    city: 'Kansas City',
    country: 'Estados Unidos',
    capacity: 76416,
    yearBuilt: 1972,
    matches: 6,
    image: '/src/assets/Arrowhead_Stadium.webp'
  },
  {
    id: 'nrg',
    name: 'NRG Stadium',
    city: 'Houston',
    country: 'Estados Unidos',
    capacity: 72220,
    yearBuilt: 2002,
    matches: 7,
    image: '/src/assets/NRC_stadium.webp'
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    country: 'Estados Unidos',
    capacity: 71000,
    yearBuilt: 2017,
    matches: 8,
    image: '/src/assets/Mercedes_benz_stadium.webp'
  },
  {
    id: 'lincoln',
    name: 'Lincoln Financial Field',
    city: 'Filadelfia',
    country: 'Estados Unidos',
    capacity: 69796,
    yearBuilt: 2003,
    matches: 6,
    image: '/src/assets/Lincoln_stadium.webp'
  },
  {
    id: 'levi',
    name: "Levi's Stadium",
    city: 'San Francisco',
    country: 'Estados Unidos',
    capacity: 68500,
    yearBuilt: 2014,
    matches: 6,
    image: '/src/assets/Levi´s_stadium.webp'
  },
  {
    id: 'snapdragon',
    name: 'Snapdragon Stadium',
    city: 'San Diego',
    country: 'Estados Unidos',
    capacity: 35000,
    yearBuilt: 2022,
    matches: 5,
    image: '/src/assets/snapdragon-stadium-shadows.webp'
  },
  {
    id: 'estadio-ciudad',
    name: 'Estadio Ciudad de los Deportes',
    city: 'Ciudad de México',
    country: 'México',
    capacity: 42114,
    yearBuilt: 1954,
    matches: 5,
    image: '/src/assets/Estadio_Ciudad_de_los_Deportes.webp'
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
  { id: 'bra', name: 'Brasil', flag: '🇧🇷', flagCode: 'br', confederation: 'CONMEBOL', coach: 'Dorival Júnior', fifaRanking: 5, worldCupParticipations: 22, bestResult: 'Campeón (5 veces)', group: 'C', 
    players: [
      { id: 'vini', name: 'Vinicius Jr.', number: 7, position: 'FW', club: 'Real Madrid', age: 24, height: 176, weight: 73, caps: 45, goals: 24, assists: 18, minutes: 3820, yellowCards: 3, redCards: 0, worldCupHistory: 'Qatar 2022: Cuartos de Final' },
      { id: 'rod', name: 'Rodrygo', number: 11, position: 'FW', club: 'Real Madrid', age: 24, height: 174, weight: 64, caps: 38, goals: 12, assists: 9, minutes: 2940, yellowCards: 2, redCards: 0, worldCupHistory: 'Qatar 2022: Cuartos de Final' },
      { id: 'alisson', name: 'Alisson Becker', number: 1, position: 'GK', club: 'Liverpool', age: 32, height: 193, weight: 91, caps: 72, goals: 0, assists: 1, minutes: 6480, yellowCards: 1, redCards: 0, worldCupHistory: 'Qatar 2022: Cuartos de Final' },
      { id: 'mar', name: 'Marquinhos', number: 4, position: 'DF', club: 'PSG', age: 30, height: 183, weight: 75, caps: 82, goals: 8, assists: 3, minutes: 7200, yellowCards: 5, redCards: 0, worldCupHistory: 'Qatar 2022: Cuartos de Final' },
      { id: 'cas', name: 'Casemiro', number: 5, position: 'MF', club: 'Manchester United', age: 33, height: 185, weight: 84, caps: 84, goals: 8, assists: 5, minutes: 7320, yellowCards: 12, redCards: 1, worldCupHistory: 'Qatar 2022: Cuartos de Final' },
    ] },
  { id: 'mar', name: 'Marruecos', flag: '🇲🇦', flagCode: 'ma', confederation: 'CAF', coach: 'Walid Regragui', fifaRanking: 14, worldCupParticipations: 7, bestResult: 'Semifinal (2022)', group: 'C', players: [] },
  { id: 'hai', name: 'Haití', flag: '🇭🇹', flagCode: 'ht', confederation: 'CONCACAF', coach: 'Marc Collat', fifaRanking: 83, worldCupParticipations: 1, bestResult: 'Fase de Grupos (1974)', group: 'C', players: [] },
  { id: 'sco', name: 'Escocia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', flagCode: 'gb-sct', confederation: 'UEFA', coach: 'Steve Clarke', fifaRanking: 39, worldCupParticipations: 8, bestResult: 'Fase de Grupos', group: 'C', players: [] },

  // GRUPO D
  { id: 'usa', name: 'Estados Unidos', flag: '🇺🇸', flagCode: 'us', confederation: 'CONCACAF', coach: 'Mauricio Pochettino', fifaRanking: 11, worldCupParticipations: 11, bestResult: 'Tercer Lugar (1930)', group: 'D', players: [] },
  { id: 'par', name: 'Paraguay', flag: '🇵🇾', flagCode: 'py', confederation: 'CONMEBOL', coach: 'Gustavo Alfaro', fifaRanking: 55, worldCupParticipations: 9, bestResult: 'Cuartos de Final (1986, 2010)', group: 'D', players: [] },
  { id: 'aus', name: 'Australia', flag: '🇦🇺', flagCode: 'au', confederation: 'AFC', coach: 'Tony Popovic', fifaRanking: 23, worldCupParticipations: 6, bestResult: 'Cuartos de Final (2006)', group: 'D', players: [] },
  { id: 'tur', name: 'Turquía', flag: '🇹🇷', flagCode: 'tr', confederation: 'UEFA', coach: 'Vincenzo Montella', fifaRanking: 29, worldCupParticipations: 3, bestResult: 'Tercer Lugar (2002)', group: 'D', players: [] },

  // GRUPO E
  { id: 'ger', name: 'Alemania', flag: '🇩🇪', flagCode: 'de', confederation: 'UEFA', coach: 'Julian Nagelsmann', fifaRanking: 10, worldCupParticipations: 20, bestResult: 'Campeón (4 veces)', group: 'E', players: [
      { id: 'musiala', name: 'Jamal Musiala', number: 10, position: 'MF', club: 'Bayern Munich', age: 22, height: 180, weight: 70, caps: 42, goals: 14, assists: 16, minutes: 3420, yellowCards: 2, redCards: 0, worldCupHistory: 'Qatar 2022: Fase de Grupos' },
      { id: 'wirtz', name: 'Florian Wirtz', number: 17, position: 'MF', club: 'Bayer Leverkusen', age: 22, height: 176, weight: 68, caps: 28, goals: 9, assists: 14, minutes: 2280, yellowCards: 1, redCards: 0, worldCupHistory: 'Primera Copa del Mundo' },
      { id: 'neuer', name: 'Manuel Neuer', number: 1, position: 'GK', club: 'Bayern Munich', age: 39, height: 193, weight: 92, caps: 124, goals: 0, assists: 1, minutes: 11160, yellowCards: 4, redCards: 0, worldCupHistory: 'Campeón 2014, 4 Mundiales' },
      { id: 'rudiger', name: 'Antonio Rüdiger', number: 2, position: 'DF', club: 'Real Madrid', age: 31, height: 190, weight: 85, caps: 68, goals: 6, assists: 3, minutes: 5820, yellowCards: 10, redCards: 1, worldCupHistory: 'Qatar 2022: Fase de Grupos' },
      { id: 'kimmich', name: 'Joshua Kimmich', number: 6, position: 'MF', club: 'Bayern Munich', age: 29, height: 177, weight: 75, caps: 82, goals: 10, assists: 24, minutes: 7080, yellowCards: 14, redCards: 0, worldCupHistory: 'Qatar 2022: Fase de Grupos' },
  ] },
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
  { id: 'fra', name: 'Francia', flag: '🇫🇷', flagCode: 'fr', confederation: 'UEFA', coach: 'Didier Deschamps', fifaRanking: 2, worldCupParticipations: 16, bestResult: 'Campeón (1998, 2018)', group: 'I', players: [
      { id: 'mbappe', name: 'Kylian Mbappé', number: 10, position: 'FW', club: 'Real Madrid', age: 27, height: 178, weight: 73, caps: 88, goals: 52, assists: 28, minutes: 7480, yellowCards: 4, redCards: 0, worldCupHistory: 'Qatar 2022: Finalista, Campeón 2018' },
      { id: 'griezmann', name: 'Antoine Griezmann', number: 7, position: 'FW', club: 'Atletico Madrid', age: 35, height: 176, weight: 73, caps: 132, goals: 44, assists: 35, minutes: 11240, yellowCards: 8, redCards: 0, worldCupHistory: 'Qatar 2022: Finalista, Campeón 2018' },
      { id: 'maignan', name: 'Mike Maignan', number: 1, position: 'GK', club: 'AC Milan', age: 29, height: 191, weight: 82, caps: 28, goals: 0, assists: 0, minutes: 2520, yellowCards: 1, redCards: 0, worldCupHistory: 'Qatar 2022: Finalista' },
      { id: 'konate', name: 'Ibrahima Konaté', number: 5, position: 'DF', club: 'Liverpool', age: 26, height: 194, weight: 88, caps: 22, goals: 2, assists: 1, minutes: 1820, yellowCards: 3, redCards: 0, worldCupHistory: 'Qatar 2022: Finalista' },
      { id: 'tchouameni', name: 'Aurélien Tchouaméni', number: 8, position: 'MF', club: 'Real Madrid', age: 25, height: 188, weight: 81, caps: 38, goals: 5, assists: 4, minutes: 3180, yellowCards: 6, redCards: 0, worldCupHistory: 'Qatar 2022: Finalista' },
  ] },
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
  { id: 'por', name: 'Portugal', flag: '🇵🇹', flagCode: 'pt', confederation: 'UEFA', coach: 'Roberto Martínez', fifaRanking: 6, worldCupParticipations: 9, bestResult: 'Tercer Lugar (1966)', group: 'K', players: [
      { id: 'ronaldo', name: 'Cristiano Ronaldo', number: 7, position: 'FW', club: 'Al-Nassr', age: 41, height: 187, weight: 83, caps: 212, goals: 130, assists: 42, minutes: 18540, yellowCards: 11, redCards: 0, worldCupHistory: 'Qatar 2022: Cuartos de Final, 5 Mundiales' },
      { id: 'felix', name: 'João Félix', number: 11, position: 'FW', club: 'FC Barcelona', age: 25, height: 181, weight: 70, caps: 48, goals: 12, assists: 8, minutes: 3240, yellowCards: 3, redCards: 0, worldCupHistory: 'Qatar 2022: Cuartos de Final' },
      { id: 'costa', name: 'Diogo Costa', number: 1, position: 'GK', club: 'FC Porto', age: 25, height: 188, weight: 82, caps: 22, goals: 0, assists: 0, minutes: 1980, yellowCards: 1, redCards: 0, worldCupHistory: 'Qatar 2022: Cuartos de Final' },
      { id: 'cancelo', name: 'João Cancelo', number: 20, position: 'DF', club: 'FC Barcelona', age: 30, height: 182, weight: 74, caps: 58, goals: 5, assists: 14, minutes: 4820, yellowCards: 7, redCards: 0, worldCupHistory: 'Qatar 2022: Cuartos de Final' },
      { id: 'bvitinha', name: 'Vitinha', number: 8, position: 'MF', club: 'PSG', age: 25, height: 170, weight: 62, caps: 32, goals: 4, assists: 8, minutes: 2620, yellowCards: 3, redCards: 0, worldCupHistory: 'Qatar 2022: Cuartos de Final' },
  ] },
  { id: 'col', name: 'Colombia', flag: '🇨🇴', flagCode: 'co', confederation: 'CONMEBOL', coach: 'Néstor Lorenzo', fifaRanking: 13, worldCupParticipations: 7, bestResult: 'Cuartos de Final (2014)', group: 'K', players: [] },
  { id: 'uzb', name: 'Uzbekistán', flag: '🇺🇿', flagCode: 'uz', confederation: 'AFC', coach: 'Srecko Katanec', fifaRanking: 62, worldCupParticipations: 1, bestResult: 'Fase de Grupos (2026)', group: 'K', players: [] },
  { id: 'cod', name: 'R.D. Congo', flag: '🇨🇩', flagCode: 'cd', confederation: 'CAF', coach: 'Sébastien Desabre', fifaRanking: 52, worldCupParticipations: 2, bestResult: 'Cuartos de Final (1970)', group: 'K', players: [] },

  // GRUPO L
  { id: 'eng', name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', flagCode: 'gb-eng', confederation: 'UEFA', coach: 'Thomas Tuchel', fifaRanking: 4, worldCupParticipations: 16, bestResult: 'Campeón (1966)', group: 'L', players: [
      { id: 'bellingham', name: 'Jude Bellingham', number: 10, position: 'MF', club: 'Real Madrid', age: 21, height: 186, weight: 75, caps: 42, goals: 14, assists: 8, minutes: 3620, yellowCards: 5, redCards: 0, worldCupHistory: 'Qatar 2022: Cuartos de Final' },
      { id: 'kane', name: 'Harry Kane', number: 9, position: 'FW', club: 'Bayern Munich', age: 31, height: 188, weight: 86, caps: 94, goals: 68, assists: 22, minutes: 8240, yellowCards: 3, redCards: 0, worldCupHistory: 'Qatar 2022: Cuartos de Final, 2018: Bota de Oro' },
      { id: 'pickford', name: 'Jordan Pickford', number: 1, position: 'GK', club: 'Everton', age: 30, height: 185, weight: 76, caps: 58, goals: 0, assists: 0, minutes: 5220, yellowCards: 2, redCards: 0, worldCupHistory: 'Qatar 2022: Cuartos de Final' },
      { id: 'walker', name: 'Kyle Walker', number: 2, position: 'DF', club: 'AC Milan', age: 34, height: 178, weight: 70, caps: 82, goals: 2, assists: 8, minutes: 6840, yellowCards: 9, redCards: 0, worldCupHistory: 'Qatar 2022: Cuartos de Final' },
      { id: 'saka', name: 'Bukayo Saka', number: 7, position: 'FW', club: 'Arsenal', age: 23, height: 178, weight: 72, caps: 48, goals: 16, assists: 18, minutes: 3980, yellowCards: 3, redCards: 0, worldCupHistory: 'Qatar 2022: Cuartos de Final' },
  ] },
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