import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs';

function DataTable({ categories, handleEdit, handleDelete }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {categories.map(category => (
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.nom}</td>
                        <td>{category.description}</td>
                        <td>
                            <Button variant="info" size="sm" onClick={() => handleEdit(category)}>
                                <BsPencil />
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(category.id)}>
                                <BsTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default DataTable;
