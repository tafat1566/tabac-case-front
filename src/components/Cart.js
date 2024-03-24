import React from 'react';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Delete, AddCircle } from '@mui/icons-material'; 
import '../styles.css'; 

function Cart({ selectedProducts, removeItem, addItem }) {
  let totalPrice = 0;

  selectedProducts.forEach(product => {
    totalPrice += parseFloat(product.prix_unitaire) * product.quantity;
  });

  return (
    <div className="cart-container"> {}
      <Typography variant="h4" gutterBottom>Panier :</Typography>
      <List>
        {selectedProducts.map(product => (
          <ListItem key={product.id} disablePadding>
            <ListItemText
              primary={`${product.nom} - ${product.prix_unitaire} € - Quantité : ${product.quantity}`}
            />
            <div>
              <Button onClick={() => removeItem(product)} variant="contained" color="error" startIcon={<Delete />}> {}
                
              </Button>
              <Button onClick={() => addItem(product)} variant="contained" color="primary" startIcon={<AddCircle />}> {}
                
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total : {totalPrice.toFixed(2)} €</Typography>
    </div>
  );
}

export default Cart;
