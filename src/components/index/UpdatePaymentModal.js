import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdatePaiementModal = () => {
  const [latestPaiement, setLatestPaiement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    montant: '',
    date_paiement: '',
    methode_paiement: '',
    produits: [],
  });

  useEffect(() => {
    const fetchLatestPaiement = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/paiements');
        if (response.data && response.data.length > 0) {
          setLatestPaiement(response.data[response.data.length - 1]);
          setFormData({
            montant: response.data[response.data.length - 1].montant,
            date_paiement: response.data[response.data.length - 1].date_paiement,
            methode_paiement: response.data[response.data.length - 1].methode_paiement,
            produits: response.data[response.data.length - 1].produits,
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching latest paiement:', error);
      }
    };

    fetchLatestPaiement();
  }, []);

  const handleUpdatePaiement = async () => {
    if (!latestPaiement || !latestPaiement.id) {
      console.error('No latest paiement found');
      
      return;
    }

    try {
      await axios.put(`http://127.0.0.1:8000/paiements/mode/${latestPaiement.id}`, formData);
      console.log('Paiement updated successfully');
      createNotification('Paiement updated successfully');
      setShowModal(false);
      setShowUpdateNotification(true);
      setTimeout(() => setShowUpdateNotification(false), 5000); // Hide notification after 5 seconds
    } catch (error) {
      console.error('Error updating paiement:', error);
    }
  };

  const handleDeletePaiement = async () => {
    if (!latestPaiement || !latestPaiement.id) {
      console.error('No latest paiement found');
      createNotification('No latest paiement found');
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/paiements/${latestPaiement.id}`);
      console.log('Paiement deleted successfully');
      createNotification('Paiement deleted successfully');
      setShowModal(false);
      setShowDeleteNotification(true);
      setTimeout(() => setShowDeleteNotification(false), 5000); // Hide notification after 5 seconds
    } catch (error) {
      console.error('Error deleting paiement:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createNotification = async (message) => {
    try {
        await axios.post('http://127.0.0.1:8000/notifications', { message, type: 'info' });
    } catch (error) {
        console.error('Error creating notification:', error);
    }
};

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={() => setShowModal(true)}>Mettre à jour le paiement</Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le paiement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMontant">
              <Form.Label>Montant</Form.Label>
              <Form.Control
                type="text"
                name="montant"
                value={formData.montant}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDatePaiement">
              <Form.Label>Date de paiement</Form.Label>
              <Form.Control
                type="text"
                name="date_paiement"
                value={formData.date_paiement}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formMethodePaiement">
              <Form.Label>Méthode de paiement</Form.Label>
              <Form.Control
                type="text"
                name="methode_paiement"
                value={formData.methode_paiement}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Ajoutez ici des champs pour les produits, en fonction de la structure des données de votre API */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDeletePaiement}>
            Supprimer
          </Button>
          {showDeleteNotification && (
            <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#ff5722', color: '#ffffff', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
              Le paiement a été supprimé avec succès
            </div>
          )}
          <Button variant="primary" onClick={handleUpdatePaiement}>
            Enregistrer
          </Button>
          {showUpdateNotification && (
            <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#4caf50', color: '#ffffff', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
              Le paiement a été modifié avec succès
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdatePaiementModal;
