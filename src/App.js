import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import './styles/styles.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000', // Couleur principale
      contrastText: '#ffffff' // Couleur du texte en contraste
    },
    // Définir d'autres couleurs si nécessaire
  },
  // Définir d'autres propriétés de thème si nécessaire
});

function App() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Mettre à jour toutes les secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <Header />
        <div style={{ textAlign: 'center', color: '#100336', fontSize: '24px', marginBottom: '20px' }}>
          <Typography variant="h5">
            {dateTime.toLocaleString()}
          </Typography>
        </div>


        <Router>
          <Routes>
            <Route path="/" element={<CategoryDisplay />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/productsss" element={<ProductSender />} />
            <Route path="/index" element={<CategoryDisplay />} />
            <Route path="/display" />
            <Route path="/categories" element={<CategoryManagement />} />
            <Route path="/fournisseur" element={<FournisseurManagement />} />
            <Route path="/chiffre_d_affaire" element={<ChartComponent />} />
            <Route path="/chiffre_d_affaire_d" element={<ChiffreAffaireIntervalle />} />
            <Route path="/notification" element={<Notification />} />
            

          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
