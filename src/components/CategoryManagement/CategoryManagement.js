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
    const [showCreateNotification, setShowCreateNotification] = useState(false);
    const [showUpdateNotification, setShowUpdateNotification] = useState(false);
    const [showDeleteNotification, setShowDeleteNotification] = useState(false);

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
            createNotification('New category created: ' + formData.nom);
            setShowCreateNotification(true);
            setTimeout(() => setShowCreateNotification(false), 5000);
            
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
            createNotification('Category edited: ' + formData.nom);
            setShowUpdateNotification(true);
            setTimeout(() => setShowUpdateNotification(false), 5000);
        } catch (error) {
            console.error('Error editing category:', error);
        }
    };

    const handleDelete = async (categoryId) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/categories/${categoryId}`);
                fetchCategories();
                createNotification('Category deleted');
                setShowDeleteNotification(true);
            setTimeout(() => setShowDeleteNotification(false), 5000);
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
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
            <Button variant="success" onClick={handleCreate}>Add Category</Button>
            {showCreateNotification && (
                                    <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#4caf50', color: '#ffffff', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                    La categorie a été crrée avec succès
                                    </div>
                                )}
            <DataTable
                categories={categories}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                showUpdateNotification={showUpdateNotification}
                showDeleteNotification={showDeleteNotification}
            />

            <CategoryModal
                show={showCreateModal}
                handleClose={handleCloseCreate}
                handleSubmit={handleSubmitCreate}
                formData={formData}
                showUpdateNotification={showUpdateNotification}
                handleChange={handleChange}
                showDeleteNotification={showDeleteNotification}
                title="Create Category"
                buttonLabel="Save"
            />

            <CategoryModal
                show={showEditModal}
                handleClose={handleCloseEdit}
                handleSubmit={handleSubmitEdit}
                formData={formData}
                showUpdateNotification={showUpdateNotification}
                handleChange={handleChange}
                showDeleteNotification={showDeleteNotification}
                title="Edit Category"
                buttonLabel="Save"
            />
        </>
    );
}

export default CategoryManagement;
