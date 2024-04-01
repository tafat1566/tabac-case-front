import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container, Row, Col, Image, Form, FormControl, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { format } from 'date-fns'; 

import NotificationModal from '../NotificationModal';
import '../../styles/Header.css';

function Header({ isLoggedIn, onLogout, username }) {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/notifications/latest');
      setNotifications(response.data);
    } catch (error) {
      
    }
  };

  const unreadNotifications = notifications.filter(notification => !notification.lu);

  return (
    <div className="header-container">
      <Navbar bg="light" expand="lg" className="navbar-expand">
        <Container fluid>
          <Navbar.Brand href="/">
            <Image src="/logg.png" height={70} alt="Logo de votre entreprise" />
          </Navbar.Brand>
          {isLoggedIn && (
            <Nav className="me-auto">
              <Nav.Link href="/produits"> Gestion des Produits</Nav.Link>
              <Nav.Link href="/categories">Gestion des Catégories</Nav.Link>
              <Nav.Link href="/fournisseur">Gestion des Fournisseurs</Nav.Link>
              <Nav.Link href="/livraison">Gestion des Livraison</Nav.Link>
              <NavDropdown title="Chiffre d'Affaire" id="chiffreAffaireDropdown">
                <NavDropdown.Item href="/chiffre_d_affaire">Visualisation</NavDropdown.Item>
                {}
              </NavDropdown>
              <NavDropdown title="Gestion" id="gestionDropdown">
                <NavDropdown.Item href="/register">Créer un utilisateur</NavDropdown.Item>
                <NavDropdown.Item href="/usermanagement">Gestion des utilisateurs</NavDropdown.Item>
                {}
              </NavDropdown>
              <Form inline className="d-flex ms-auto">
                <FormControl type="search" placeholder="Rechercher" className="mr-sm-2" aria-label="Rechercher" />
                <Button variant="outline-success">Rechercher</Button>
              </Form>
            </Nav>
          )}
          <Nav>
            {isLoggedIn && (
              <>
                <Nav.Link href="/profile">{username}</Nav.Link>
                <Nav.Link onClick={() => setShowNotifications(true)}>
                  <FontAwesomeIcon icon={faBell} style={{ color: 'green' }} />
                  {unreadNotifications.length > 0 && <Badge bg="danger">{unreadNotifications.length}</Badge>}
                </Nav.Link>
                <Nav.Link onClick={onLogout}>Déconnexion</Nav.Link>
              </>
            )}
            {!isLoggedIn && (
              <Nav.Link href="/login">Se connecter</Nav.Link>
            )}
          </Nav>
          <div className="date-container">
            
            <span>{format(new Date(), 'dd/MM/yyyy HH:mm:ss')}</span>
          </div>
        </Container>
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
