import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FiSave } from 'react-icons/fi';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000', 
      contrastText: '#ffffff' 
    },
  },
});

function CategoryModal({ show, handleClose, handleSubmit, formData, handleChange, title, buttonLabel }) {
    return (
        <ThemeProvider theme={theme}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
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
                        <Button variant="success" type="submit">
                            <FiSave /> {buttonLabel}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </ThemeProvider>
    );
}

export default CategoryModal;
