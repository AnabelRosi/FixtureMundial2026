import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/sections/Home';
import { Groups } from './components/sections/Groups';
import { TeamDetail } from './components/sections/TeamDetail';
import { Fixtures } from './components/sections/Fixtures';
import { Results } from './components/sections/Results';
import { Standings } from './components/sections/Standings';
import { Stadiums } from './components/sections/Stadiums';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { useAuth } from './hooks/useAuth';
import { AdminPanel } from './components/sections/AdminPanel';

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    setSelectedTeamId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTeam = (teamId: string) => {
    setSelectedTeamId(teamId);
    setCurrentSection('team-detail');
  };

  const handleBackToGroups = () => {
    setSelectedTeamId(null);
    setCurrentSection('groups');
  };

  const renderSection = () => {
    // Secciones públicas (no requieren login)
    if (currentSection === 'login') return <Login onNavigate={handleNavigate} />;
    if (currentSection === 'register') return <Register onNavigate={handleNavigate} />;
    if (currentSection === 'admin') return <AdminPanel />;
    // Secciones protegidas (requieren login)
    if (!isAuthenticated && currentSection !== 'home') {
      return <Login onNavigate={handleNavigate} />;
    }

    if (currentSection === 'team-detail' && selectedTeamId) {
      return <TeamDetail teamId={selectedTeamId} onBack={handleBackToGroups} />;
    }

    switch (currentSection) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'groups':
        return <Groups onSelectTeam={handleSelectTeam} />;
      case 'teams':
        return <Groups onSelectTeam={handleSelectTeam} />;
      case 'fixtures':
        return <Fixtures />;
      case 'results':
        return <Results />;
      case 'standings':
        return <Standings />;
      case 'stadiums':
        return <Stadiums />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header currentSection={currentSection} onNavigate={handleNavigate} />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderSection()}
        </div>
      </main>
      <Footer />
    </div>
  );
}