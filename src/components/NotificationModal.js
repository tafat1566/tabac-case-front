import React from 'react';
import { Modal, ListGroup } from 'react-bootstrap';
import axios from 'axios';

function NotificationModal({ show, onHide, notifications, updateNotifications }) {

  const handleNotificationClick = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:8000/notifications/${id}/mark-as-read`);
      updateNotifications(); 
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {notifications.map(notification => (
            <ListGroup.Item
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id)}
              style={{ cursor: 'pointer', backgroundColor: notification.lu ? '#ffffff' : '#f0f0f0' }}
            >
              <div style={{ color: notification.lu ? '#000000' : notification.message.includes('La quantité en stock du produit') ? 'red' : '#0000ff', fontWeight: 'bold' }}>{notification.message}</div>
              <div style={{ color: '#6c757d' }}>{new Date(notification.dateCreation).toLocaleString()}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}

export default NotificationModal;
