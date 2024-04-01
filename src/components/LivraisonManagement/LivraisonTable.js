import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Modal, Form, Table, Button, Card, Badge } from 'react-bootstrap';
import { BsPencil, BsTrash,BsFillPrinterFill } from 'react-icons/bs';
import CreateLivraison from './CreateLivraison';
import ReactToPrint from 'react-to-print';

const LivraisonTable = () => {
    const [livraisonData, setLivraisonData] = useState({
        dateLivraison: '',
        fournisseur: '',
        produit: '',
        quantite: '',
        montantLivraison: '',
        estReglee: '',
    });

    const [showModal, setShowModal] = useState(false);
    const [livraisons, setLivraisons] = useState([]);
    const [produits, setProduits] = useState([]);
    const [fournisseurs, setFournisseurs] = useState([]);
    const [livraisonIdToDelete, setLivraisonIdToDelete] = useState(null);
    const [livraisonIdToEdit, setLivraisonIdToEdit] = useState(null);
    const [showUpdateNotification, setShowUpdateNotification] = useState(false);
    const [showDeleteNotification, setShowDeleteNotification] = useState(false);


    useEffect(() => {
        fetchLivraisons();
        fetchProduits();
        fetchFournisseurs();
    }, []);

    const fetchLivraisons = async () => {
        try {
            const response = await axios.get('http://localhost:8000/livraisons');
            setLivraisons(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des livraisons:', error);
        }
    };
    const createNotification = async (message) => {
        try {
            await axios.post('http://127.0.0.1:8000/notifications', { message, type: 'info' });
        } catch (error) {
            console.error('Error creating notification:', error);
        }
    };

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLivraisonData({
            ...livraisonData,
            [name]: value,
        });
    };

    const handleEdit = (livraisonId) => {
        setLivraisonIdToEdit(livraisonId);
        setShowModal(true);
        const livraisonToEdit = livraisons.find((livraison) => livraison.id === livraisonId);
        setLivraisonData({
            dateLivraison: livraisonToEdit.date_livraison,
            fournisseur: livraisonToEdit.fournisseur_id,
            produit: livraisonToEdit.produit_id,
            quantite: livraisonToEdit.quantite,
            montantLivraison: livraisonToEdit.montant_livraison,
            estReglee: livraisonToEdit.est_reglee,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (livraisonIdToEdit) {
                await axios.put(`http://localhost:8000/livraisons/${livraisonIdToEdit}`, livraisonData);
                alert('Livraison modifiée avec succès!');
                createNotification(`La livraison comprenant une quantité de ${livraisonData.quantite} pour le produit ${produits.find((p) => p.id === livraisonData.produit)?.nom} a été effectuée avec succès !`);
                setShowUpdateNotification(true);
                setTimeout(() => setShowUpdateNotification(false), 5000);
            } else {
                await axios.post('http://localhost:8000/livraisons', livraisonData);
                alert('Livraison créée avec succès!');
            }
            setShowModal(false);
            fetchLivraisons();
        } catch (error) {
            console.error('Erreur lors de la création ou modification de la livraison:', error);
            alert('Une erreur s\'est produite lors de la modification de la livraison.');
            createNotification(`Une erreur s\'est produite lors de la modification de la  livraison comprenant une quantité de ${livraisonData.quantite} pour le produit ${produits.find((p) => p.id === livraisonData.produit)?.nom}`);
        }
    };
    

    const handleDelete = async (livraisonId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/livraisons/${livraisonId}`);
            const deletedLivraison = response.data;
            alert('Livraison supprimée avec succès!');
            createNotification(`Livraison de ${deletedLivraison.quantite} ${produits.find((p) => p.id === deletedLivraison.produit_id)?.nom} a été supprimée avec succès !`);
            fetchLivraisons();
            setShowDeleteNotification(true);
            setTimeout(() => setShowDeleteNotification(false), 5000);
        } catch (error) {
            console.error('Erreur lors de la suppression de la livraison:', error);
            alert('Une erreur s\'est produite lors de la suppression de la livraison.');
        }
    };
    

    const PrintComponent = React.forwardRef(({ livraison }, ref) => (
        <div ref={ref}>
            <Card className="text-center">
                <Card.Header>
                    <h1 className="mb-0">Détails de la Livraison</h1>
                    <img src="/logg.png" alt="Logo" />

                </Card.Header>
                <Card.Body>
                    <Card.Text className="mb-1">Date de livraison: {livraison.date_livraison}</Card.Text>
                    <Card.Text className="mb-1">Fournisseur: {fournisseurs.find((f) => f.id === livraison.fournisseur_id)?.nom}</Card.Text>
                    <Card.Text className="mb-1">Produit: {produits.find((p) => p.id === livraison.produit_id)?.nom}</Card.Text>
                    <Card.Text className="mb-1">Quantité: {livraison.quantite}</Card.Text>
                    <Card.Text className="mb-1">Montant de livraison: {livraison.montant_livraison}</Card.Text>
                    
                </Card.Body>
            </Card>
        </div>
    ));
    
    
    const componentRef = useRef();

    return (
        <>
            <CreateLivraison />

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{livraisonIdToEdit ? 'Modifier une Livraison' : 'Créer une Livraison'}</Modal.Title>
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
                            <Form.Control as="select" name="produit" value={livraisonData.produit} onChange={handleChange} required>
                                <option value="">Sélectionner un produit</option>
                                {produits.map((produit) => (
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
                        <Button variant="primary" type="submit">{livraisonIdToEdit ? 'Modifier' : 'Créer'}</Button>
                        {showUpdateNotification && (
                                    <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#4caf50', color: '#ffffff', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                    La livraison a été modifiée avec succès
                                    </div>
                                )}
                    </Form>
                </Modal.Body>
            </Modal>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date de livraison</th>
                        <th>Fournisseur</th>
                        <th>Produit</th>
                        <th>Quantité</th>
                        <th>Montant de livraison</th>
                        <th>Est réglée</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {livraisons.map((livraison) => (
                        <tr key={livraison.id}>
                            <td>{livraison.date_livraison}</td>
                            <td>{fournisseurs.find((f) => f.id === livraison.fournisseur_id)?.nom}</td>
                            <td>{produits.find((p) => p.id === livraison.produit_id)?.nom}</td>
                            <td>{livraison.quantite}</td>
                            <td>{livraison.montant_livraison}</td>
                            <td>{livraison.est_reglee ? 'Oui' : 'Non'}</td>
                            <td>
                                <Button variant="info" size="sm" onClick={() => handleEdit(livraison.id)}><BsPencil /></Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(livraison.id)}><BsTrash /></Button>{' '}
                                {showDeleteNotification && (
                            <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#ff002b', color: '#ffffff', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            La livraison a été supprimée avec succès
                            </div>)}
                                <ReactToPrint
                                    trigger={() => <Button variant="secondary" size="sm"><BsFillPrinterFill />
                                    </Button>}
                                    content={() => componentRef.current}
                                />
                                <div style={{ display: 'none' }}>
                                    <PrintComponent livraison={livraison} ref={componentRef} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default LivraisonTable;
