import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import ProductModal from './ProductModal';

function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        prix_unitaire: '',
        quantite_en_stock: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        fetch('http://127.0.0.1:8000/produits')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleShow = () => {
        setShowModal(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/produits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            fetchProducts(); // Rafraîchir la liste des produits après la création
            handleClose();
        })
        .catch(error => console.error('Error creating product:', error));
    };

    const handleEdit = (id) => {
        // Fetch product details by id and populate the form data
        fetch(`http://127.0.0.1:8000/produits/${id}`)
            .then(response => response.json())
            .then(data => {
                setFormData(data);
                console.log(data);
                handleShow(); // Afficher le modal de modification
            })
            .catch(error => console.error('Error fetching product details:', error));
    };

    const handleDelete = (id) => {
        fetch(`http://127.0.0.1:8000/produits/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                fetchProducts(); // Rafraîchir la liste des produits après la suppression
            } else {
                console.error('Error deleting product');
            }
        })
        .catch(error => console.error('Error deleting product:', error));
    };

    return (
        <div>
            <h2>Gestion des Produits</h2>
            <Button variant="primary" onClick={handleShow}>Ajouter un produit</Button>
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
                            <td>{product.description}</td>
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
            <ProductModal
                show={showModal}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                formData={formData}
                handleChange={handleChange}
            />
        </div>
    );
}

export default ProductManagement;
