import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/auth.css';
import Navbars from '../components/Navbars/AdminNavbar';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router-dom';
import BackgroundLogin from '../assets/img/LandingPage5.jpeg'; // Pakai background

const API_URL_2 = "http://localhost:5000/api";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`${API_URL_2}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token, user } = data;

        if (token && user) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          setUser && setUser(user);

          if (user.role === 0) {
            history.push('/admin/dashboard');
          } else if (user.role === 1) {
            history.push('/user/dashboarduser');
          } else {
            setErrorMessage('Unknown role. Access denied.');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } else {
          setErrorMessage('Login failed. Invalid response from server.');
        }
      } else {
        setErrorMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Navbars />
      <section
        className="vh-100"
        style={{
          backgroundImage: `url(${BackgroundLogin})`,
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
              background: 'rgba(255, 255, 255, 0.1)',
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
              Welcome Back
            </h3>
            <Form onSubmit={handleLogin}>
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

              <Form.Group className="mb-4">
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

              {errorMessage && (
                <Alert variant="danger" className="text-center">
                  {errorMessage}
                </Alert>
              )}

              <Button
                type="submit"
                className="w-100 mt-3"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#495464',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: '600',
                  padding: '12px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#ddd')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#ffffff')}
              >
                Login
              </Button>

              {/* <p className="text-center mt-4" style={{ color: '#f8f9fa' }}>
                Don't have an account?{' '}
                <Link
                  to="/register"
                  style={{
                    color: '#00BFFF',
                    textDecoration: 'underline',
                  }}
                >
                  Register Here
                </Link>
              </p> */}
            </Form>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Login;
