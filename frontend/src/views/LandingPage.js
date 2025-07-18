import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/css/landingpage.css';
import Navbars from '../components/Navbars/AdminNavbar';
import Footer from '../components/Footer/Footer';
import LandingPage1 from '../assets/img/LandingPage1.jpeg';
import LandingPage2 from '../assets/img/LandingPage2.jpeg';
import LandingPage3 from '../assets/img/LandingPage3.jpeg';
import LandingPage4 from '../assets/img/LandingPage4.jpeg';
import LandingPage5 from '../assets/img/LandingPage5.jpeg';

const LandingPage = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const images = [LandingPage1, LandingPage2, LandingPage3, LandingPage4, LandingPage5];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevImage = () => {
    setFade(false);
    setTimeout(() => {
      setImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setFade(true);
    }, 300);
  };

  const handleNextImage = () => {
    setFade(false);
    setTimeout(() => {
      setImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setFade(true);
    }, 300);
  };

  // 🌟 Stylish Button
  const buttonStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    border: '2px solid #fff',
    borderRadius: '15px',
    padding: '14px 36px',
    fontSize: '18px',
    fontWeight: '600',
    textDecoration: 'none',
    boxShadow: '0 8px 24px rgba(255, 255, 255, 0.2)',
    transition: 'all 0.4s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#fff',
    color: '#000',
    transform: 'scale(1.05)',
    boxShadow: '0 8px 30px rgba(255, 255, 255, 0.4)',
  };

  return (
    <div>
      {/* Navbar */}
      <Navbars />

      {/* Hero Section */}
      <div
        className={`hero-section position-relative ${fade ? 'fade-in' : 'fade-out'}`}
        style={{
          backgroundImage: `url(${images[imageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        ></div>

        {/* Text + Button */}
        <div
          className="container text-center position-relative"
          style={{ zIndex: 2 }}
        >
          <h1
            className="display-4 fw-bold mb-4 text-white"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}
          >
            Let’s Try Our App
          </h1>
          <p
            className="lead mb-4 text-white"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}
          >
            We provide the best services for monitoring road conditions.
          </p>

          {/* 🚀 Dashboard Button */}
          <Link to="/user/dashboarduser">
            <Button
              style={buttonStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
            >
              Go to Dashboard
            </Button>
          </Link>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="link"
          className="position-absolute top-50 start-0 translate-middle-y text-white"
          onClick={handlePrevImage}
          style={{
            width: '60px',
            height: '60px',
            fontSize: '26px',
            zIndex: 2,
            left: '40px', // lebih ke tengah
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.4s ease',
            color: '#fff',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.25)';
            e.target.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.7)';
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.4)';
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
          }}
        >
          &#x3c;
        </Button>

        <Button
          variant="link"
          className="position-absolute top-50 start-0 translate-middle-y text-white"
          onClick={handlePrevImage}
          style={{
            width: '60px',
            height: '60px',
            fontSize: '26px',
            zIndex: 2,
            right: '40px', // lebih ke tengah
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.4s ease',
            color: '#fff',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.25)';
            e.target.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.7)';
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.4)';
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
          }}
        >
          &#x3e;
        </Button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
