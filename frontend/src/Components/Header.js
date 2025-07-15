import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'

function Header() {
  return (
    <div>
      
      <Navbar className="nav" >
       <img className="img" src="https://shivayominfotech.com/wp-content/uploads/2025/02/SI_Logo-2-2-e1740641153542.png"/> 
      <Container>
        <div className="d-flex ms-auto align-items-center">
          <Nav.Link href="#home" className="me-3 text-white">Home</Nav.Link>
          <Nav>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Service</Nav.Link>
            <Nav.Link href="#clients">Our Client</Nav.Link>
            <Nav.Link href="#career">Career</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
     

    </div>
  )
}

export default Header
