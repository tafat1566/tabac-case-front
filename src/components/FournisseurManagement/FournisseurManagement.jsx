import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import { BsPencil, BsTrash } from 'react-icons/bs';
import FournisseurModal from './FournisseurModal'; // Importez le composant FournisseurModal

function FournisseurManagement() {
    const [fournisseurs, setFournisseurs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedFournisseur, setSelectedFournisseur] = useState(null);
    const [formData, setFormData] = useState({ nom: '', adresse: '', email: '', telephone: '' });

    useEffect(() => {
        fetchFournisseurs();
    }, []);

    const fetchFournisseurs = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/fournisseurs');
            setFournisseurs(response.data);
        } catch (error) {
            console.error('Error fetching fournisseurs:', error);
        }
    };

    const handleEdit = (fournisseur) => {
        setSelectedFournisseur(fournisseur);
        setFormData({ ...fournisseur });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedFournisseur) {
                await axios.put(`http://127.0.0.1:8000/fournisseurs/${selectedFournisseur.id}`, formData);
            } else {
                await axios.post('http://127.0.0.1:8000/fournisseurs', formData);
            }
            fetchFournisseurs();
            setShowModal(false);
        } catch (error) {
            console.error('Error creating/editing fournisseur:', error);
        }
    };

    const handleDelete = async (fournisseurId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce fournisseur ?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/fournisseurs/${fournisseurId}`);
                fetchFournisseurs();
            } catch (error) {
                console.error('Error deleting fournisseur:', error);
            }
        }
    };

    return (
        <>
            <Button variant="success" onClick={() => { setSelectedFournisseur(null); setFormData({ nom: '', adresse: '', email: '', telephone: '' }); setShowModal(true); }}>Add Fournisseur</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Adresse</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {fournisseurs.map(fournisseur => (
                        <tr key={fournisseur.id}>
                            <td>{fournisseur.id}</td>
                            <td>{fournisseur.nom}</td>
                            <td>{fournisseur.adresse}</td>
                            <td>{fournisseur.email}</td>
                            <td>{fournisseur.telephone}</td>
                            <td>
                                <Button variant="info" size="sm" onClick={() => handleEdit(fournisseur)}>
                                    <BsPencil />
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(fournisseur.id)}>
                                    <BsTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Utilisez le composant FournisseurModal */}
            <FournisseurModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                selectedFournisseur={selectedFournisseur}
            />
        </>
    );
}

export default FournisseurManagement;
