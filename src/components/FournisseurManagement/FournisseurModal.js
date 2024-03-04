import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function FournisseurModal({ showModal, handleCloseModal, formData, handleChange, handleSubmit, selectedFournisseur }) {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedFournisseur ? 'Edit Fournisseur' : 'Create Fournisseur'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNom">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" placeholder="Nom" name="nom" value={formData.nom} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formAdresse">
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control type="text" placeholder="Adresse" name="adresse" value={formData.adresse} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formTelephone">
                        <Form.Label>Téléphone</Form.Label>
                        <Form.Control type="text" placeholder="Téléphone" name="telephone" value={formData.telephone} onChange={handleChange} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {selectedFournisseur ? 'Save Changes' : 'Create Fournisseur'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default FournisseurModal;
