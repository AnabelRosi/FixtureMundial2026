import { Menu, X, LogOut, User, Shield } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export function Header({ currentSection, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const menuItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'groups', label: 'Grupos' },
    //{ id: 'teams', label: 'Selecciones' },
    { id: 'fixtures', label: 'Fixture' },
    { id: 'results', label: 'Resultados' },
    { id: 'standings', label: 'Posiciones' },
    { id: 'stadiums', label: 'Estadios' },
  ];

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#003B7A] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#003B7A] font-bold">FIFA</span>
            </div>
            <span className="hidden sm:block font-semibold">FIFA World Cup 2026</span>
          </div>

          <nav className="hidden md:flex gap-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentSection === item.id
                    ? 'bg-white/20 text-white'
                    : 'hover:bg-white/10 text-white/90'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                  <User size={16} />
                  <span className="text-sm font-medium">{user?.username}</span>
                  {user?.role === 'admin' && (
                    <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-0.5 rounded-full font-semibold">
                      Admin
                    </span>
                  )}
                </div>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => onNavigate('admin')}
                    className="flex items-center gap-2 bg-yellow-400 text-yellow-900 px-3 py-2 rounded-lg hover:bg-yellow-300 transition-colors font-semibold text-sm"
                  >
                    <Shield size={16} />
                    <span>Panel Admin</span>
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                  <span className="text-sm">Salir</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="px-4 py-2 bg-white text-[#003B7A] rounded-lg font-semibold hover:bg-white/90 transition-colors text-sm"
                >
                  Registrarse
                </button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#002A5C] border-t border-white/10">
          <nav className="px-4 py-3 flex flex-col gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-lg text-left transition-colors ${
                  currentSection === item.id
                    ? 'bg-white/20 text-white'
                    : 'hover:bg-white/10 text-white/90'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-white/10 mt-2 pt-2">
              {isAuthenticated ? (
                <>
                  <p className="px-4 py-2 text-sm text-white/70">
                    Hola, {user?.username} {user?.role === 'admin' && '(Admin)'}
                  </p>
                  {user?.role === 'admin' && (
                    <button
                      onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 text-yellow-900 hover:bg-yellow-300 transition-colors text-left font-semibold mb-2"
                    >
                      <Shield size={16} />
                      <span>Panel Admin</span>
                    </button>
                  )}
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-left"
                  >
                    <LogOut size={16} />
                    <span>Cerrar Sesión</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }}
                    className="w-full px-4 py-2 rounded-lg text-left hover:bg-white/10 transition-colors"
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => { onNavigate('register'); setMobileMenuOpen(false); }}
                    className="w-full px-4 py-2 rounded-lg text-left hover:bg-white/10 transition-colors"
                  >
                    Registrarse
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}