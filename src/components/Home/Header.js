// Header.jsx
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles.css'; // Importez le fichier de styles

function Header() {
  // Fonction pour afficher une notification de succès
  const notifySuccess = () => {
    toast.success('Paiement effectué avec succès !', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="navbar-expand"> {/* Appliquez la classe CSS personnalisée */}
        <Navbar.Brand href="/index">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="mr-auto">
            <Nav.Link href="/products">ProductManagement</Nav.Link>
            <NavDropdown title="Dropdown" id="navbarDropdown">
              <NavDropdown.Item href="/productsss">Test</NavDropdown.Item>
              <NavDropdown.Item href="/display">Cat display</NavDropdown.Item>
              <NavDropdown.Item href="/displayyy">Cat </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>Disabled</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* Container pour les notifications */}
      <ToastContainer />
    </>
  );
}

export default Header;
