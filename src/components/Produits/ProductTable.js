import React from 'react';
import { Button, Table, Badge } from 'react-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs'; // Importez les icônes de React Icons

function ProductTable({ products, setProducts, handleEdit, handleDelete, categories }) {
    // Fonction pour obtenir le nom de la catégorie par ID
    const getCategoryNameById = (categoryId) => {
        const category = categories.find(category => category.id === categoryId);
        return category ? category.nom : 'N/A';
    };

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Catégorie</th>
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
                        <td>{getCategoryNameById(product.categorie_id)}</td>
                        <td>{product.prix_unitaire}</td>
                        <td>
                            <Badge pill variant={product.quantite_en_stock > 0 ? 'success' : 'danger'}>
                                {product.quantite_en_stock}
                            </Badge>
                        </td>
                        <td>
                            <Button variant="info" size="sm" onClick={() => handleEdit(product.id)}>
                                <BsPencil /> {/* Utilisez l'icône pour modifier */}
                            </Button>{' '}
                            <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}>
                                <BsTrash /> {/* Utilisez l'icône pour supprimer */}
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ProductTable;
