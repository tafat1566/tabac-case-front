import React, { useState, useEffect } from 'react';
import { Container, Button, Form, FormControl, Dropdown } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';

function PaymentTestComponent() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedProducts]);

  const fetchProducts = () => {
    fetch('http://127.0.0.1:8000/produits')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Erreur lors de la récupération des produits :', error));
  };

  const handleProductSelect = productId => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const sendPaymentTest = () => {
    const paymentData = {
      montant: totalPrice,
      date_paiement: '2024-02-25',
      produit_id: selectedProducts,
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

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedProducts.forEach(productId => {
      const product = products.find(p => p.id === productId);
      if (product) {
        totalPrice += product.prix_unitaire;
      }
    });
    setTotalPrice(totalPrice);
  };

  const handleRemoveProduct = productId => {
    setSelectedProducts(selectedProducts.filter(id => id !== productId));
  };

  const handleAddProduct = productId => {
    setSelectedProducts([...selectedProducts, productId]);
  };

  const filteredProducts = products.filter(product =>
    product.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h2>Liste des produits</h2>
      <Form.Group controlId="formSearch">
        <Form.Label>Rechercher un produit par nom</Form.Label>
        <FormControl
          type="text"
          placeholder="Entrez le nom du produit"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            {product.nom} - Prix unitaire: {product.prix_unitaire}€{' '}
            <input
              type="checkbox"
              checked={selectedProducts.includes(product.id)}
              onChange={() => handleProductSelect(product.id)}
            />
          </li>
        ))}
      </ul>
      <h3>Produits sélectionnés</h3>
      <ul>
        {selectedProducts.map(productId => {
          const product = products.find(p => p.id === productId);
          return (
            <li key={productId}>
              {product.nom} - Prix unitaire: {product.prix_unitaire}€{' '}
              <FaMinus
                onClick={() => handleRemoveProduct(productId)}
                style={{ cursor: 'pointer', marginLeft: '5px', color: 'red' }}
              />
            </li>
          );
        })}
      </ul>
      <p>Total: {totalPrice}€</p>
      <Button variant="primary" onClick={sendPaymentTest}>
        Effectuer un paiement de test
      </Button>
    </Container>
  );
}

export default PaymentTestComponent;
