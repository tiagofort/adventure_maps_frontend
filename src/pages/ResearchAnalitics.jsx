import { useEffect, useState } from 'react';
import ProgressChart from '../components/ProgressChart';
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
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Progresso da Pesquisa</h2>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
        }}
      >
          <div
            style={{
              width: 'calc(50% - 2rem)', 
              minWidth: '450px',
              boxSizing: 'border-box',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
                <ProgressChart totalRespostas={answer} />
          </div>
      </div>
    </div>
  );
}

export default ResearchAnalitics;
