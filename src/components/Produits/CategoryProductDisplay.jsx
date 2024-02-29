import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

function CategoryProductDisplay() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [productsVisible, setProductsVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

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
                setCart([...cart, productToAdd]);
                setTotalPrice(totalPrice + parseFloat(productToAdd.prix_unitaire));
            }
        }
    };

    const handleRemoveFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        const removedItem = cart.find(item => item.id === productId);
        if (removedItem) {
            setTotalPrice(totalPrice - parseFloat(removedItem.prix_unitaire));
        }
        setCart(updatedCart);
    };

    return (
        <div className="container">
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Typography variant="h5" gutterBottom>Liste des Catégories</Typography>
                    <List>
                        {categories.map(category => (
                            <ListItem button key={category.id} onClick={() => handleCategoryClick(category.id)}>
                                <ListItemText primary={category.nom} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h5" gutterBottom>Produits</Typography>
                    <List>
                        {productsVisible && products
                            .filter(product => selectedCategory === null || product.categorie_id === selectedCategory)
                            .map(product => (
                                <ListItem 
                                    key={product.id}
                                    button
                                    selected={selectedProduct === product.id}
                                    onClick={() => handleProductSelect(product.id)}
                                >
                                    <ListItemText 
                                        primary={product.nom} 
                                        secondary={`Prix: ${product.prix_unitaire} € - Catégorie: ${product.categorie_id ? product.categorie_id : 'Non spécifiée'}`}
                                    />
                                </ListItem>
                            ))}
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h5" gutterBottom>Panier</Typography>
                    <List>
                        {cart.map(item => (
                            <ListItem key={item.id}>
                                <ListItemText primary={`${item.nom} - ${item.prix_unitaire} €`} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromCart(item.id)}>
                                        <Delete />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="h6">Total : {totalPrice.toFixed(2)} €</Typography>
                    <Button variant="contained" color="primary" onClick={handleAddToCart} disabled={!selectedProduct}>
                        Ajouter au panier
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default CategoryProductDisplay;
