import React from 'react';
import { Card, CardContent, Typography, Grid, Container, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';


const categoryColors = [
  '#FFD700', 
  '#FFA07A', 
  '#87CEFA', 
  '#98FB98', 
  '#FF69B4', 
  '#20B2AA', 
  '#9370DB', 
  '#FF6347', 
];

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(3),
    transition: theme.transitions.create(['transform', 'box-shadow'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: theme.shadows[6], 
    },
  },
  categoryName: {
    fontWeight: 'bold', 
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
    overflow: 'hidden', 
    textOverflow: 'ellipsis', 
    whiteSpace: 'nowrap', 
    fontSize: '0.5rem', 
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
