import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Home/Header';
import CategoryDisplay from './components/index/CategoryDisplay';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CategoryManagement from './components/CategoryManagement/CategoryManagement';
import FournisseurManagement from './components/FournisseurManagement/FournisseurManagement';
import ChartComponent from './components/Paiement/ChartComponent';
import ChiffreAffaireIntervalle from './components/Paiement/ChiffreAffaireIntervalle';
import Notification from './components/Notification/Notification';
import Typography from '@mui/material/Typography';
import './styles/styles.css';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import UserManagement from './components/User/UserManagement';
import ProductComponent from './components/Products/ProductComponent';
import LivraisonTable from './components/LivraisonManagement/LivraisonTable';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000',
      contrastText: '#ffffff',
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (loggedIn) => {
    setIsLoggedIn(loggedIn);
    localStorage.setItem('user', '...');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        
       
        <Router>
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/" element={<CategoryDisplay />} />
                <Route path="/categories" element={<CategoryManagement />} />
                <Route path="/fournisseur" element={<FournisseurManagement />} />
                <Route path="/chiffre_d_affaire" element={<ChartComponent />} />
                <Route path="/chiffre_d_affaire_d" element={<ChiffreAffaireIntervalle />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/usermanagement" element={<UserManagement />} />
                <Route path="/produits" element={<ProductComponent />} />
                <Route path="/livraison" element={<LivraisonTable />} />
              
                
              </>
            ) : (
              <Route path="/" element={<LoginForm onLoginSuccess={handleLogin} />} />
            )}
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
