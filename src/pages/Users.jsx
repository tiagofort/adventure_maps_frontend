import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ email: '', password: '', active: true });
  const [editingId, setEditingId] = useState(null);

  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Erro ao carregar usuários:', err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: form.email,
      active: form.active,
    };

    if (form.password.trim()) {
      payload.password = form.password;
    }

    try {
      const res = await fetch(
        `${API_URL}/users${editingId ? `/${editingId}` : ''}`,
        {
          method: editingId ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      
      if (!res.ok) throw new Error(res.message);
      const savedUser = await res.json();

      if (editingId) {
        setUsers((prev) =>
          prev.map((u) => (u._id === editingId ? savedUser : u))
        );
      } else {
        setUsers((prev) => [...prev, savedUser]);
      }

      setForm({ email: '', password: '', active: true });
      setEditingId(null);
    } catch (err) {
      console.error('Erro ao salvar usuário:', err.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setForm({
        email: data.email ?? '',
        password: '',
        active: data.active ?? true,
      });
      setEditingId(data._id);
    } catch (err) {
      console.error('Erro ao buscar usuário:', err.message);
    }
  };

  const handleNew = () => {
    setForm({ email: '', password: '', active: true });
    setEditingId(null);
  };

  return (
    <div className="flex flex-col md:flex-row p-6 gap-10">
      {/* Formulário */}
      <div className="md:w-1/2 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Editar Usuário' : 'Novo Usuário'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Senha</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full border p-2 rounded"
              placeholder={editingId ? 'Deixe em branco para manter' : ''}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Ativo</label>
            {/* Switch estilizado */}
            <button
              type="button"
              onClick={() =>
                setForm({ ...form, active: !form.active })
              }
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                form.active ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                  form.active ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-sm text-gray-600">
              {form.active ? 'Ativo' : 'Inativo'}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {editingId ? 'Atualizar' : 'Cadastrar'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleNew}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Novo Usuário
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de Usuários */}
      <div className="md:w-1/2 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Usuários</h2>
        {users.length === 0 ? (
          <p>Nenhum usuário encontrado.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user._id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-gray-500">
                    Ativo: {user.active ? 'Sim' : 'Não'}
                  </p>
                </div>
                <button
                  onClick={() => handleEdit(user._id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Users;
