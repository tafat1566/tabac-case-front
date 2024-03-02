import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Slide, Paper } from '@material-ui/core';
import { AddShoppingCart as AddShoppingCartIcon } from '@material-ui/icons';

function ProductList({ products, selectedCategory, productsVisible, selectedProduct, handleProductSelect, handleAddToCart }) {
    return (
        <List>
            {productsVisible && products
                .filter(product => selectedCategory === null || product.categorie_id === selectedCategory)
                .map(product => (
                    <Slide direction="left" in={productsVisible} key={product.id}>
                        <Paper style={{ backgroundColor: '#f0f0f0', margin: '10px', padding: '10px' }}>
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
                        </Paper>
                    </Slide>
                ))}
        </List>
    );
}

export default ProductList;
