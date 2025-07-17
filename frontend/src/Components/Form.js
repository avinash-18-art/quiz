import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Form.css';

function Form() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    repassword: '',
  });
  const [resume, setResume] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Track if registration is successful

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, repassword } = formData;

    // Validation
    if (!name || !email || !phone || !password || !repassword || !resume) {
      setPopupMessage('❌ Please fill all fields and upload your resume.');
      setIsSuccess(false);
      setShowPopup(true);
      return;
    }

    if (password !== repassword) {
      setPopupMessage('❌ Passwords do not match.');
      setIsSuccess(false);
      setShowPopup(true);
      return;
    }

    // Prepare form data
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('phone', phone);
    data.append('password', password);
    data.append('resume', resume);

    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        setPopupMessage(result.message || '✅ Registration successful!');
        setIsSuccess(true);
      } else {
        setPopupMessage(result.message || '❌ Registration failed.');
        setIsSuccess(false);
      }
      setShowPopup(true);
    } catch (error) {
      setPopupMessage('❌ Server error. Please try again later.');
      setIsSuccess(false);
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    if (isSuccess) {
      navigate('/Middle');
    }
  };

  return (
    <div>
      <Navbar className="nav">
        <img
          className="img"
          src="https://shivayominfotech.com/wp-content/uploads/2025/02/SI_Logo-2-2-e1740641153542.png"
          alt="Logo"
        />
        <Container>
          <div className="d-flex ms-auto align-items-center">
            <Link to="/Frontend"><Nav.Link href="#home" className="me-3 text-white">Home</Nav.Link></Link>
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
       
      <div className='background-color'> 
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="form-title">Register Now</h2>

          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" onChange={handleChange} />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" onChange={handleChange} />

          <label htmlFor="phone">Mobile Number</label>
          <input type="tel" id="phone" placeholder="Enter your mobile number" onChange={handleChange} />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" onChange={handleChange} />

          <label htmlFor="repassword">Re-Password</label>
          <input type="password" id="repassword" placeholder="Re-enter your password" onChange={handleChange} />

          <label htmlFor="resume">Upload Resume (PDF Only)</label>
          <input type="file" id="resume" accept="application/pdf" onChange={handleResumeChange} />

          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <button className="close-btn" onClick={closePopup}>OK</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default Form;
