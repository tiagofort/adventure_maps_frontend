import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const { user, logoutUser } = useAuthContext(); 
    const navigate = useNavigate();   

    const handleLogout = () => {
      logoutUser();
      navigate('/auth/login');
    };

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Menu superior */}
        <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Meu App</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Perfil
                </a>
              </li>
              <li>
                <button
                  className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={handleLogout}
                >
                  Sair
                </button>
              </li>
            </ul>
          </nav>
        </header>
  
        {/* Conteúdo centralizado */}
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Bem-vindo de volta!
              {user ? (
        <>
          <p>Usuário logado: {user.email}</p>
          <button onClick={logoutUser}>Sair</button>
        </>
      ) : (
        <p>Nenhum usuário logado.</p>
      )}
            </h2>
            <p className="text-gray-600 text-lg">Você está logado com sucesso.</p>
          </div>
        </main>
      </div>
    );
  }