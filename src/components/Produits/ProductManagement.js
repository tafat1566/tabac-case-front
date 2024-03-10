import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import ProductModal from './ProductModal';
import axios from 'axios'; // Import d'axios

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

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/produits');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/produits', formData);
            await createNotification('New product added'); // Notification
            fetchProducts(); // Rafraîchir la liste des produits après la création
            handleClose();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleEdit = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/produits/${id}`);
            const data = await response.json();
            setFormData(data);
            console.log(data);
            handleShow(); // Afficher le modal de modification
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://127.0.0.1:8000/produits/${id}`, {
                method: 'DELETE',
            });
            await createNotification('Product deleted'); // Notification
            fetchProducts(); // Rafraîchir la liste des produits après la suppression
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Fonction pour créer une notification
    const createNotification = async (message) => {
        try {
            await axios.post('http://127.0.0.1:8000/notifications', { message, type: 'info' });
        } catch (error) {
            console.error('Error creating notification:', error);
        }
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
