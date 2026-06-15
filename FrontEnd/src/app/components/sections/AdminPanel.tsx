import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Trash2, Edit, UserPlus, Shield, User } from 'lucide-react';

interface UserData {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

const mockUsers: UserData[] = [
  { id: 1, username: 'admin', email: 'admin@fifa2026.com', role: 'admin', createdAt: '2026-06-01' },
  { id: 2, username: 'fernando', email: 'fernando@gmail.com', role: 'user', createdAt: '2026-06-10' },
  { id: 3, username: 'cintia', email: 'cintia@gmail.com', role: 'user', createdAt: '2026-06-11' },
];

export function AdminPanel() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({ username: '', email: '', role: 'user' as 'admin' | 'user', password: '' });
  const [message, setMessage] = useState('');

  // Cuando el backend esté listo, reemplazá mockUsers por:
  // const { data, loading } = useFetch<UserData[]>('http://localhost:5000/api/users');

  if (user?.role !== 'admin') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-12 text-center">
        <Shield size={48} className="text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-700 mb-2">Acceso Denegado</h2>
        <p className="text-red-600">No tenés permisos para acceder a esta sección.</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
      setMessage('Usuario actualizado correctamente.');
    } else {
      const newUser: UserData = {
        id: users.length + 1,
        username: formData.username,
        email: formData.email,
        role: formData.role,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setUsers([...users, newUser]);
      setMessage('Usuario creado correctamente.');
    }
    setShowForm(false);
    setEditingUser(null);
    setFormData({ username: '', email: '', role: 'user', password: '' });
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEdit = (user: UserData) => {
    setEditingUser(user);
    setFormData({ username: user.username, email: user.email, role: user.role, password: '' });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro que querés eliminar este usuario?')) {
      setUsers(users.filter(u => u.id !== id));
      setMessage('Usuario eliminado correctamente.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
    setFormData({ username: '', email: '', role: 'user', password: '' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl text-gray-800">Panel de Administración</h1>
          <p className="text-gray-500 mt-1">Gestión de usuarios del sistema</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingUser(null); setFormData({ username: '', email: '', role: 'user', password: '' }); }}
          className="flex items-center gap-2 bg-[#003B7A] text-white px-5 py-3 rounded-xl hover:bg-[#002A5C] transition-colors font-semibold"
        >
          <UserPlus size={20} />
          Nuevo Usuario
        </button>
      </div>

      {/* MENSAJE */}
      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          {message}
        </div>
      )}

      {/* FORMULARIO */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B7A] bg-gray-50"
                placeholder="nombre de usuario"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B7A] bg-gray-50"
                placeholder="email@ejemplo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {editingUser ? 'Nueva Contraseña (opcional)' : 'Contraseña'}
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={!editingUser}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B7A] bg-gray-50"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'user' })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B7A] bg-gray-50"
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="bg-[#003B7A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#002A5C] transition-colors"
              >
                {editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABLA DE USUARIOS */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#003B7A] to-[#0055A5] px-6 py-4">
          <h2 className="text-xl font-bold text-white">Usuarios Registrados ({users.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-600">ID</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-600">Usuario</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-600">Email</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-600">Rol</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-600">Creado</th>
                <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500 text-sm">{u.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#003B7A] rounded-full flex items-center justify-center">
                        {u.role === 'admin'
                          ? <Shield size={16} className="text-white" />
                          : <User size={16} className="text-white" />
                        }
                      </div>
                      <span className="font-semibold text-gray-800">{u.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.role === 'admin'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {u.role === 'admin' ? 'Administrador' : 'Usuario'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{u.createdAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(u)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}