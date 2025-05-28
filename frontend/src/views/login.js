import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import API_URL from '../config/apiConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/auth.css';
import loginImage from '../assets/img/login.png';
import Navbars from '../components/Navbars/AdminNavbar';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const { token, user } = data;

                if (token && user) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    setUser && setUser(user); // ✅ Update state parent jika ada

                    if (user.role === 0) {
                        history.push('/admin/dashboard');
                    } else if (user.role === 1) {
                        history.push('/user/dashboarduser');
                    } else {
                        setErrorMessage('Unknown role. Access denied.');
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                    }
                } else {
                    setErrorMessage('Login failed. Invalid response from server.');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            } else {
                setErrorMessage(data.message || 'Login failed. Please check your credentials.');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('An error occurred. Please try again later.');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    };

    return (
        <>
            <Navbars />
            <section className="vh-100">
                <div className="container-fluid">
                    <div className="row">
                        {/* Left Column: Login Form */}
                        <div className="col-sm-6 text-black" style={{ backgroundColor: '#BBBFCA' }}>
                            <div className="px-5 ms-xl-4">
                                <i className="" style={{ color: '#709085' }}></i>
                            </div>

                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                                <form style={{ width: '23rem' }} onSubmit={handleLogin}>
                                    <h3
                                        className="fw-normal mb-3 pb-3"
                                        style={{
                                            letterSpacing: '1px',
                                            color: '#fff' ,  fontFamily: 'Raleway, sans-serif'
                                        }}
                                    >
                                        Log in
                                    </h3>

                                    <div className="form-outline mb-4">
                                        <label
                                            className="form-label"
                                            htmlFor="form2Example18"
                                            style={{ color: '#fff' , fontFamily: 'Raleway, sans-serif' }} 
                                        >
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            id="form2Example18"
                                            className="form-control form-control-lg"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label
                                            className="form-label"
                                            htmlFor="form2Example28"
                                            style={{ color: '#fff' ,  fontFamily: 'Raleway, sans-serif' }} // Mengubah warna teks label ke oranye
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="form2Example28"
                                            className="form-control form-control-lg"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="pt-1 mb-4">
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
                                        Login
                                    </Button>
                                    </div>


                                    {errorMessage && (
                                        <Alert variant="danger" className="mt-3">
                                            {errorMessage}
                                        </Alert>
                                    )}

                                    <p className="small mb-5 pb-lg-2">
                                        <a className="text-muted" href="#!">
                                            Forgot password?
                                        </a>
                                    </p>
                                    <p>
                                        Don't have an account?{' '}
                                        <Link to="/register" className="nav-link" style={{ color: '#2196F3' , fontFamily: 'Raleway, sans-serif'  }}>
                                            Register Here
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>

                        {/* Right Column: Image */}
                        <div className="col-sm-6 px-0 d-none d-sm-block">
                        <img
                        src={loginImage}
                        className="w-100 vh-100"
                        style={{ objectFit: 'cover' }}
                        alt="Login"
                        />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Login;