import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import '../assets/css/auth.css';
import Navbars from '../components/Navbars/AdminNavbar';
import Footer from '../components/Footer/Footer';
import BackgroundRegister from '../assets/img/LandingPage4.jpeg';

const API_URL_2 = "http://localhost:5000/api";

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [error, setError] = useState('');
  const role = 1;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmpassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }

    try {
      const response = await fetch(`${API_URL_2}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = '/login';
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <>
      <Navbars />
      <section
        className="vh-100"
        style={{
          backgroundImage: `url(${BackgroundRegister})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {/* Overlay */}
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        ></div>

        <Container
          fluid
          className="d-flex justify-content-center align-items-center vh-100"
          style={{ position: 'relative', zIndex: 2 }}
        >
          <div
            className="p-5"
            style={{
              width: '100%',
              maxWidth: '420px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#fff',
            }}
          >
            <h3
              className="text-center mb-4 fw-bold"
              style={{
                letterSpacing: '1px',
                color: '#ffffff',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Create Account
            </h3>
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#f8f9fa' }}>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  style={{
                    borderRadius: '10px',
                    padding: '12px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#f8f9fa' }}>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                  style={{
                    borderRadius: '10px',
                    padding: '12px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#f8f9fa' }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  style={{
                    borderRadius: '10px',
                    padding: '12px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label style={{ color: '#f8f9fa' }}>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                  style={{
                    borderRadius: '10px',
                    padding: '12px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                  }}
                />
              </Form.Group>

              {error && (
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                className="w-100"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#495464',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  padding: '12px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = '#ddd')
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = '#ffffff')
                }
              >
                Sign Up
              </Button>
            </Form>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Register;
