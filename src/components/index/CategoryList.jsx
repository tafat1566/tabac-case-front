import React from 'react';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Tableau de couleurs pour les catégories
const categoryColors = [
  '#FFD700', // Or
  '#FFA07A', // Saumon clair
  '#87CEFA', // Bleu ciel
  '#98FB98', // Vert clair
  '#FF69B4', // Rose vif
  '#20B2AA', // Bleu turquoise
  '#9370DB', // Violet moyen
  '#FF6347', // Rouge corail
];


// Styles personnalisés avec makeStyles
const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(3),
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  categoryName: {
    fontWeight: 'bold', // Mettre en gras
    color: '#000000', // Couleur noire pour le texte
  },
  categoryContainer: {
    backgroundColor: '#f5f5f5', // Couleur de fond grise
    padding: theme.spacing(3), // Ajout de marge intérieure pour l'espace
    borderRadius: theme.shape.borderRadius, // Ajout de bord arrondi
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)', // Ajout d'une ombre légère
  },
}));

// Composant CategoryList
function CategoryList({ categories, handleCategoryClick }) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.categoryContainer}>
      <Grid container spacing={3}>
        {categories.map((category, index) => {
          // Extraction du nom de la catégorie
          const categoryName = category.nom.split(/[\s-]/)[0];
          // Sélection de la couleur de la carte en fonction de l'index
          const colorIndex = index % categoryColors.length;
          const cardColor = categoryColors[colorIndex];

          return (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Card
                className={classes.card}
                style={{ backgroundColor: cardColor }}
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardContent>
                  {/* Utilisation de la classe de style pour le nom de la catégorie */}
                  <Typography variant="body2" className={classes.categoryName}>
                    {categoryName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default CategoryList;
