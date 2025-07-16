import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import './Frontend.css'

function Frontend() {
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
            <Nav.Link  href="#clients">Our Client</Nav.Link>
            <Link to="/Disk"><Nav.Link className="career" href="#career">Career</Nav.Link></Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
   
     <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjN1ltoJ5zFnm_1qJ0blUwcsETdloIcA3ddQ&s"
          alt="First slide"
        />
       
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg"
          alt="Second slide"
        />
       
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.shutterstock.com/shutterstock/photos/1932042689/display_1500/stock-photo-businessman-using-mobile-smart-phone-business-global-internet-connection-application-technology-1932042689.jpg"
          alt="Third slide"
        />
       
      </Carousel.Item>
    </Carousel>

        
      
    </div>
  )
}

export default Frontend
