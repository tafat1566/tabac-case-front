import React from 'react';
import { Card, CardContent, Typography, Grid, Container, Avatar, Box } from '@mui/material';
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
    marginBottom: theme.spacing(0),
    borderRadius: theme.shape.borderRadius,
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
    overflow: 'hidden', 
    textOverflow: 'ellipsis', 
    whiteSpace: 'nowrap', 
    fontSize: '0.8rem', 
    fontFamily: 'Arial', 
    marginTop: theme.spacing(1), 
  },
  categoryContainer: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
}));

function CategoryList({ categories, handleCategoryClick }) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.categoryContainer}>
      <Grid container spacing={2.5}>
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
            <Grid item xs={9} sm={1} md={2} key={category.id}>
              <Card
                className={classes.card}
                style={{ backgroundColor: cardColor }}
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardContent>
                  <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                    {categoryImageSrc && (
                      <Avatar alt={categoryName} src={categoryImageSrc} variant="rounded" style={{ width: '100px', height: '100px' }} />
                    )}
                  </Box>
                  <Typography variant="h6" align="center" className={classes.categoryName} title={categoryName} style={{fontWeight: 'bold'}} >
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
