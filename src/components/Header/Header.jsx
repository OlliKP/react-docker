import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import './Header.css';
import { CartContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const cart = useContext(CartContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top navbar-custom">
      <Container fluid>
        <Navbar.Toggle aria-controls="" />
        <Navbar.Collapse>
          <Nav
            className="me-auto nav-links my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/shop">
              Shop slik
            </Nav.Link>
            <Nav.Link as={Link} to="/omos">
              Om Snolder
            </Nav.Link>
          </Nav>
          <Link to="/kurv">
            <Button variant="outline-success" className="header-btn">
              Kurv
              <Badge className="badge" bg="success">
                {cart.cartItems.length}
              </Badge>
            </Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
