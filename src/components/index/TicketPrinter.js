import React, { useState } from 'react';

const TicketPrinter = () => {
  const [printingStatus, setPrintingStatus] = useState('');

  const handlePrintTicket = async () => {
    try {
      
      const response = await fetch('http://127.0.0.1:8000/api/print-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paiement: {
            id: 151,
            montant: 14,
            date_paiement: '2024-03-06 15:04:31',
            methode_paiement: 'espece'
          },
          produits: [
            { nom: 'Tabac à rouler sans additifs', prix_unitaire: '12' },
            { nom: 'tabac à chiquer', prix_unitaire: '2' }
          ],
          montant_total: 14
        })
      });

      if (response.ok) {
        setPrintingStatus('Le ticket a été imprimé avec succès.');
      } else {
        setPrintingStatus('Une erreur est survenue lors de l\'impression du ticket.');
      }
    } catch (error) {
      console.error('Erreur lors de la demande d\'impression : ', error);
      setPrintingStatus('Une erreur est survenue lors de la demande d\'impression.');
    }
  };

  
  return (
    <div>
      {/* <button onClick={handlePrintTicket}>Imprimer Tickeddt</button>
      {printingStatus && <p>{printingStatus}</p>} */}
    </div>
  );
};

export default TicketPrinter;
