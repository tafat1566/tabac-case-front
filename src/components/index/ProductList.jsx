import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Slide, Paper, Typography, Avatar } from '@mui/material';
import { AddShoppingCart as AddShoppingCartIcon } from '@mui/icons-material';

function ProductList({ products, selectedCategory, productsVisible, selectedProduct, handleProductSelect, handleAddToCart }) {
    return (
        <List>
            {productsVisible && products
                .filter(product => selectedCategory === null || product.categorie_id === selectedCategory)
                .map(product => (
                    <Slide direction="left" in={productsVisible} key={product.id}>
                        <Paper elevation={3} style={{ backgroundColor: '#f0f0f0', margin: '10px', padding: '10px', borderRadius: '8px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)' }}>
                            <ListItem button selected={selectedProduct === product.id} onClick={() => handleProductSelect(product.id)}>
                                <Avatar alt={product.nom} src={getImageSrc(product.nom)} />
                                <ListItemText 
                                    primary={
                                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                            {product.nom}
                                        </Typography>
                                    } 
                                    secondary={
                                        <Typography variant="body2" style={{ color: '#666' }}>
                                            Prix: {product.prix_unitaire} € - Catégorie: {product.categorie_id ? product.categorie_id : 'Non spécifiée'}
                                        </Typography>
                                    } 
                                />
                                {selectedProduct === product.id && (
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="add to cart" onClick={() => handleAddToCart(product.id)} style={{ color: 'green' }}>
                                            <AddShoppingCartIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                )}
                            </ListItem>
                        </Paper>
                    </Slide>
                ))}
        </List>
    );
}


function getImageSrc(productName) {
    const possibleExtensions = ['jpg', 'jpeg', 'png','webp'];
    let imagePath = null;
    for (let ext of possibleExtensions) {
        const fullPath = `/produits/${productName}.${ext}`;
        
        const img = new Image();
        img.src = fullPath;
        if (img.width > 0 && img.height > 0) {
            imagePath = fullPath;
            break;
        }
    }
    return imagePath;
}

export default ProductList;
