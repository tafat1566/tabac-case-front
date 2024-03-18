import React from 'react';
import { Card, CardContent, Typography, Grid, Container, Avatar } from '@mui/material';
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

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(3),
    transition: theme.transitions.create(['transform', 'box-shadow'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: theme.shadows[6], // Ombre plus prononcée au survol
    },
  },
  categoryName: {
    fontWeight: 'bold', // Met en gras les noms de catégorie
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
    overflow: 'hidden', // Empêche le texte de dépasser de la carte
    textOverflow: 'ellipsis', // Affiche "..." pour indiquer que du texte est masqué
    whiteSpace: 'nowrap', // Empêche le texte de passer à la ligne
    fontSize: '0.5rem', // Réduire la taille de la police
  },
  categoryContainer: {
    backgroundColor: theme.palette.grey[30],
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
}));

function CategoryList({ categories, handleCategoryClick }) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.categoryContainer}>
      <Grid container spacing={-1}>
        {categories.map((category, index) => {
          const categoryName = category.nom;
          const colorIndex = index % categoryColors.length;
          const cardColor = categoryColors[colorIndex];
          const supportedFormats = ['jpg', 'jpeg', 'png', 'webp'];
          let categoryImageSrc = null;

          // Recherche du fichier image supporté
          for (let format of supportedFormats) {
            const imageUrl = `/CategorieImage/${categoryName}.${format}`;
            const img = new Image();
            img.src = imageUrl;
            if (img.complete) {
              categoryImageSrc = imageUrl;
              break;
            }
          }

          return (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Card
                className={classes.card}
                style={{ backgroundColor: cardColor }}
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardContent>
                  {categoryImageSrc && (
                    <Avatar alt={categoryName} src={categoryImageSrc} variant="rounded" style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
                  )}
                  <Typography variant="h6" className={classes.categoryName}>
                    {categoryName}
                  </Typography>
                  {}
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
