import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Button, Form } from 'react-bootstrap';

function DaftarJalan() {
  const [jalans, setJalans] = useState([]);
  const [filteredJalans, setFilteredJalans] = useState([]);
  const [namaJalanList, setNamaJalanList] = useState([]);
  const [selectedJalan, setSelectedJalan] = useState("All");
  const history = useHistory();
  const API_URL_1 = "http://localhost:5000/api";

  useEffect(() => {
    fetch(`${API_URL_1}/sensor/sensor_data`)
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(data => {
        setJalans(data);
        setFilteredJalans(data);
        // Ambil daftar nama jalan unik
        const uniqueNamaJalan = ["All", ...new Set(data.map(j => j.nama))];
        setNamaJalanList(uniqueNamaJalan);
      })
      .catch(error => {
        console.error("Terjadi kesalahan saat mengambil data jalan:", error);
      });
  }, []);

  const handleViewMap = (jalan) => {
    history.push({
      pathname: '/user/maps',
      state: {
        latitude: jalan.latitude,
        longitude: jalan.longitude,
        nama: jalan.nama,
        kondisi: jalan.kondisi,
        waktu: jalan.created_at,
      },
    });
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedJalan(value);
    if (value === "All") {
      setFilteredJalans(jalans);
    } else {
      const filtered = jalans.filter(j => j.nama === value);
      setFilteredJalans(filtered);
    }
  };

  return (
    <Container fluid style={{ fontFamily: 'Raleway, sans-serif' }}>
      <Row>
        <Col md="12">
          <Card className="mt-2" style={{
            borderRadius: '15px',
            backgroundColor: '#F1F1F1',
            padding: '20px',
            border: 'none',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          }}>
            <Card.Header style={{
              border: 'none',
              background: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <Card.Title as="h3" style={{ fontWeight: 'bold' }}>Road List</Card.Title>
                <p className="card-category" style={{ fontSize: 'medium' }}>
                  List all available paths
                </p>
              </div>
              <Form.Select
                value={selectedJalan}
                onChange={handleFilterChange}
                style={{
                  width: '250px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  padding: '8px',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                {namaJalanList.map((nama, idx) => (
                  <option key={idx} value={nama}>{nama}</option>
                ))}
              </Form.Select>
            </Card.Header>

            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped" style={{
                width: '100%',
                borderCollapse: 'collapse',
                borderRadius: '10px',
                overflow: 'hidden',
              }}>
                <thead style={{
                  backgroundColor: 'rgba(187, 191, 202, 0.75)',
                  color: '#333',
                  textAlign: 'center',
                  borderBottom: '2px solid rgba(0,0,0,0.1)',
                }}>
                  <tr>
                    <td style={{
                      padding: '15px',
                      width: '5%',
                      fontWeight: 'bold',
                      borderTopLeftRadius: '10px',
                    }}>No.</td>
                    <td style={{
                      padding: '15px',
                      width: '35%',
                      fontWeight: 'bold',
                    }}>Road Name</td>
                    <td style={{
                      padding: '15px',
                      width: '35%',
                      fontWeight: 'bold',
                    }}>Road Conditions</td>
                    <td style={{
                      padding: '15px',
                      width: '25%',
                      fontWeight: 'bold',
                      borderTopRightRadius: '10px',
                    }}>Maps</td>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: '#fff' }}>
                  {filteredJalans.map((jalan, index) => (
                    <tr key={jalan.id}>
                      <td style={{
                        padding: '15px',
                        textAlign: 'center',
                        fontSize: '14px',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                      }}>{index + 1}.</td>
                      <td style={{
                        padding: '15px',
                        textAlign: 'center',
                        fontWeight: '600',
                        fontSize: '14px',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                      }}>{jalan.nama}</td>
                      <td style={{
                        padding: '15px',
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: '14px',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                      }}>{jalan.kondisi}</td>
                      <td style={{
                        padding: '15px',
                        textAlign: 'center',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                      }}>
                        <Button
                          variant="link"
                          onClick={() => handleViewMap(jalan)}
                          style={{
                            color: 'black',
                            fontWeight: '600',
                            fontSize: '16px',
                            textDecoration: 'none',
                            padding: '8px 20px',
                            borderRadius: '5px',
                            backgroundColor: '#e0e0e0',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#bdbdbd'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#e0e0e0'}
                        >
                          Lihat Peta
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
