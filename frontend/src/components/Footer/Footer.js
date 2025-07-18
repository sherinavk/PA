import React, { Component } from "react";
import {Container, Row, Col } from 'react-bootstrap';

class Footer extends Component {
  render() {
    return (
      <Container fluid style={{ backgroundColor: '#f8f9fa', padding: '20px 0', textAlign: 'center' }}>
  <Row>
    <Col>
      <p style={{ marginBottom: '0', fontSize: '14px', color: '#6c757d' }}>
        © {new Date().getFullYear()}{" "}
        <a style={{ color: '#000000', textDecoration: 'none', fontWeight: 'bold' }}>ROADAPP </a>
        | Sherina Vega Kemala
      </p>
    </Col>
  </Row>

</Container>

    );
  }
}

export default Footer;
