import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap';

const CreateLivraison = ({ fetchLivraisons }) => {
    const [livraisonData, setLivraisonData] = useState({
        dateLivraison: '',
        fournisseur: '',
        produit: '',
        quantite: '',
        montantLivraison: '',
        estReglee: false,
    });

    const [produits, setProduits] = useState([]);
    const [fournisseurs, setFournisseurs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showCreateNotification, setShowCreateNotification] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get('http://localhost:8000/produits');
                setProduits(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
            }
        };

        const fetchFournisseurs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/fournisseurs');
                setFournisseurs(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des fournisseurs:', error);
            }
        };

        fetchProduits();
        fetchFournisseurs();
    }, []);

    const createNotification = async (message) => {
        try {
            await axios.post('http://127.0.0.1:8000/notifications', { message, type: 'info' });
        } catch (error) {
            console.error('Error creating notification:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLivraisonData({
            ...livraisonData,
            [name]: value,
        });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProduits = produits.filter(produit =>
        produit.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/livraisons', livraisonData);
            const createdLivraison = response.data;
            alert('Livraison créée avec succès!');
            setShowModal(false);
            setShowCreateNotification(true);
            setTimeout(() => setShowCreateNotification(false), 5000);
            createNotification(`Livraison a été créée avec succès !`);
            fetchLivraisons();
        } catch (error) {
            console.error('Erreur lors de la création de la livraison:', error);
            alert('Une erreur s\'est produite lors de la création de la livraison.');
        }
    };

    return (
        <>
            <Button variant="success" onClick={() => setShowModal(true)}>Nouvelle Livraison</Button>
            {showCreateNotification && (
                <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#4caf50', color: '#ffffff', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    La livraison a été crée avec succès
                </div>
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouvelle Livraison</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="dateLivraison">
                            <Form.Label>Date de livraison:</Form.Label>
                            <Form.Control type="datetime-local" name="dateLivraison" value={livraisonData.dateLivraison} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="fournisseur">
                            <Form.Label>Fournisseur:</Form.Label>
                            <Form.Control as="select" name="fournisseur" value={livraisonData.fournisseur} onChange={handleChange} required>
                                <option value="">Sélectionner un fournisseur</option>
                                {fournisseurs.map((fournisseur) => (
                                    <option key={fournisseur.id} value={fournisseur.id}>{fournisseur.nom}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="produit">
                            <Form.Label>Produit:</Form.Label>
                            <Form.Control type="text" placeholder="Rechercher par nom de produit" value={searchTerm} onChange={handleSearch} />
                            <Form.Control as="select" name="produit" value={livraisonData.produit} onChange={handleChange} required>
                                <option value="">Sélectionner un produit</option>
                                {filteredProduits.map((produit) => (
                                    <option key={produit.id} value={produit.id}>{produit.nom}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="quantite">
                            <Form.Label>Quantité:</Form.Label>
                            <Form.Control type="number" name="quantite" value={livraisonData.quantite} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="montantLivraison">
                            <Form.Label>Montant de livraison:</Form.Label>
                            <Form.Control type="number" name="montantLivraison" value={livraisonData.montantLivraison} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="estReglee">
                            <Form.Check type="checkbox" label="Est réglée" name="estReglee" checked={livraisonData.estReglee} onChange={(e) => setLivraisonData({ ...livraisonData, estReglee: e.target.checked })} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Créer</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateLivraison;
