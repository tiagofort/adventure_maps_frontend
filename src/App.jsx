// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './components/Layout';
import ResearchResults from './pages/ResearchResults';
import ResearchAnalitics from './pages/ResearchAnalitics';
import UserManagement from './pages/Users';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/auth/login" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />

      {isAuthenticated ? 
      (
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path='/researchResults' element={<ResearchResults />} />
          <Route path='/researchAnalitics' element={<ResearchAnalitics />} />
          <Route path='/users' element={<UserManagement />} />
        </Route>
      )
        :
      (
        <Route path="*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
};

export default App;

