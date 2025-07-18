import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { useLocation, useHistory, useParams } from 'react-router-dom';

const API_URL_1 = "http://localhost:5000/api";

const UpdateJalan = () => {
  const location = useLocation();
  const history = useHistory();
  const { id: paramId } = useParams();
  const jalanData = location.state; // Data dari DaftarJalan
  const [id] = useState(jalanData?.id || paramId);
  const [nama_jalan, setNama_jalan] = useState(jalanData?.nama_jalan || '');
  const [kondisi, setKondisi] = useState(jalanData?.kondisi || '');
  const [message, setMessage] = useState(null);

  

  useEffect(() => {
    if (!jalanData) {
      fetch(`${API_URL_1}/sensor/sensor/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Gagal mengambil data');
          return res.json();
        })
        .then(data => {
          console.log("📦 Data fetched:", data);
          setNama_jalan(data.nama_jalan || '');
          setKondisi(data.kondisi || '');
        })
        .catch(err => {
          console.error('❌ Error fetch:', err);
          setMessage({ type: 'danger', text: 'Gagal memuat data jalan.' });
        });
    }
  }, [jalanData, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("📤 Payload dikirim:", { nama_jalan: nama_jalan, kondisi: kondisi });
    console.log("🆔 ID yang dikirim:", id);

      try {
        const response = await fetch(`http://localhost:5000/api/sensor/sensor/update/${id}=`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nama_jalan: nama_jalan, 
            kondisi: kondisi
          }),
        });


        if (!response.ok) {
          const errText = await response.text();
          throw new Error('Update gagal: ' + errText);
        }else {
      }
        alert('✅ Data jalan berhasil diperbarui!');
        history.push('/admin/table');
      } catch (err) {
        console.error('❌ Error update:', err);
        setMessage({ type: 'danger', text: 'Gagal memperbarui jalan.' });
    }
  };

  return (
  <Container fluid>
  <Row className="justify-content-center">
    <Col md="8">
      {message && (
        <Alert
          variant={message.type}
          style={{
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            fontSize: '1rem',
            fontWeight: '500',
            color: '#495057',
          }}
        >
          {message.text}
        </Alert>
      )}
      <Card
        className="p-4 mt-5"
        style={{
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: 'none',
        }}
      >
        <Card.Header
          className="pb-3"
          style={{
            borderBottom: '1px solid #dee2e6',
            borderRadius: '16px 16px 0 0',
            marginBottom: '1rem'
          }}
        >
          <Card.Title
            as="h3"
            style={{
              fontWeight: '600',
              color: '#343a40',
              letterSpacing: '0.8px',
            }}
          >
            Update Road Information
          </Card.Title>
        </Card.Header>
        <Form onSubmit={handleSubmit}>
          {/* Street Name */}
          <Form.Group className="mb-4">
            <Form.Label
              style={{
                fontWeight: '500',
                color: '#495057',
                fontSize: '1.05rem',
                marginBottom: '8px',
              }}
            >
              Road Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter street name"
              value={nama_jalan}
              onChange={(e) => setNama_jalan(e.target.value)}
              required
              style={{
                borderRadius: '10px',
                padding: '12px 16px',
                border: '1.5px solid #adb5bd',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                fontSize: '1rem',
              }}
            />
          </Form.Group>

          {/* Road Condition */}
          <Form.Group className="mb-4">
            <Form.Label
              style={{
                fontWeight: '500',
                color: '#495057',
                fontSize: '1.05rem',
                marginBottom: '8px',
              }}
            >
              Road Condition: 
            </Form.Label>
            <Form.Select
              value={kondisi}
              onChange={(e) => setKondisi(e.target.value)}
              required
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
              <option value="">-- Choose Category --</option>
              <option value="tidak_rusak">Tidak Rusak</option>
              <option value="rusak_ringan">Rusak Ringan</option>
              <option value="rusak_sedang">Rusak Sedang</option>
              <option value="rusak_berat">Rusak Berat</option>
            </Form.Select>
          </Form.Group>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-100 mt-3"
            style={{
              backgroundColor: '#6c757d',
              border: 'none',
              borderRadius: '10px',
              padding: '12px 0',
              fontWeight: '600',
              fontSize: '1.1rem',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = '#5a6268')
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = '#6c757d')
            }
            onMouseDown={(e) =>
              (e.target.style.transform = 'scale(0.97)')
            }
            onMouseUp={(e) =>
              (e.target.style.transform = 'scale(1)')
            }
          >
            Update Road
          </Button>
        </Form>
      </Card>
    </Col>
  </Row>
  </Container>


  );
};

export default UpdateJalan;
