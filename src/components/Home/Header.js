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
          {/* Bouton de démonstration pour déclencher la notification */}
          <Nav>
            <Nav.Link onClick={notifySuccess}>
              <i className="fas fa-bell"></i> {/* Icône de notification */}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* Conteneur pour les notifications */}
      <ToastContainer />
    </>
  );
}

export default Header;
