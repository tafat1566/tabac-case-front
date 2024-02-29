import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import PaymentForm from './components/PaymentForm';
import Header from './components/Home/Header';
import ProductManagement from './components/Produits/ProductManagement';
import './styles.css';
import ProductSender from './components/Produits/ProductSender';
import CategoryProductDisplay from './components/Produits/CategoryProductDisplay';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = () => {
    fetch('http://127.0.0.1:8000/produits')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Erreur lors de la récupération des produits :', error));
  };

  const fetchCategories = () => {
    fetch('http://127.0.0.1:8000/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Erreur lors de la récupération des catégories :', error));
  };

  const addToCart = (product) => {
    const existingProduct = selectedProducts.find(p => p.id === product.id);

    if (existingProduct) {
      const updatedProducts = selectedProducts.map(p => {
        if (p.id === product.id) {
          return { ...p, quantity: p.quantity + 1 };
        }
        return p;
      });
      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }

    setTotalPrice(totalPrice + parseFloat(product.prix_unitaire));
  };

  const removeItem = (product) => {
    const updatedProducts = selectedProducts.filter(item => item.id !== product.id);
    setSelectedProducts(updatedProducts);
    setTotalPrice(totalPrice - (parseFloat(product.prix_unitaire) * product.quantity));
  };

  const addItem = (product) => {
    const updatedProducts = selectedProducts.map(p => {
      if (p.id === product.id) {
        return { ...p, quantity: p.quantity + 1 };
      }
      return p;
    });
    setSelectedProducts(updatedProducts);
    setTotalPrice(totalPrice + parseFloat(product.prix_unitaire));
  };

  const sendPaymentTest = () => {
    const paymentData = {
      montant: totalPrice.toFixed(2),
      date_paiement: new Date().toISOString(),
      produit_id: selectedProducts.map(product => product.id),
    };

    fetch('http://127.0.0.1:8000/paiements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        return response.json();
      })
      .then(data => {
        console.log('Paiement de test effectué avec succès :', data);
      })
      .catch(error => {
        console.error('Erreur lors de la tentative de paiement de test :', error);
      });
  };

  return (
    <div className="app-container">
      <Header />
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div>
                <h1 className="white-text">Caisse de bureau de tabac</h1> 
                <div className="main-content">
                  <ProductList
                    products={products}
                    addToCart={addToCart}
                    selectedProducts={selectedProducts}
                    categories={categories}
                    setSelectedCategory={setSelectedCategory}
                  />
                  <Cart
                    selectedProducts={selectedProducts}
                    removeItem={removeItem}
                    addItem={addItem}
                  />
                </div>
                <PaymentForm
                  totalPrice={totalPrice}
                  sendPaymentTest={sendPaymentTest}
                />
              </div>
            }
          />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/productsss" element={<ProductSender />} />
          <Route
            path="/display"
            element={
              <CategoryProductDisplay
                products={products.filter(product => product.categorie_id === selectedCategory)}
                addToCart={addToCart}
                selectedProducts={selectedProducts}
                selectedCategory={selectedCategory}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
