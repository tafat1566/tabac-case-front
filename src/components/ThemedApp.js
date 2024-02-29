import React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';

// Création du thème personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Couleur principale
    },
    secondary: {
      main: '#dc004e', // Couleur secondaire
    },
  },
  // Autres personnalisations du thème...
});

// Composant pour fournir le thème à l'application
function ThemeProvider() {
  return (
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  );
}

export default ThemeProvider;
