import React, { useState, useEffect } from 'react';
import API_URL from '../config/apiConfig';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap'; // Pastikan Row dan Col diimport
import { useParams, useHistory } from 'react-router-dom';

const UpdateJalan = () => {
    const { id } = useParams(); // Mendapatkan ID dari URL
    const [nama, setNama] = useState('');
    const [kondisi, setKondisi] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    // Fetch data jalan berdasarkan ID saat komponen di-mount
    useEffect(() => {
        const fetchJalan = async () => {
            try {
                const response = await fetch(`${API_URL}/jalan/jalan/${id}`);
                if (!response.ok) {
                    throw new Error("Jalan tidak ditemukan");
                }
                const data = await response.json();
                setNama(data.nama);
                setKondisi(data.kondisi);
            } catch (error) {
                setError('Gagal mengambil data jalan');
                console.error("Error fetching data jalan:", error);
            }
        };
        fetchJalan();
    }, [id]);

    // Handle update jalan
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/jalan/jalan/${id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nama,
                    kondisi,
                }),
            });

            if (!response.ok) {
                throw new Error("Gagal memperbarui data jalan");
            }

            alert('Jalan berhasil diperbarui!');
            history.push('/jalan'); 
        } catch (error) {
            setError('Gagal memperbarui jalan');
            console.error('Gagal memperbarui jalan:', error);
        }
    };

    return (
        <Container fluid style={{ fontFamily: 'Raleway, sans-serif' }}>
            <Row>
                <Col md="8">
                    {/* Error Alert */}
                    {error && <Alert variant="danger">{error}</Alert>}

                    {/* Form dalam kotak */}
                    <Card style={{ padding: '2rem', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <Card.Header style={{ border: 'none', paddingBottom: '1rem' }}>
                            <Card.Title as="h4">Perbarui Jalan</Card.Title>
                        </Card.Header>
                        <Form onSubmit={handleUpdate}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nama Jalan</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan nama jalan"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    required
                                    style={{
                                        borderRadius: '10px',
                                        padding: '10px',
                                        fontFamily: 'Raleway, sans-serif',
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Kondisi Jalan (Opsional)</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan kondisi jalan"
                                    value={kondisi}
                                    onChange={(e) => setKondisi(e.target.value)}
                                    style={{
                                        borderRadius: '10px',
                                        padding: '10px',
                                        fontFamily: 'Raleway, sans-serif',
                                    }}
                                />
                            </Form.Group>
                            <Button
                                variant="info"
                                type="submit"
                                style={{
                                    borderRadius: '20px',
                                    backgroundColor: '#76898A', // Button color
                                    color: 'white',
                                    padding: '12px 30px',
                                    border: 'none',
                                    fontWeight: 'bold',
                                }}
                            >
                                Perbarui Jalan
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateJalan;
