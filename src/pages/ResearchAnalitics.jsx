import { useEffect, useState } from 'react';
import ProgressChart from '../components/ProgressChart';
import StatesGraphBar from '../components/StatesGraphBar';
import { countAnswers } from '../services/requests'

const ResearchAnalitics = () => {
    const [answer, setAnswer] = useState();
    
  useEffect(() => {
      const fetchDados = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;
            const data = await countAnswers(token);
            setAnswer(data)
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
        }
      };
      fetchDados();
    }, []);  

  return (
    <div className="p-8">
      <h2 className="text-center mb-8 text-xl font-semibold">Progresso da Pesquisa</h2>

      <div className="flex flex-wrap justify-center gap-8">
        {/* Gráfico de progresso */}
        <div className="w-full md:w-[calc(50%-1rem)] flex justify-center min-w-[300px]">
          <ProgressChart totalRespostas={answer} />
        </div>

        {/* Gráfico por estado */}
        <div className="w-full md:w-[calc(50%-1rem)] flex justify-center min-w-[300px]">
          <StatesGraphBar />
        </div>
      </div>
    </div>
  );
}

export default ResearchAnalitics;
