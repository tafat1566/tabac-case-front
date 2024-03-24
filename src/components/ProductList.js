import React from 'react';

function CategoryProductDisplay({ products, addToCart, selectedProducts, selectedCategory }) {
  const handleAddToCart = (event) => {
    const productId = parseInt(event.target.value);
    const selectedProduct = products.find(product => product.id === productId);
    addToCart(selectedProduct);
  };

  return (
    <div className="product-list-container">
      <h2>Produits de la catégorie : {selectedCategory}</h2>
      <select onChange={handleAddToCart} className="form-control mb-3">
        {products && products.map(product => (
          <option
            key={product.id}
            value={product.id}
            className={selectedProducts && selectedProducts.some(item => item.id === product.id) ? 'selected' : ''}
          >
            {product.nom} - {product.prix_unitaire} €
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryProductDisplay;
