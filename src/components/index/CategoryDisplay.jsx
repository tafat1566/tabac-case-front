import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Paper } from '@material-ui/core';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import Cart from './Cart';
import '../../styles/CategoryProductDisplay.css';

function CategoryDisplay() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [productsVisible, setProductsVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentAmount, setPaymentAmount] = useState(0);

    useEffect(() => {
        // Récupérer les catégories depuis l'API
        fetch('http://127.0.0.1:8000/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Erreur lors de la récupération des catégories :', error));

        // Récupérer les produits depuis l'API
        fetch('http://127.0.0.1:8000/produits')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Erreur lors de la récupération des produits :', error));
    }, []);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        setProductsVisible(true);
    };

    const handleProductSelect = (productId) => {
        setSelectedProduct(productId);
    };

    const handleAddToCart = () => {
        if (selectedProduct) {
            const productToAdd = products.find(product => product.id === selectedProduct);
            if (productToAdd) {
                const existingCartItem = cart.find(item => item.id === productToAdd.id);
                if (existingCartItem) {
                    existingCartItem.quantity += 1;
                    setCart([...cart]);
                } else {
                    setCart([...cart, { ...productToAdd, quantity: 1 }]);
                }
                setTotalPrice(totalPrice + parseFloat(productToAdd.prix_unitaire));
            }
        }
    };

    const handleRemoveFromCart = (productId) => {
        const removedItem = cart.find(item => item.id === productId);
        if (removedItem) {
            setTotalPrice(totalPrice - (parseFloat(removedItem.prix_unitaire) * removedItem.quantity));
            const updatedCart = cart.filter(item => item.id !== productId);
            setCart(updatedCart);
        }
    };

    const savePayment = () => {
        let totalAmount = 0;
        cart.forEach(item => {
            totalAmount += parseFloat(item.prix_unitaire) * item.quantity;
        });
    
        setPaymentAmount(totalAmount);
    
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // Format YYYY-MM-DD HH:MM:SS
    
        const paymentData = {
            montant: totalAmount,
            date_paiement: formattedDate,
            produit_id: cart.map(product => product.id)
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
            setCart([]);
            setTotalPrice(0);
        })
        .catch(error => console.error('Erreur lors de l\'enregistrement du paiement:', error));
    };
    

    return (
        <div className="container">
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', color: '#333', fontWeight: 'bold' }}>
                    Catégories
      </Typography>
                        <CategoryList categories={categories} handleCategoryClick={handleCategoryClick} />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', color: '#333', fontWeight: 'bold' }}>
        Produits
      </Typography>
                    <ProductList
                        products={products}
                        selectedCategory={selectedCategory}
                        productsVisible={productsVisible}
                        selectedProduct={selectedProduct}
                        handleProductSelect={handleProductSelect}
                        handleAddToCart={handleAddToCart}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Cart
                        cart={cart}
                        totalPrice={totalPrice}
                        handleRemoveFromCart={handleRemoveFromCart}
                        savePayment={savePayment}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default CategoryDisplay;
