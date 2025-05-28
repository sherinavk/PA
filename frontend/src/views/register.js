import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import API_URL from '../config/apiConfig';
import '../assets/css/auth.css';
import registerImage from '../assets/img/login.png'; // Ganti dengan path image sesuai yang kamu upload
import Navbars from '../components/Navbars/AdminNavbar';
import Footer from '../components/Footer/Footer';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [error, setError] = useState('');
    const role = 1;

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmpassword) {
            setError('Password and Confirm Password do not match.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password, role }),
            });

            const data = await response.json();

            if (response.ok) {
                window.location.href = '/admin/dashboard';
            } else {
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            setError('Registration failed. Please try again.');
            console.error('Registration error:', error);
        }
    };

    return (
        <>
            <Navbars />

            <div className="d-flex vh-100">
                {/* Left: Form */}
                <div className="d-flex flex-column justify-content-center align-items-center w-50" style={{ backgroundColor: '#BBBFCA' }}>
                    <Form onSubmit={handleRegister} style={{ width: '80%', maxWidth: '400px' }}>
                        <h3 className="text-white text-center mb-4">Sign Up</h3>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Username :</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Email :</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Password :</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Confirm Password :</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmpassword}
                                onChange={(e) => setConfirmpassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Button
                           
                        type="submit"
                        className="w-100"
                        style={{
                        backgroundColor: '#495464',
                        border: 'none',
                        borderRadius: '999px',
                        fontFamily: 'Raleway, sans-serif',
                        padding: '12px 0',
                        color: '#fff'
                        }}
                                                                   
                        >
                            Submit
                        </Button>
                    </Form>
                </div>

                {/* Right: Image */}
                <div className="w-50 d-none d-md-flex justify-content-center align-items-center bg-white">
                    <img
                        src={registerImage}
                        alt="Register Illustration"
                        style={{ maxWidth: '80%', height: 'auto' }}
                    />
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Register;
