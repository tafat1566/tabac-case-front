import React from 'react';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Delete, AddCircle } from '@mui/icons-material'; // Importez les icônes de Material-UI
import '../styles.css'; // Importez votre fichier de styles CSS

function Cart({ selectedProducts, removeItem, addItem }) {
  let totalPrice = 0;

  selectedProducts.forEach(product => {
    totalPrice += parseFloat(product.prix_unitaire) * product.quantity;
  });

  return (
    <div className="cart-container"> {/* Ajoutez la classe CSS ici */}
      <Typography variant="h4" gutterBottom>Panier :</Typography>
      <List>
        {selectedProducts.map(product => (
          <ListItem key={product.id} disablePadding>
            <ListItemText
              primary={`${product.nom} - ${product.prix_unitaire} € - Quantité : ${product.quantity}`}
            />
            <div>
              <Button onClick={() => removeItem(product)} variant="contained" color="error" startIcon={<Delete />}> {/* Utilisez Delete à la place de BsTrash */}
                
              </Button>
              <Button onClick={() => addItem(product)} variant="contained" color="primary" startIcon={<AddCircle />}> {/* Utilisez AddCircle à la place de BsPlusSquare */}
                
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
