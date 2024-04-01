import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from 'react-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs';

function DataTable({ categories, handleEdit, handleDelete, showUpdateNotification, showDeleteNotification }) {

    const columns = [
        { dataField: 'id', text: 'ID' },
        { dataField: 'nom', text: 'Nom' },
        { dataField: 'description', text: 'Description' },
        {
            dataField: 'actions',
            text: 'Actions',
            formatter: (cell, row) => (
                <div>
                    <Button variant="info" size="sm" onClick={() => handleEdit(row)}>
                        <BsPencil />
                    </Button>
                    {showUpdateNotification && (
                        <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#4caf50', color: '#ffffff', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            La catégorie a été modifiée avec succès
                        </div>
                    )}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(row.id)}>
                        <BsTrash />
                    </Button>
                    {showDeleteNotification && (
                        <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#ff5722', color: '#ffffff', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            La catégorie a été supprimée avec succès
                        </div>
                    )}
                </div>
            )
        }
    ];

    return (
        <BootstrapTable
            keyField='id'
            data={categories}
            columns={columns}
            striped
            bordered
            hover
            style={{ backgroundColor: 'transparent' }}
        />
    );
}

export default DataTable;
