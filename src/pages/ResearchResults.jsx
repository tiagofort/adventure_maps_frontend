import { useEffect, useState } from 'react';
import { Trash2, Eye } from "lucide-react";
import { getAllSearch, generateExcel } from '../services/requests';
import DetailPanel from '../components/DetailPanel';

const ResearchResults = () => {
  const [searchs, setPesquisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
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

  const handleGenareteExcel = async () =>{
    try{
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      await generateExcel();
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/searchs/${id}`, { method: 'DELETE' });
      setPesquisas(searchs.filter(p => p._id !== id));
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  };

  return (
    <div className="mt-10 p-6 relative">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2 mt-10">Dados da Pesquisa</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="overflow-x-auto p-6">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleGenareteExcel}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow text-sm"
            >
              Gerar Excel
            </button>
          </div>
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
              {searchs.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{item.city}</td>
                  <td className="py-2 px-4">{item.state}</td>
                  <td className="py-2 px-4">{item.age}</td>
                  <td className="py-2 px-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 flex gap-2">
       
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
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

  
      {selectedItem && (
        <DetailPanel item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
};

export default ResearchResults;
