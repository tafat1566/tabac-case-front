import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="mr-auto">
         
          <Nav.Link href="/products">ProductManagement</Nav.Link>
          <NavDropdown title="Dropdown" id="navbarDropdown">
            <NavDropdown.Item href="/productsss">Test</NavDropdown.Item>
            <NavDropdown.Item href="/display">Cat display</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#" disabled>Disabled</Nav.Link>
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
