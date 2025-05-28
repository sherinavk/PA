import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import API_URL from '../config/apiConfig';

function TableList() {
  const [nama, setNama] = useState('');
  const [kondisi, setKondisi] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { nama, kondisi };

    fetch(`${API_URL}/jalan/jalan/tambah`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        alert('Data jalan berhasil ditambahkan!');
        setNama('');
        setKondisi('');
      })
      .catch(error => {
        console.error("Error adding jalan:", error);
      });
  };

  return (
    <Container fluid style={{ fontFamily: 'Raleway, sans-serif' }}>
      <Row>
        <Col md="8">
          <Card style={{ borderRadius: '20px', padding: '2rem',  }}>
            <Card.Header style={{ border: 'none', paddingBottom: '1rem' }}>
              <Card.Title as="h4">Tambah Jalan</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <label>Nama Jalan</label>
                  <Form.Control
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan nama jalan"
                    style={{ borderRadius: '10px', padding: '10px' }}
                  />
                </Form.Group>
                <Form.Group>
                  <label>Kondisi Jalan</label>
                  <Form.Control
                    as="select"
                    value={kondisi}
                    onChange={(e) => setKondisi(e.target.value)}
                    style={{ borderRadius: '10px', padding: '10px' }}
                  >
                    <option value="">Pilih kondisi</option>
                    <option value="tidak rusak">Tidak Rusak</option>
                    <option value="rusak ringan">Rusak Ringan</option>
                    <option value="rusak sedang">Rusak Sedang</option>
                    <option value="rusak berat">Rusak Berat</option>
                  </Form.Control>
                </Form.Group>
                <Button
                  className="btn-fill mt-3"
                  type="submit"
                  variant="info"
                  style={{
                    borderRadius: '20px',
                    backgroundColor: '#76898A', // Button color
                    color: 'white',
                    padding: '12px 30px',
                    border: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Tambah Jalan
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TableList;
