import React from 'react';
import { Modal, ListGroup, Badge } from 'react-bootstrap';
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

  const unreadNotifications = notifications.filter(notification => !notification.lu);

  return (
    <Modal show={show} onHide={onHide} size="lg" className="notification-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          Notifications <Badge bg="danger">{unreadNotifications.length}</Badge>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant="flush">
          {notifications.map(notification => (
            <ListGroup.Item
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id)}
              style={{
                backgroundColor: notification.lu ? '#fff' : '#f7f7f7',
                borderLeft: `5px solid ${notification.lu ? '#ccc' : notification.message.includes('La quantité en stock du produit') ? 'red' : '#007bff'}`,
              }}
            >
              <div className="notification-content">
                <div style={{ fontWeight: 'bold' }}>{notification.message}</div>
                <div className="notification-meta">
                  <span>{new Date(notification.dateCreation).toLocaleString()}</span>
                  {notification.lu && <Badge bg="success">Lu</Badge>}
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}

export default NotificationModal;
