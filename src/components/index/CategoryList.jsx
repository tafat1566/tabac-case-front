import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function CategoryList({ categories, handleCategoryClick }) {
    // Liste de couleurs prédéfinies pour chaque catégorie
    const categoryColors = ['#ff6666', '#66ff66', '#6666ff', '#facf21', 
    '#ff66ff', '#66ffff', '#ff9966', '#66ccff', '#cc66ff', '#99ff66', 
    '#ff6666', '#6699ff', '#66ff99', '#ff66cc', '#66ffcc', '#ffcc66'];

    return (
        <div className="row">
            {categories.map((category, index) => {
                // Extraire la partie du nom avant l'espace ou le tiret
                const categoryName = category.nom.split(/[\s-]/)[0];
                // Utiliser une couleur prédéfinie pour chaque catégorie
                const categoryColor = categoryColors[index % categoryColors.length];
                return (
                    <div key={category.id} className="col-md-4">
                        <Card className="list-item-3d" onClick={() => handleCategoryClick(category.id)} style={{ backgroundColor: categoryColor, marginBottom: '20px' }}>
                            <CardContent>
                                <Typography variant="h6">{categoryName}</Typography>
                            </CardContent>
                        </Card>
                    </div>
                );
            })}
        </div>
    );
}

export default CategoryList;
