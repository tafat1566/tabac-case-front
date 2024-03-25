import React from 'react';
import { Button, Grid, Typography } from '@mui/material';

const NumericKeyboard = ({ handleKeyPress }) => {
  const handleButtonClick = (value) => {
    handleKeyPress(value);
  };

  const keyboardButtons = [
    { value: 1, color: '#f0f0f0' },
    { value: 2, color: '#f0f0f0' },
    { value: 3, color: '#f0f0f0' },
    { value: 4, color: '#f0f0f0' },
    { value: 5, color: '#f0f0f0' },
    { value: 6, color: '#f0f0f0' },
    { value: 7, color: '#f0f0f0' },
    { value: 8, color: '#f0f0f0' },
    { value: 9, color: '#f0f0f0' },
    { value: 0, color: '#f0f0f0' },
    { value: '.', color: '#f0f0f0' },
    { value: 'C', color: '#f0f0f0' },
  ];

  return (
    <Grid container spacing={1}>
      {keyboardButtons.map((button) => (
        <Grid item xs={button.value === 'C' ? 4 : 3} key={button.value}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick(button.value)}
            style={{ backgroundColor: button.color, color: '#000000', fontWeight: 'bold' }}
          >
            {button.value !== 'C' ? (
              <Typography variant="h4">{button.value}</Typography>
            ) : (
              <Typography variant="h5">{button.value}</Typography>
            )}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default NumericKeyboard;
