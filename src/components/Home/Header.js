import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import NotificationModal from '../NotificationModal';

function Header() {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchNotifications(); // Charge les notifications initiales
    const interval = setInterval(fetchNotifications, 5000); // Effectue une requête toutes les 5 secondes
    return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage du composant
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/notifications/latest');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Filtrer les notifications non lues
  const unreadNotifications = notifications.filter(notification => !notification.lu);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-expand">
        <Navbar.Brand href="/index">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="mr-auto">
            <Nav.Link href="/chiffre_d_affaire">Chiffre d'affaire</Nav.Link>
            <NavDropdown title="Gestion" id="navbarDropdown">
              <NavDropdown.Item href="/productsss">Produits</NavDropdown.Item>
              <NavDropdown.Item href="/categories">Catégories</NavDropdown.Item>
              <NavDropdown.Item href="/fournisseur">Fournisseur</NavDropdown.Item>
              <NavDropdown.Item href="/chiffre_d_affaire">Chiffre d'affaire</NavDropdown.Item>
              <NavDropdown.Item href="/chiffre_d_affaire_d">Chiffre d'affaire par date</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Autre chose ici</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>Désactivé</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => setShowNotifications(true)}>
              <FontAwesomeIcon icon={faBell} />
              {/* Utilisez la longueur du tableau des notifications non lues pour afficher le nombre */}
              <span className="notification-badge" style={{ color: 'red' }}>{unreadNotifications.length}</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <NotificationModal
        show={showNotifications}
        onHide={() => setShowNotifications(false)}
        notifications={notifications}
        updateNotifications={fetchNotifications}
      />
    </div>
  );
}

export default Header;
