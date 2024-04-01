import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, Modal, Form } from 'react-bootstrap';
import { BsPencil, BsTrash,BsVectorPen } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';


function ProductComponent() {
    const [products, setProducts] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateNotification, setShowCreateNotification] = useState(false);
    const [showUpdateNotification, setShowUpdateNotification] = useState(false);
    const [showDeleteNotification, setShowDeleteNotification] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        nom: '',
        prix_unitaire: '',
        quantite_en_stock: '',
        fournisseur_id: '',
        categorie_id: ''
    });
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [productsResponse, categoriesResponse, suppliersResponse] = await Promise.all([
                axios.get('http://localhost:8000/produits'),
                axios.get('http://127.0.0.1:8000/categories'),
                axios.get('http://127.0.0.1:8000/fournisseurs')
            ]);

            setProducts(productsResponse.data);

            const categoriesData = categoriesResponse.data.reduce((acc, category) => {
                acc[category.id] = category.nom;
                return acc;
            }, {});
            setCategories(categoriesData);

            const suppliersData = suppliersResponse.data.reduce((acc, supplier) => {
                acc[supplier.id] = supplier.nom;
                return acc;
            }, {});
            setSuppliers(suppliersData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleShowCreateModal = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => setShowCreateModal(false);

    const handleShowEditModal = (product) => {
        setFormData(product);
        setShowEditModal(true);
    };
    const createNotification = async (message) => {
        try {
            await axios.post('http://127.0.0.1:8000/notifications', { message, type: 'info' });
        } catch (error) {
            console.error('Error creating notification:', error);
        }
    };
    const handleCloseEditModal = () => setShowEditModal(false);

    const handleCreateProduct = async () => {
        try {
            await axios.post('http://localhost:8000/produits', formData);
            fetchData();
            handleCloseCreateModal(); 
        } catch (error) {
            console.error('Error creating product:', error);
        }
       
        handleCloseCreateModal(); 
        createNotification('Creation du produit :' +formData.nom);
        setShowCreateNotification(true);
        setTimeout(() => setShowCreateNotification(false), 5000);
    };
    
    const handleEditProduct = async () => {
        try {
            await axios.put(`http://localhost:8000/produits/${formData.id}`, formData);
            fetchData();
            
        } catch (error) {
            console.error('Error updating product:', error);
        }
        handleCloseEditModal();
        createNotification('Le produit :' +formData.nom +' à été modifié');
        setShowUpdateNotification(true);
        setTimeout(() => setShowUpdateNotification(false), 5000);
    };
    

    const handleDeleteProduct = async (id) => {
        try {
            const deletedProduct = products.find(product => product.id === id);
            const productName = deletedProduct ? deletedProduct.nom : 'Produit inconnu';
    
            await axios.delete(`http://localhost:8000/produits/${id}`);
            fetchData();
    
            createNotification('Le produit ' + productName + ' a été supprimé');
            setShowDeleteNotification(true);
            setTimeout(() => setShowDeleteNotification(false), 5000);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    const columns = [
        { dataField: 'id', text: 'ID' },
        { dataField: 'nom', text: 'Nom' },
        { dataField: 'category', text: 'Catégorie', formatter: (cell, row) => categories[row.categorie_id] || 'Unknown' },
        { dataField: 'prix_unitaire', text: 'Prix unitaire' },
        { dataField: 'quantite_en_stock', text: 'Quantité en stock' },
        { dataField: 'supplier', text: 'Fournisseur', formatter: (cell, row) => suppliers[row.fournisseur_id] || 'Unknown' },
        {
            dataField: 'actions',
            text: 'Actions',
            formatter: (cell, row) => (
                <div>
                    <Button variant="info" size="sm" onClick={() => handleShowEditModal(row)}><BsPencil/></Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(row.id)}><BsTrash></BsTrash></Button>
                    {showDeleteNotification && (
                            <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#ff5722', color: '#ffffff', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            Le produit a été supprimé avec succès
                            </div>
          )}
                </div>
            )
        }
    ];

    return (
        <div>
            <Button variant="success" onClick={handleShowCreateModal}>Créer un produit</Button>
            {showCreateNotification && (
                                    <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#4caf50', color: '#ffffff', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                    Le produit a été crrée avec succès
                                    </div>
                                )}
            <BootstrapTable
                keyField='id'
                data={products}
                columns={columns}
            />

            <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Créer un produit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formProductName">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control type="text" placeholder="Entrez le nom du produit" value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} />
                        </Form.Group>

                        <Form.Group controlId="formProductPrice">
                            <Form.Label>Prix unitaire</Form.Label>
                            <Form.Control type="text" placeholder="Entrez le prix unitaire du produit" value={formData.prix_unitaire} onChange={(e) => setFormData({ ...formData, prix_unitaire: e.target.value })} />
                        </Form.Group>

                        <Form.Group controlId="formProductStock">
                            <Form.Label>Quantité en stock</Form.Label>
                            <Form.Control type="text" placeholder="Entrez la quantité en stock du produit" value={formData.quantite_en_stock} onChange={(e) => setFormData({ ...formData, quantite_en_stock: e.target.value })} />
                        </Form.Group>

                        <Form.Group controlId="formProductCategory">
                            <Form.Label>Catégorie</Form.Label>
                            <Form.Control as="select" value={formData.categorie_id} onChange={(e) => setFormData({ ...formData, categorie_id: e.target.value })}>
                                <option value="">Sélectionnez une catégorie</option>
                                {Object.keys(categories).map(categoryId => (
                                    <option key={categoryId} value={categoryId}>{categories[categoryId]}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formProductSupplier">
                            <Form.Label>Fournisseur</Form.Label>
                            <Form.Control as="select" value={formData.fournisseur_id} onChange={(e) => setFormData({ ...formData, fournisseur_id: e.target.value })}>
                                <option value="">Sélectionnez un fournisseur</option>
                                {Object.keys(suppliers).map(supplierId => (
                                    <option key={supplierId} value={supplierId}>{suppliers[supplierId]}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreateModal}>Annuler</Button>
                    <Button variant="primary" onClick={handleCreateProduct}>Créer</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                <Modal.Title>Modifier un produit</Modal.Title>
</Modal.Header>
<Modal.Body>
<Form>
<Form.Group controlId="formProductName">
<Form.Label>Nom</Form.Label>
<Form.Control type="text" placeholder="Entrez le nom du produit" value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} />
</Form.Group>
<Form.Group controlId="formProductPrice">
                        <Form.Label>Prix unitaire</Form.Label>
                        <Form.Control type="text" placeholder="Entrez le prix unitaire du produit" value={formData.prix_unitaire} onChange={(e) => setFormData({ ...formData, prix_unitaire: e.target.value })} />
                    </Form.Group>

                    <Form.Group controlId="formProductStock">
                        <Form.Label>Quantité en stock</Form.Label>
                        <Form.Control type="text" placeholder="Entrez la quantité en stock du produit" value={formData.quantite_en_stock} onChange={(e) => setFormData({ ...formData, quantite_en_stock: e.target.value })} />
                    </Form.Group>

                    <Form.Group controlId="formProductCategory">
                        <Form.Label>Catégorie</Form.Label>
                        <Form.Control as="select" value={formData.categorie_id} onChange={(e) => setFormData({ ...formData, categorie_id: e.target.value })}>
                            <option value="">Sélectionnez une catégorie</option>
                            {Object.keys(categories).map(categoryId => (
                                <option key={categoryId} value={categoryId}>{categories[categoryId]}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formProductSupplier">
                        <Form.Label>Fournisseur</Form.Label>
                        <Form.Control as="select" value={formData.fournisseur_id} onChange={(e) => setFormData({ ...formData, fournisseur_id: e.target.value })}>
                            <option value="">Sélectionnez un fournisseur</option>
                            {Object.keys(suppliers).map(supplierId => (
                                <option key={supplierId} value={supplierId}>{suppliers[supplierId]}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditModal}>Annuler</Button>
                <Button variant="primary" onClick={handleEditProduct}>Enregistrer</Button>
                {showUpdateNotification && (
                                    <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#4caf50', color: '#ffffff', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                    Le produit a été modifié avec succès
                                    </div>
                                )}
            </Modal.Footer>
        </Modal>
    </div>
);
}

export default ProductComponent;
