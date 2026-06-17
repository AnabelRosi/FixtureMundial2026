import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface LoginProps {
  onNavigate: (section: string) => void;
}

export function Login({ onNavigate }: LoginProps) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Error al iniciar sesión');
        return;
      }

      login(data.user, data.token);
      onNavigate('home');
    } catch (err) {
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <img
            src="/src/assets/logo_pagina.jpg"
            alt="Mundial 2026"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
          />
          <h1 className="text-3xl text-gray-800">Iniciar Sesión</h1>
          <p className="text-gray-500 mt-2">Tu Portal del Mundial 2026</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B7A] bg-gray-50"
              placeholder="tu usuario"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B7A] bg-gray-50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#003B7A] text-white py-3 rounded-lg font-semibold hover:bg-[#002A5C] transition-colors disabled:opacity-60"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
          <p className="font-semibold mb-1">Usuarios de prueba:</p>
          <p>Admin: <span className="font-mono">admin / admin123</span></p>
          <p>User: <span className="font-mono">user / user123</span></p>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿No tenés cuenta?{' '}
          <button
            onClick={() => onNavigate('register')}
            className="text-[#003B7A] font-semibold hover:underline"
          >
            Registrate
          </button>
        </p>
      </div>
    </div>
  );
}