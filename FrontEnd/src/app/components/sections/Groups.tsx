import { teams } from '../../data/mockData';

interface GroupsProps {
  onSelectTeam: (teamId: string) => void;
}

export function Groups({ onSelectTeam }: GroupsProps) {
  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  const getTeamsByGroup = (group: string) => {
    return teams.filter(team => team.group === group);
  };

  return (
    <div>
      <h1 className="text-4xl mb-8 text-gray-800">Grupos del Mundial</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map(group => {
          const groupTeams = getTeamsByGroup(group);
          return (
            <div key={group} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#003B7A] to-[#0055A5] text-white p-4">
                <h2 className="text-2xl font-bold text-center">Grupo {group}</h2>
              </div>
              <div className="p-6 space-y-4">
                {groupTeams.map((team, index) => (
                  <div
                    key={team.id}
                    onClick={() => onSelectTeam(team.id)}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-[#003B7A] text-white rounded-full font-semibold text-sm">
                      {index + 1}
                    </div>
                    <img
                    src={`https://flagcdn.com/w40/${team.flagCode}.png`}
                    alt={team.name}
                    className="w-10 h-7 object-cover rounded shadow-sm"
                    onError={(e) => { e.currentTarget.src = ''; e.currentTarget.style.display = 'none'; }}
/>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{team.name}</div>
                      <div className="text-sm text-gray-500">FIFA Ranking: {team.fifaRanking}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
