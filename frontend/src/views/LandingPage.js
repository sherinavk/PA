import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Container, Card } from 'react-bootstrap';
import '../assets/css/landingpage.css';
import Navbars from '../components/Navbars/AdminNavbar'; 
import Footer from '../components/Footer/Footer'; 

const LandingPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('../config/apiConfig');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setServices(data.services);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
  
    fetchServices();
  }, []);
  
  return (
    <div>
      {/* Navbar */}
      <Navbars />
      {/* Hero Section */}
      <div className="hero-section position-relative" 
           style={{
             backgroundImage: 'url(https://media.suara.com/pictures/970x544/2021/12/21/36585-jalan-rusak.jpg)',
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             height: '100vh'
           }}>
        <div className="container text-center position-relative" style={{ zIndex: 1 }}>
          <h1 className="display-4 fw-bold mb-4 text-white">Let’s Try Our App</h1>
          <p className="lead mb-4 text-white">
            We provide the best services for monitoring road conditions.
          </p>
          <Button variant="primary" size="lg" className="rounded-pill">Learn More</Button>
        </div>
        <div className="hero-section-overlay position-absolute top-0 start-0 w-100 h-100"></div>
      </div>

      {/* Our Services Section */}
      <Container>
        <h2 className="text-center mb-5">Our Services</h2>
        <Row className="justify-content-center">
          {services.length === 0 ? (
            <div className="text-center">Loading services...</div>
          ) : (
            services.map(service => (
              <Col md={4} className="mb-4" key={service.id}>
                <Card className="h-100 shadow-sm rounded-lg">
                  <Card.Img variant="top" src={service.imageUrl} />
                  <Card.Body>
                    <Card.Title>{service.name}</Card.Title>
                    <Card.Text>{service.description}</Card.Text>
                    <Button variant="info" className="w-100 rounded-pill">Learn More</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
