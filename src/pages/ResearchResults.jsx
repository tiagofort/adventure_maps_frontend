import { useEffect, useState } from 'react';
import { Trash2 } from "lucide-react";
import { getAllSearch } from '../services/requests';

const ResearchResults = () => {
  const [searchs, setPesquisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
  const fetchDados = async () => {
    setLoading(true);
    await delay(1500);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      const data = await getAllSearch(token);
      setPesquisas(data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchDados();
}, []);

  // Excluir por ID
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/searchs/${id}`, { method: 'DELETE' });
      setPesquisas(searchs.filter(p => p._id !== id));
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  };

  return (
    <div className="mt-10 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2 mt-10">Dados da Pesquisa</h2>

      {loading ? 
      (
        <p>Carregando...</p>
      ) : (
        <div className="overflow-x-auto p-6">
          <table className="min-w-full bg-white shadow-md rounded-lg p-6">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-2 px-4 text-left">Cidade</th>
                <th className="py-2 px-4 text-left">Estado</th>
                <th className="py-2 px-4 text-left">Idade</th>
                <th className="py-2 px-4 text-left">Data de Criação</th>
                <th className="py-2 px-4 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {searchs.map((item, i) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{item.city}</td>
                  <td className="py-2 px-4">{item.state}</td>
                  <td className="py-2 px-4">{item.age}</td>
                  <td className="py-2 px-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4">
                    <div className="relative group inline-block">
                        <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-600 text-white p-2 rounded hover:bg-red-700 flex items-center justify-center"
                        >
                            <Trash2 size={18} />
                        </button>
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                            Deletar
                        </span>
                    </div>
                  </td>
                </tr>
              ))}

              {searchs.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    Nenhum dado encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ResearchResults;
