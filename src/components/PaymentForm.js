// PaymentForm.js

import React from 'react';
import { Button, Typography } from '@mui/material';
import '../styles.css';

function PaymentForm({ totalPrice, sendPaymentTest }) {
  return (
    <div className="payment-form-container">
      
      <Typography variant="body1">Total à payer : {totalPrice.toFixed(2)} €</Typography>
      <div className="payment-button-container">
        <Button onClick={sendPaymentTest} variant="contained" color="primary">Payer</Button>
      </div>
    </div>
  );
}

export default PaymentForm;
