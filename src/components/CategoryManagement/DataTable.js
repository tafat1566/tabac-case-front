import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs';

function DataTable({ categories, handleEdit, handleDelete,showUpdateNotification,showDeleteNotification}) {
    
    return (
        <Table striped bordered hover style={{ backgroundColor: 'transparent' }}>
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
                            {showUpdateNotification && (
                                    <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#4caf50', color: '#ffffff', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                    La categorie a été modifié avec succès
                                    </div>
                                )}
                            <Button variant="danger" size="sm" onClick={() => handleDelete(category.id)}>
                                <BsTrash />
                            </Button>
                            {showDeleteNotification && (
                            <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#ff5722', color: '#ffffff', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            La categorie a été supprimé avec succès
                            </div>
          )}

                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default DataTable;
