import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

export default function Home() {
  const { user } = useAuthContext(); 
  
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Bem-vindo de volta!
              {user ? (<> <p>Usuário logado: {user.email}</p></>) : (<p>Nenhum usuário logado.</p>)}
            </h2>
          </div>
        </main>
      </div>
    );
  }