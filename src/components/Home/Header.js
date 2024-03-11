import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import NotificationModal from '../NotificationModal';
import '../../styles/Header.css'; // Importe le fichier CSS pour styliser le header

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
    <div className="header-container"> {/* Utilise une classe pour styliser le container du header */}
      <Navbar  expand="lg" className="navbar-expand" style={{ backgroundColor: '#6b5573' }}>
        <Navbar.Brand href="/index">TabacEase</Navbar.Brand> {/* Change le titre du site */}
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="mr-auto">
            <Nav.Link href="/productsss">Gestion Produits</Nav.Link>
            <Nav.Link href="/categories">Gestion Catégories</Nav.Link>
            <Nav.Link href="/fournisseur">Gestion Fournisseur</Nav.Link>
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
              <span className="notification-badge">{unreadNotifications.length}</span> {/* Utilise une classe pour styliser le badge de notification */}
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
