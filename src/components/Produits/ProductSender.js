import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ProductModal from './ProductModal';
import ProductTable from './ProductTable';
// import ModalEdit from './ModalEdit';
import axios from 'axios'; 

function ProductSender() {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        prix_unitaire: '',
        quantite_en_stock: '',
        fournisseur_id: '',
        categorie_id: ''
    });
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [showCreateNotification, setShowCreateNotification] = useState(false);
    const [showUpdateNotification, setShowUpdateNotification] = useState(false);
    const [showDeleteNotification, setShowDeleteNotification] = useState(false);
    const [idd, setIdd] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = () => {
        fetch('http://127.0.0.1:8000/produits')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    };

    const fetchCategories = () => {
        fetch('http://127.0.0.1:8000/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedProductId(null);
    };

    const handleShow = () => {
        setShowModal(true);
    };

    const handleEdit = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/produits/${id}`);
            const data = await response.json();
            setFormData(data);
            setShowUpdateNotification(true);
            setTimeout(() => setShowUpdateNotification(false), 5000);
            handleShow(); 
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/produits', formData);
            await createNotification('New product added'); 
            setShowCreateNotification(true);
            setTimeout(() => setShowCreateNotification(false), 5000);
            fetchProducts(); 
            handleClose();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const createNotification = async (message) => {
        try {
            await axios.post('http://127.0.0.1:8000/notifications', { message, type: 'info' });
        } catch (error) {
            console.error('Error creating notification:', error);
        }
    };
    const handleDelete = async (id) => {
        try {
            await fetch(`http://127.0.0.1:8000/produits/${id}`, {
                method: 'DELETE',
            });
            await createNotification('Product deleted'); 
            fetchProducts(); 
            setShowDeleteNotification(true);
            setTimeout(() => setShowDeleteNotification(false), 5000);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const sendData = () => {
        const url = selectedProductId
            ? `http://127.0.0.1:8000/produits/${selectedProductId}`
            : 'http://127.0.0.1:8000/produits';

        const method = selectedProductId ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    console.log('Data sent successfully');
                    handleClose();
                    fetchProducts(); 
                } else {
                    throw new Error('Failed to send data');
                }
            })
            .catch(error => console.error('Error sending data:', error));
    };

    if (categories.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Button variant="success" onClick={handleShow}>Créer un produit</Button>

            <ProductModal
                show={showModal}
                handleClose={handleClose}
                handleSubmit={sendData}
                formData={formData}
                handleChange={handleChange}
                categories={categories}
                showUpdateNotification={showUpdateNotification}
                products={products}
                handleShow={handleShow}
            />

            <ProductTable 
                handleDelete={handleDelete} 
                showDeleteNotification={showDeleteNotification}
                products={products} 
                setProducts={setProducts} 
                handleEdit={handleEdit} 
                categories={categories} 
                handleShow={handleShow}
            />
        </div>
    );
}

export default ProductSender;

            