import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import API_URL from '../config/apiConfig';
import { Link } from 'react-router-dom';

function DaftarJalan() {
  const [jalans, setJalans] = useState([]);

  // Fetch data jalan dari backend
  useEffect(() => {
    fetch(`${API_URL}/jalan/jalan`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parsing response JSON
      })
      .then(data => {
        setJalans(data); // Simpan data jalan ke state
      })
      .catch(error => {
        console.error("Terjadi kesalahan saat mengambil data jalan:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      // Menghapus data jalan dari backend
      await fetch(`${API_URL}/jalan/jalan/${id}`, {
        method: 'DELETE',
      });
      // Menghapus data jalan dari state setelah berhasil dihapus
      setJalans(jalans.filter((jalan) => jalan.id !== id));
      alert('Jalan berhasil dihapus!');
    } catch (error) {
      console.error('Gagal menghapus jalan:', error);
    }
  };

  return (
    <Container fluid style={{ fontFamily: 'Raleway, sans-serif' }}>
      <Row>
        <Col md="12">
          <Card
            className="mt-4"
            style={{
              borderRadius: '12px',
              backgroundColor: '#F1F1F1',
              padding: '20px',
              border: 'none',
            }}
          >
            <Card.Header style={{ border: 'none', background: 'none' }}>
              <Card.Title as="h4" style={{ textAlign: 'center' }}>Daftar Jalan</Card.Title>
              <p className="card-category" style={{ textAlign: 'center' }}>Daftar semua jalan yang tersedia</p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table
                className="table-hover table-striped"
                style={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  margin: '0',
                  borderCollapse: 'collapse',
                  width: '100%',
                }}
              >
                <thead
                  style={{
                    backgroundColor: 'rgba(187, 191, 202, 0.75)',
                    color: '#333',
                    textAlign: 'center',
                  }}
                >
                  <tr>
                    <td style={{  textAlign: 'center' , padding: '12px', width: '5%' }}>No</td>
                    <td style={{  textAlign: 'center' , padding: '12px', width: '5%' }}>Nama Jalan</td>
                    <td style={{  textAlign: 'center' , padding: '12px', width: '5%' }}>Kondisi Jalan</td>
                    <td style={{  textAlign: 'center' , padding: '12px', width: '5%' }}>Maps</td>
                    <td style={{  textAlign: 'center' , padding: '12px', width: '5%' }}>Action</td>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: '#fff' }}>
                  {jalans.map((jalan, index) => (
                    <tr key={jalan.id}>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{index + 1}.</td>
                      <td style={{ padding: '12px', fontWeight: '600', textAlign: 'center' }}>{jalan.nama}</td>
                      <td style={{ padding: '12px', fontWeight: '500', textAlign: 'center' }}>{jalan.kondisi}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <Link
                          to="/user/maps"
                          style={{ color: '#4285F4', textDecoration: 'none' }}
                        >
                          Lihat Peta
                        </Link>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(jalan.id)}
                          style={{ borderRadius: '8px', padding: '5px 10px' }}
                        >
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DaftarJalan;
