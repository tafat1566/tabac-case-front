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

function Cart({ cart, totalPrice, handleRemoveFromCart, savePayment ,paymentMethods}) {
  const [showTicket, setShowTicket] = useState(false);
  const [printingStatus, setPrintingStatus] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const handlePrintTicket = async () => {
    try {
      // Formatage des données à envoyer comme paramètres de requête
      const params = new URLSearchParams({
        montant: totalPrice,
        date_paiement: new Date().toISOString(),
        produits: JSON.stringify(cart.map(item => ({ nom: item.nom, prix_unitaire: item.prix_unitaire }))),
        montant_total: totalPrice
      });
  
      // Envoi de la demande d'impression au serveur avec les données de l'API
      const response = await fetch(`http://127.0.0.1:8000/api/print-ticket?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        renderTicket(data);
        setPrintingStatus('Le ticket a été imprimé avec succès.');
        showSuccessNotification(); // Afficher la notification
      } else {
        setPrintingStatus('Une erreur est survenue lors de l\'impression du ticket.');
      }
    } catch (error) {
      console.error('Erreur lors de la demande d\'impression : ', error);
      setPrintingStatus('Une erreur est survenue lors de la demande d\'impression.');
    }
  };

const renderTicket = (data) => {
  const doc = new jsPDF();
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  const fontSize = 12;
  const lineHeight = 8;
  let startY = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Cadre extérieur
  doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

  // Cadre intérieur pour le contenu du ticket
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  doc.setFont('times', 'normal');
  doc.setFontSize(22);
  doc.text('Ticket de paiement', pageWidth / 2, startY, null, null, 'center');

  startY += lineHeight * 2;
  doc.setFontSize(fontSize);
  doc.text(`ID Paiement: ${data.paiement.id}`, 20, startY);

  startY += lineHeight * 2;
  data.produits.forEach((item) => {
    doc.text(`${item.nom} - ${item.prix_unitaire} €`, 20, startY);
    startY += lineHeight;
  });

  startY += lineHeight;
  doc.text(`Total : ${data.montant_total} €`, 20, startY);

  startY += lineHeight;
  doc.text(`Date: ${formattedDate}`, 20, startY + lineHeight);
  doc.text(`Heure: ${formattedTime}`, 20, startY + lineHeight * 2);
  doc.text(`Méthode de paiement: ${data.paiement.methode_paiement}`, 20, startY + lineHeight * 3); // Affichage de la méthode de paiement sur une nouvelle ligne

  doc.save('ticket.pdf');
};


  const handleSavePayment = () => {
    savePayment();
    setShowTicket(true); // Afficher le ticket après avoir enregistré le paiement
  };

  const showSuccessNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000); // La notification disparaît après 5 secondes
  };

  return (
<Card elevation={3} style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
  <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', color: '#333', fontWeight: 'bold' }}>
     Panier
  </Typography>
  <List>
    {cart.map((item) => (
      <Slide direction="right" in={true} key={item.id}>
        <Card variant="outlined" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', backgroundColor: '#fff', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            <Typography variant="body1" style={{ color: '#444' }}>
              {`${item.nom} - ${item.prix_unitaire} € x ${item.quantity}`}
            </Typography>
          </CardContent>
          <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromCart(item.id)} style={{ color: '#f44336' }}>
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
    <>
      <Button variant="contained" color="secondary" onClick={handlePrintTicket} style={{ marginTop: '20px', textTransform: 'none', fontWeight: 'bold' }}>
        Imprimer le Ticket
      </Button>
      {printingStatus && <Typography style={{ marginTop: '10px', color: printingStatus.includes('succès') ? 'green' : 'red' }}>{printingStatus}</Typography>}
    </>
  )}
  {showNotification && (
    <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#4caf50', color: '#ffffff', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
      Le ticket a été imprimé avec succès
    </div>
  )}
</Card>

  );
}

export default Cart;