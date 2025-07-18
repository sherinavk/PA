import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const API_URL_1 = "http://localhost:5000/api";

function DaftarJalan() {
  const [filteredJalans, setFilteredJalans] = useState([]);
  const [jalans, setJalans] = useState([]);
  const [selectedNamaJalan, setSelectedNamaJalan] = useState("All Streets");
  const history = useHistory();

  // Fetch data jalan dari backend
  useEffect(() => {
    fetch(`${API_URL_1}/sensor/sensor_data`)
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(data => {
        setJalans(data);
        setFilteredJalans(data); // default tampil semua
      })
      .catch(error => console.error("Terjadi kesalahan saat mengambil data jalan:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL_1}/sensor/sensor/${id}`, {
        method: 'DELETE',
      });
      const updatedJalans = jalans.filter((jalan) => jalan.id !== id);
      setJalans(updatedJalans);
      setFilteredJalans(updatedJalans);
      alert('Data deleted successfully!');
    } catch (error) {
      console.error('Delete fail, because:', error);
    }
  };

  const handleViewMap = (jalan) => {
    history.push({
      pathname: '/admin/maps',
      state: {
        latitude: jalan.latitude,
        longitude: jalan.longitude,
        nama: jalan.nama,
        kondisi: jalan.kondisi,
        waktu: jalan.created_at,
      }
    });
  };

  const handleUpdateRoad = (jalan) => {
    // Redirect langsung ke URL dengan id
    history.push(`/admin/jalan/update/${jalan.id}`);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedNamaJalan(value);

    if (value === "All Roads") {
      setFilteredJalans(jalans);
    } else {
      const filtered = jalans.filter(jalan => jalan.nama === value);
      setFilteredJalans(filtered);
    }
  };

  // Ambil semua nama jalan unik untuk dropdown
  const uniqueNamaJalan = [...new Set(jalans.map(jalan => jalan.nama))];

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
            <Card.Header style={{ border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Card.Title as="h4" style={{ textAlign: 'left' }}>Road List</Card.Title>
                <p className="card-category" style={{ textAlign: 'left' }}>List all available paths</p>
              </div>
              {/* Dropdown Filter */}
              <Form.Group controlId="namaJalanSelect" style={{ margin: 0 }}>
                <Form.Select
                  value={selectedNamaJalan}
                  onChange={handleFilterChange}
                  style={{
                backgroundColor: '#f8f9fa',
                border: '1.5px solid #adb5bd',
                borderRadius: '10px',
                padding: '12px 16px',
                color: '#495057',
                fontSize: '1rem',
                fontWeight: '500',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                transition: 'all 0.3s ease',
                marginLeft: '1rem'
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow =
                  '0 0 0 4px rgba(173, 181, 189, 0.3)')
              }
              onBlur={(e) =>
                (e.target.style.boxShadow =
                  '0 2px 8px rgba(0, 0, 0, 0.03)')
              }
                >
                  <option>All Roads</option>
                  {uniqueNamaJalan.map((nama, idx) => (
                    <option key={idx} value={nama}>{nama}</option>
                  ))}
                </Form.Select>
              </Form.Group>
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
                    <td style={{ padding: '12px', width: '5%' }}>No</td>
                    <td style={{ padding: '12px', width: '25%' }}>Road Name</td>
                    <td style={{ padding: '12px', width: '20%' }}>Road Condition</td>
                    <td style={{ padding: '12px', width: '15%' }}>Maps</td>
                    <td style={{ padding: '12px', width: '15%' }}>Update</td>
                    <td style={{ padding: '12px', width: '15%' }}>Delete</td>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: '#fff' }}>
                  {filteredJalans.map((jalan, index) => (
                    <tr key={jalan.id}>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{index + 1}.</td>
                      <td style={{ padding: '12px', fontWeight: '600', textAlign: 'center' }}>{jalan.nama}</td>
                      <td style={{ padding: '12px', fontWeight: '500', textAlign: 'center' }}>{jalan.kondisi}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <Button
                          variant="link"
                          onClick={() => handleViewMap(jalan)}
                        >
                          Location
                        </Button>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <Button
                          variant="warning"
                          onClick={() => handleUpdateRoad(jalan)}
                        >
                          Update
                        </Button>
                      </td>
                     <td style={{ padding: '12px', textAlign: 'center' }}>
                      <Button
                        variant="danger"
                        onClick={() => {
                          const confirmDelete = window.confirm(
                            `⚠️ Are you sure?`
                          );
                          if (confirmDelete) {
                            handleDelete(jalan.id);
                          }
                        }}
                      >
                        Delete
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
