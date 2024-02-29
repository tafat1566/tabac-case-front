import React from 'react';
import { Button, Table } from 'react-bootstrap';

function ProductTable({ products, setProducts, handleEdit }) {
    const handleDelete = (id) => {
        fetch(`http://127.0.0.1:8000/produits/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    console.log('Product deleted successfully');
                    // Mettre à jour la liste des produits après la suppression
                    setProducts(products.filter(product => product.id !== id));
                } else {
                    console.error('Error deleting product');
                }
            })
            .catch(error => console.error('Error deleting product:', error));
    };

    return (
        
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Prix Unitaire</th>
                    <th>Quantité en Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.nom}</td>
                        <td>{product.categorie_id}</td>
                        <td>{product.prix_unitaire}</td>
                        <td>{product.quantite_en_stock}</td>
                        <td>
                            <Button variant="info" onClick={() => handleEdit(product.id)}>Modifier</Button>{' '}
                            <Button variant="danger" onClick={() => handleDelete(product.id)}>Supprimer</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ProductTable;