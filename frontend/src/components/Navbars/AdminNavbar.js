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
  backgroundColor: '#495464',
  color: '#fff',
  fontFamily: "'Raleway', sans-serif",
  fontWeight: 800,
  textTransform: 'capitalize',
  padding: '8px 22px',
  border: '1.5px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '12px',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.4s ease',
  fontSize: '18px',
  letterSpacing: '0.5px',
  backdropFilter: 'blur(4px)',
};


  return (
    <>
      {/* Import font Raleway via link tag */}
      <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700&display=swap" rel="stylesheet" />

      <Navbar bg="light" expand="lg" style={{ borderBottom: '2px solid #e2e2e2', padding: '10px 20px' }}>
        <Container fluid>
          <Navbar.Brand href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
            Safety Road is Our Priority
          </Navbar.Brand>

          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="d-flex gap-2 align-items-center">
              {location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/' ? (
                <>
                  {/* <Nav.Item>
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
                    <Link to="/user/dashboarduser">
                      <Button style={buttonStyle}>Landing Page</Button>
                    </Link>
                  </Nav.Item> */}
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
