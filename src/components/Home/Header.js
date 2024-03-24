import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import NotificationModal from '../NotificationModal';
import '../../styles/Header.css';

function Header() {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/notifications/latest')
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const unreadNotifications = notifications.filter(notification => !notification.lu);

  return (
    <div className="header-container">
      <Navbar expand="lg" className="navbar-expand" style={{ backgroundColor: 'f0f0f0' }}>
        <Navbar.Brand href="/index">
          <img
            src="/logg.png"
            height="70"
            className="d-inline-block align-top"
            alt="Tabac Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto">
            <NavLinkWithTooltip to="/productsss" tooltip="Gestion des Produits">Gestion Produits</NavLinkWithTooltip>
            <NavLinkWithTooltip to="/categories" tooltip="Gestion des Catégories">Gestion Catégories</NavLinkWithTooltip>
            <NavLinkWithTooltip to="/fournisseur" tooltip="Gestion des Fournisseurs">Gestion Fournisseur</NavLinkWithTooltip>
            <NavLinkWithTooltip to="/chiffre_d_affaire" tooltip="Visualisation du Chiffre d'affaire">Chiffre d'affaire</NavLinkWithTooltip>
            <NavDropdown title="Gestion" id="navbarDropdown">
              <NavLinkWithTooltip to="/productsss" tooltip="Gestion des Produits">Produits</NavLinkWithTooltip>
              <NavLinkWithTooltip to="/categories" tooltip="Gestion des Catégories">Catégories</NavLinkWithTooltip>
              <NavLinkWithTooltip to="/fournisseur" tooltip="Gestion des Fournisseurs">Fournisseur</NavLinkWithTooltip>
              <NavLinkWithTooltip to="/chiffre_d_affaire" tooltip="Visualisation du Chiffre d'affaire">Chiffre d'affaire</NavLinkWithTooltip>
              <NavDropdown.Divider />
              <NavLinkWithTooltip to="#" tooltip="Autre action">Autre chose ici</NavLinkWithTooltip>
            </NavDropdown>
            <Nav.Link href="#" disabled>Désactivé</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link onClick={() => setShowNotifications(true)}>
              <FontAwesomeIcon icon={faBell} style={{ color: 'green' }} />
              <span className="notification-badge">{unreadNotifications.length}</span>
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

function NavLinkWithTooltip({ to, tooltip, children }) {
  return (
    <Nav.Link href={to} title={tooltip}>{children}</Nav.Link>
  );
}

export default Header;
