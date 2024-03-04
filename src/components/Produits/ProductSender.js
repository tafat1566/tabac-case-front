import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ProductModal from './ProductModal';
import ProductTable from './ProductTable';

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

    const handleEdit = (id) => {
        setSelectedProductId(id);
        handleShow();
        fetch(`http://127.0.0.1:8000/produits/${id}`)
            .then(response => response.json())
            .then(data => {
                setFormData(data);
            })
            .catch(error => console.error('Error fetching product for editing:', error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
                    fetchProducts(); // Rafraîchir la liste des produits après l'ajout ou la modification
                } else {
                    throw new Error('Failed to send data');
                }
            })
            .catch(error => console.error('Error sending data:', error));
    };

    // Attendre que les catégories soient chargées avant de rendre le composant ProductTable
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
            />

            <ProductTable products={products} setProducts={setProducts} handleEdit={handleEdit} categories={categories} /> {/* Utilisation du composant ProductTable */}
        </div>
    );
}

export default ProductSender;
