import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs'; 

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    email: '',
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setUpdatedUserData({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/user/${selectedUser.id}`, updatedUserData);
      fetchUsers();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleUpdateClick(user)}>
                  <BsPencil /> Modifier
                </Button>
                <Button variant="danger" size="sm" onClick={() => deleteUser(user.id)}>
                  <BsTrash /> Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={updatedUserData.email} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>Prénom</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" name="firstName" value={updatedUserData.firstName} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formBasicLastName">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" name="lastName" value={updatedUserData.lastName} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Enregistrer les modifications
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserManagement;
