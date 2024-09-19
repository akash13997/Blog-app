import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Navbar.css"

const MyNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
        <div className='mx-4'>
      <Navbar.Brand as={Link} to="/Home">Demo</Navbar.Brand>
      </div>
     <div className='mx-4'> <Navbar.Toggle aria-controls="basic-navbar-nav" /></div>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-4 mx-4"> 
          <Nav.Link as={Link} to="/Home">Home</Nav.Link>
          <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
        </Nav>
        <div className="ml-auto left_side">
          <Button as={Link} to="/" variant="outline-primary" className="mx-2">Login</Button>
          <Button as={Link} to="/signup" variant="primary">Sign Up</Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
