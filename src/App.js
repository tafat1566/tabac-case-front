import React from 'react';
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
  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <Header />
        <Router>
          <Routes>
            <Route exact path="/" />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/productsss" element={<ProductSender />} />
            <Route path="/index" element={<CategoryDisplay />} />
            <Route path="/display" />
            <Route path="/categories" element={<CategoryManagement />} />
            <Route path="/fournisseur" element={<FournisseurManagement />} />
            <Route path="/chiffre_d_affaire" element={<ChartComponent />} />
            <Route path="/chiffre_d_affaire_d" element={<ChiffreAffaireIntervalle />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
