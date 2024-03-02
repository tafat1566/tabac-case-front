import React, { useState } from 'react';
import { List, Card, CardContent, IconButton, Slide, Typography, Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import jsPDF from 'jspdf';

function Cart({ cart, totalPrice, handleRemoveFromCart, savePayment }) {
    const [showTicket, setShowTicket] = useState(false);

    const generatePDF = () => {
        const doc = new jsPDF();
        renderTicket(doc);
        doc.save("ticket.pdf");
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
        doc.text("Ticket de paiement", startX, startY);

        startY += lineHeight;
        doc.line(startX, startY, 200, startY);

        startY += lineHeight * 2;
        doc.setFontSize(fontSize);
        cart.forEach(item => {
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
        
        <Card elevation={3} style={{ padding: '20px' }} >
            <Typography variant="h5" gutterBottom style={{ marginBottom: '20px' }}>Panier</Typography>
            <List >
                {cart.map(item => (
                    <Slide direction="right" in={true} key={item.id}>
                        <Card variant="outlined" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <CardContent>
                                <Typography variant="body1" style={{ color: 'black' }}>{`${item.nom} - ${item.prix_unitaire} € x${item.quantity}`}</Typography>
                            </CardContent>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromCart(item.id)} style={{ color: 'red' }}>
                                <Delete />
                            </IconButton>
                        </Card>
                    </Slide>
                ))}
            </List>
            <Typography variant="h6" style={{ marginTop: '20px' }}>Total : {totalPrice.toFixed(2)} €</Typography>
            <Button variant="contained" color="primary" onClick={handleSavePayment} disabled={cart.length === 0} style={{ marginTop: '20px', marginRight: '10px' }}>
                Enregistrer le paiement
            </Button>
            {showTicket && (
                <Button variant="contained" color="secondary" onClick={generatePDF} style={{ marginTop: '20px' }}>
                    Imprimer le ticket
                </Button>
            )}
        </Card>
    );
}

export default Cart;
