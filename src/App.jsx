// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './components/Layout';
import ResearchResults from './pages/ResearchResults';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {isAuthenticated ? 
      (
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path='/researchResults' element={<ResearchResults />} />
          {/* Adicione outras rotas aqui */}
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/auth/login" />} />
      )}
    </Routes>
  );
};

export default App;

