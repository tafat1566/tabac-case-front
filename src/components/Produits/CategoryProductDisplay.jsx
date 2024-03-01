import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Card, CardContent, CardActions, Slide, Paper } from '@material-ui/core';
import { Delete, AddShoppingCart as AddShoppingCartIcon } from '@material-ui/icons';
import '../../styles/CategoryProductDisplay.css';

function CategoryProductDisplay() {
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
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    
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
                        <Typography variant="h5" gutterBottom style={{ marginBottom: '20px' }}>Liste des Catégories</Typography>
                        <List>
                            {categories.map(category => (
                                <Card key={category.id} className="list-item-3d" onClick={() => handleCategoryClick(category.id)}>
                                    <CardContent>
                                        <Typography variant="h6">{category.nom}</Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h5" gutterBottom>Produits</Typography>
                    <List>
                        {productsVisible && products
                            .filter(product => selectedCategory === null || product.categorie_id === selectedCategory)
                            .map(product => (
                                <Slide direction="left" in={productsVisible} key={product.id}>
                                    <ListItem 
                                        button
                                        selected={selectedProduct === product.id}
                                        onClick={() => handleProductSelect(product.id)}
                                    >
                                        <ListItemText 
                                            primary={product.nom} 
                                            secondary={`Prix: ${product.prix_unitaire} € - Catégorie: ${product.categorie_id ? product.categorie_id : 'Non spécifiée'}`}
                                        />
                                        {selectedProduct === product.id && (
                                            <IconButton edge="end" aria-label="add to cart" onClick={handleAddToCart} style={{ color: 'green' }}>
                                                <AddShoppingCartIcon />
                                            </IconButton>
                                        )}
                                    </ListItem>
                                </Slide>
                            ))}
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h5" gutterBottom style={{ marginBottom: '20px' }}>Panier</Typography>
                        <List>
                            {cart.map(item => (
                                <Slide direction="right" in={true} key={item.id}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="body1" style={{ color: 'red' }}>{`${item.nom} - ${item.prix_unitaire} € x${item.quantity}`}</Typography>
                                        </CardContent>
                                        <CardActions>
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromCart(item.id)} style={{ color: 'red' }}>
                                                <Delete />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Slide>
                            ))}
                        </List>
                        <Typography variant="h6" style={{ marginTop: '20px' }}>Total : {totalPrice.toFixed(2)} €</Typography>
                        <Button variant="contained" color="primary" onClick={savePayment} disabled={cart.length === 0} style={{ marginTop: '20px' }}>
                            Enregistrer le paiement
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default CategoryProductDisplay;
