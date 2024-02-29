// Home.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, FormControl } from 'react-bootstrap';
import { FaTrash, FaPlus } from 'react-icons/fa';

function Home() {
  const [products, setProducts] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [apiProducts, setApiProducts] = useState([]);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/produits')
      .then(response => response.json())
      .then(data => setApiProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addProductToCart = (productName, price, quantity, id) => {
    const newProduct = { id: id, name: productName, price: price, quantity: quantity };
    setProducts([...products, newProduct]);
  };

  const handleInput = (value) => {
    setInputValue(inputValue + value);
  };

  const saveCashRegister = () => {
    console.log('Caisse enregistrée:', products);
    setProducts([]);
  };

  const calculateTotal = () => {
    let total = 0;
    products.forEach(product => {
      total += product.price * product.quantity;
    });
    return total.toFixed(2);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleProductSelect = (productName, productId) => {
    const selectedProduct = apiProducts.find(product => product.nom === productName);
    setSelectedProductPrice(selectedProduct ? selectedProduct.prix_unitaire : 0);

    const existingProduct = products.find(product => product.name === productName);
    if (existingProduct) {
      const quantity = prompt(`Veuillez entrer la quantité pour ${productName}:`, '1');
      if (quantity !== null && !isNaN(quantity) && quantity > 0) {
        existingProduct.quantity = parseInt(quantity, 10);
        setProducts([...products]);
      }
    } else {
      addProductToCart(selectedProduct.nom, selectedProduct.prix_unitaire, 1, productId);
    }
  };

  const removeProductFromCart = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const savePayment = () => {
    const paymentData = {
      montant: paymentAmount,
      date_paiement: new Date().toISOString().split('T')[0],
      produit_ids: products.map(product => product.id)
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
        console.log('Paiement enregistré avec succès:', data);
        setPaymentAmount(0);
      })
      .catch(error => console.error('Erreur lors de l\'enregistrement du paiement:', error));
  };

  const addQuantity = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity += 1;
    setProducts(updatedProducts);
  };

  const filteredProducts = apiProducts.filter(product =>
    product.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#e9ecef', minHeight: '100vh' }}>
      <Container>
        <h1>Caisse Enregistreuse - Bureau de Tabac</h1>
        <hr />
        <Row>
          <Col md={3}>
            <h2>Clavier Numérique</h2>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Quantité</Form.Label>
              <Form.Control type="text" placeholder="Enter quantity" value={inputValue} readOnly />
            </Form.Group>
          </Col>
          <Col md={6}>
            <h2>Sélectionner un produit</h2>
            <Form>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Choisir un produit</Form.Label>
                <FormControl
                  type="text"
                  placeholder="Rechercher un produit par le nom"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Form.Control as="select" onChange={(e) => handleProductSelect(e.target.value, e.target.selectedOptions[0].id)}>
                  {filteredProducts.map(product => (
                    <option key={product.id} id={product.id}>{product.nom}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <h4>Prix du produit sélectionné: {selectedProductPrice}€</h4>
            </Form>
          </Col>
          <Col md={3}>
            <h2>Produits sélectionnés</h2>
            <ul>
              {products.map((product, index) => (
                <li key={index}>
                  {product.name}: {product.quantity} x {product.price}€ = {(product.quantity * product.price).toFixed(2)}€
                  <FaTrash
                    onClick={() => removeProductFromCart(index)}
                    style={{ cursor: 'pointer', marginLeft: '5px', color: 'red' }}
                  />
                  <FaPlus
                    onClick={() => addQuantity(index)}
                    style={{ cursor: 'pointer', marginLeft: '5px', color: 'green' }}
                  />
                </li>
              ))}
            </ul>
            <h3>Total: {calculateTotal()}€</h3>
            <Form.Group controlId="formBasicPayment">
              <Form.Label>Montant du Paiement</Form.Label>
              <Form.Control type="text" placeholder="Enter payment amount" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={savePayment}>Enregistrer le Paiement</Button>
            <br />
            <br />
            <Button variant="primary" onClick={saveCashRegister}>Enregistrer la caisse</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
