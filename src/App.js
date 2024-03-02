import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Home/Header';
import ProductManagement from './components/Produits/ProductManagement';
import './styles.css';
import ProductSender from './components/Produits/ProductSender';
import CategoryProductDisplay from './components/Produits/CategoryProductDisplay';
import CategoryDisplay from './components/index/CategoryDisplay';

function App() {
  

  

  return (
    <div className="app-container">
      <Header />
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            
          />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/productsss" element={<ProductSender />} />
          <Route path="/index" element={<CategoryDisplay />} />
          <Route
            path="/display"
            

          
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
