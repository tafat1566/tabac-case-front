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
            createNotification('New category created: ' + formData.nom);
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
            <DataTable
                categories={categories}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />

            <CategoryModal
                show={showCreateModal}
                handleClose={handleCloseCreate}
                handleSubmit={handleSubmitCreate}
                formData={formData}
                handleChange={handleChange}
                title="Create Category"
                buttonLabel="Save"
            />

            <CategoryModal
                show={showEditModal}
                handleClose={handleCloseEdit}
                handleSubmit={handleSubmitEdit}
                formData={formData}
                handleChange={handleChange}
                title="Edit Category"
                buttonLabel="Save"
            />
        </>
    );
}

export default CategoryManagement;
