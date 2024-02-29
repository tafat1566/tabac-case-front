import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ProductModal({ show, handleClose, handleSubmit, formData, handleChange }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter un produit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="nom">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" name="nom" value={formData.nom} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="prix_unitaire">
                        <Form.Label>Prix unitaire</Form.Label>
                        <Form.Control type="number" name="prix_unitaire" value={formData.prix_unitaire} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="quantite_en_stock">
                        <Form.Label>Quantité en stock</Form.Label>
                        <Form.Control type="number" name="quantite_en_stock" value={formData.quantite_en_stock} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="fournisseur_id">
                        <Form.Label>ID du fournisseur</Form.Label>
                        <Form.Control type="number" name="fournisseur_id" value={formData.fournisseur_id} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="categorie_id">
                        <Form.Label>Categorie</Form.Label>
                        <Form.Control type="number" name="categorie_id" value={formData.categorie_id} onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Enregistrer
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fermer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProductModal;
