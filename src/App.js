import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Home/Header';
import ProductManagement from './components/Produits/ProductManagement';
import ProductSender from './components/Produits/ProductSender';
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
        <div style={{ textAlign: 'center', color: '#100336', fontSize: '24px', marginBottom: '20px' }}>
          <Typography variant="h5">
            Date et heure actuelle : {new Date().toLocaleString()}
          </Typography>
        </div>
       
        <Router>
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/" element={<CategoryDisplay />} />
                <Route path="/products" element={<ProductManagement />} />
                <Route path="/productsss" element={<ProductSender />} />
                <Route path="/index" element={<CategoryDisplay />} />
                <Route path="/categories" element={<CategoryManagement />} />
                <Route path="/fournisseur" element={<FournisseurManagement />} />
                <Route path="/chiffre_d_affaire" element={<ChartComponent />} />
                <Route path="/chiffre_d_affaire_d" element={<ChiffreAffaireIntervalle />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/register" element={<RegisterForm />} />
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
