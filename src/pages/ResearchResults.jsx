import { useEffect, useState } from 'react';
import { Trash2, Eye } from "lucide-react";
import { getAllSearch, generateExcel, deleteSearch } from '../services/requests';
import DetailPanel from '../components/DetailPanel';
import ConfirmDialog from '../components/ConfirmDialog';

const ResearchResults = () => {
  const [searchs, setResearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [showDialog, setShowDialog] = useState(false);
  const [toDelete, setID] = useState(null);

  useEffect(() => {
    const fetchDados = async () => {
      setLoading(true);
      await delay(1500);
      try {
        const data = await getAllSearch();
        setResearch(data);
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
      await generateExcel();
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  }

  const handleDelete = (id) => {
    setShowDialog(true);
    setID(id);
  };

  const handleConfirm = async () => {
    setShowDialog(false);
    try {
      await deleteSearch(toDelete);
      setResearch(searchs.filter(p => p.dataResearch_id !== toDelete));
      setID(null);
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
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
                    disabled={searchs.length === 0}
                    className={`px-4 py-2 rounded shadow text-sm text-white transition 
                      ${searchs.length === 0 
                        ? 'bg-green-300 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-700'}`}
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
                        <td className="py-2 px-4">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-4 flex gap-2">
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                          >
                            <Eye size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(item.dataResearch_id)}
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

            {showDialog && (
              <ConfirmDialog
                message="Tem certeza que deseja excluir este item?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            )}
      </div>
   );
};

export default ResearchResults;
