import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FiSave, FiX } from 'react-icons/fi'; 

function ProductModal({ show, handleClose, handleSubmit, formData, handleChange, categories }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter un produit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="nom">
                        <Form.Label>Nom du produit</Form.Label>
                        <Form.Control type="text" name="nom" value={formData.nom || ''} onChange={handleChange} placeholder="Entrez le nom du produit" />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={formData.description || ''} onChange={handleChange} placeholder="Entrez la description" />
                    </Form.Group>
                    <Form.Group controlId="prix_unitaire">
                        <Form.Label>Prix unitaire</Form.Label>
                        <Form.Control type="number" name="prix_unitaire" value={formData.prix_unitaire || ''} onChange={handleChange} placeholder="Entrez le prix unitaire" />
                    </Form.Group>
                    <Form.Group controlId="quantite_en_stock">
                        <Form.Label>Quantité en stock</Form.Label>
                        <Form.Control type="number" name="quantite_en_stock" value={formData.quantite_en_stock || ''} onChange={handleChange} placeholder="Entrez la quantité en stock" />
                    </Form.Group>
                    <Form.Group controlId="fournisseur_id">
                        <Form.Label>ID du fournisseur</Form.Label>
                        <Form.Control type="number" name="fournisseur_id" value={formData.fournisseur_id || ''} onChange={handleChange} placeholder="Entrez l'ID du fournisseur" />
                    </Form.Group>
                    <Form.Group controlId="categorie_id">
                        <Form.Label>Catégorie</Form.Label>
                        <Form.Control as="select" name="categorie_id" value={formData.categorie_id || ''} onChange={handleChange}>
                            <option value="">Sélectionner une catégorie</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.nom}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Button variant="success" type="submit">
                        <FiSave /> Enregistrer
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    <FiX /> Fermer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProductModal;
