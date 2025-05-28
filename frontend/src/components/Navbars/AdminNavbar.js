import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/home');
  };

  const buttonStyle = {
    backgroundColor: 'rgba(73, 84, 100, 0.6)',
    color: 'white',
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 500,
    textTransform: 'capitalize',
    padding: '8px 24px',
    border: 'none',
    borderRadius: '999px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s ease',
    fontSize: '16px',
  };

  return (
    <>
      {/* Import font Raleway via link tag */}
      <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700&display=swap" rel="stylesheet" />

      <Navbar bg="light" expand="lg" style={{ borderBottom: '2px solid #e2e2e2', padding: '10px 20px' }}>
        <Container fluid>
          <Navbar.Brand href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
            ROADAPP
          </Navbar.Brand>

          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="d-flex gap-2 align-items-center">
              {location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/' ? (
                <>
                  <Nav.Item>
                    <Link to="/login">
                      <Button style={buttonStyle}>Sign In</Button>
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/register">
                      <Button style={buttonStyle}>Sign Up</Button>
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/">
                      <Button style={buttonStyle}>Landing Page</Button>
                    </Link>
                  </Nav.Item>
                </>
              ) : (
                <Nav.Item>
                  <Button style={buttonStyle} onClick={handleLogout}>Logout</Button>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
