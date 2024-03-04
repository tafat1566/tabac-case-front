import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import DataTable from './DataTable';
import CategoryModal from './CategoryModal';

function CategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [formData, setFormData] = useState({ nom: '', description: '' });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/categories');
            setCategories(response.data);
            console.log(response);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCreate = () => {
        setShowCreateModal(true);
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setFormData({ nom: category.nom, description: category.description });
        setShowEditModal(true);
    };

    const handleCloseCreate = () => {
        setShowCreateModal(false);
    };

    const handleCloseEdit = () => {
        setShowEditModal(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/categories', formData);
            fetchCategories();
            setShowCreateModal(false);
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/categories/${selectedCategory.id}`, formData);
            fetchCategories();
            setShowEditModal(false);
        } catch (error) {
            console.error('Error editing category:', error);
        }
    };

    const handleDelete = async (categoryId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/categories/${categoryId}`);
                fetchCategories();
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    return (
        <>
            <Button variant="success" onClick={handleCreate}>Add Category</Button>
            <DataTable
                categories={categories}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />

            {/* Utilisez le composant CategoryModal */}
            <CategoryModal
                show={showCreateModal}
                handleClose={handleCloseCreate}
                handleSubmit={handleSubmitCreate}
                formData={formData}
                handleChange={handleChange}
                title="Create Category"
                buttonLabel="Enregistrer"
            />

            <CategoryModal
                show={showEditModal}
                handleClose={handleCloseEdit}
                handleSubmit={handleSubmitEdit}
                formData={formData}
                handleChange={handleChange}
                title="Edit Category"
                buttonLabel="Enregistrer"
            />
        </>
    );
}

export default CategoryManagement;
