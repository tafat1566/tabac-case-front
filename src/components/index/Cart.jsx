import React, { useState } from 'react';
import {
  List,
  Card,
  CardContent,
  IconButton,
  Slide,
  Typography,
  Button,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import jsPDF from 'jspdf';

function Cart({ cart, totalPrice, handleRemoveFromCart, savePayment }) {
  const [showTicket, setShowTicket] = useState(false);

  const generatePDF = () => {
    const doc = new jsPDF();
    renderTicket(doc);
    doc.save('ticket.pdf');
  };

  const renderTicket = (doc) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    const fontSize = 12;
    const lineHeight = 8;
    const startX = 10;
    let startY = 20;

    doc.setFontSize(18);
    doc.text('Ticket de paiement', startX, startY);

    startY += lineHeight;
    doc.line(startX, startY, 200, startY);

    startY += lineHeight * 2;
    doc.setFontSize(fontSize);
    cart.forEach((item) => {
      doc.text(`${item.nom} - ${item.prix_unitaire} € x ${item.quantity}`, startX, startY);
      startY += lineHeight;
    });

    startY += lineHeight;
    doc.text(`Total : ${totalPrice.toFixed(2)} €`, startX, startY);

    doc.text(`Date: ${formattedDate}`, startX, startY + lineHeight);
    doc.text(`Heure: ${formattedTime}`, startX, startY + lineHeight * 2);
  };

  const handleSavePayment = () => {
    savePayment();
    setShowTicket(true); // Afficher le ticket après avoir enregistré le paiement
  };

  return (
    <Card elevation={3} style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', color: '#333', fontWeight: 'bold' }}>
         Panier
      </Typography>
      <List>
        {cart.map((item) => (
          <Slide direction="right" in={true} key={item.id}>
            <Card variant="outlined" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', backgroundColor: '#fff' }}>
              <CardContent>
                <Typography variant="body1" style={{ color: '#444' }}>
                  {`${item.nom} - ${item.prix_unitaire} € x ${item.quantity}`}
                </Typography>
              </CardContent>
              <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromCart(item.id)} style={{ color: '#f50057' }}>
                <Delete />
              </IconButton>
            </Card>
          </Slide>
        ))}
      </List>
      <Typography variant="h6" style={{ marginTop: '20px', color: '#333', fontWeight: 'bold' }}>
        Total : {totalPrice.toFixed(2)} €
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSavePayment}
        disabled={cart.length === 0}
        style={{ marginTop: '20px', marginRight: '10px', textTransform: 'none', fontWeight: 'bold' }}
      >
        Enregistrer le Paiement
      </Button>
      {showTicket && (
        <Button variant="contained" color="secondary" onClick={generatePDF} style={{ marginTop: '20px', textTransform: 'none', fontWeight: 'bold' }}>
          Imprimer le Ticket
        </Button>
      )}
    </Card>
  );
}

export default Cart;
