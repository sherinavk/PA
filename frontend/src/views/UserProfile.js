import React, { useEffect, useState } from "react";
import { Button, Card, Form, Container, Row, Col, Alert,  } from "react-bootstrap";
import API_URL from "../config/apiConfig";

function User() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [username, setUsername] = useState(storedUser?.username || "");
  const [firstName, setFirstName] = useState(storedUser?.firstName || "");
  const [lastName, setLastName] = useState(storedUser?.lastName || "");
  const [email, setEmail] = useState(storedUser?.email || "");
  const [profilePicture, setProfilePicture] = useState(storedUser?.photo || "");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');

  const API_URL_1 = "http://localhost:5000";
  const API_URL_2 = "http://localhost:5000/api"

  useEffect(() => {
    // You can fetch additional info here if needed
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/users/${storedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, firstName, lastName }),
      });

      console.log("📤 Payload dikirim:", { username, firstName, lastName });

      const data = await response.json();

      if (response.ok) {
        setMessage("Profile updated successfully.");
        const updatedUser = { ...storedUser, username, firstName, lastName };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.alert("Profile updated successfully!");
      } else {
        setError(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Update error:", err);
      setError("An error occurred.");
    }
  };


  

  const handleProfilePictureChange = async (e) => {
    const formData = new FormData();
    formData.append("profilePicture", e.target.files[0]);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL_2}/users/${storedUser.id}/profile-picture`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Profile picture updated successfully.");
        const updatedUser = { ...storedUser, photo: data.profilePicture };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setProfilePicture(data.profilePicture);
      } else {
        setError(data.message || "Failed to update profile picture.");
      }
    } catch (err) {
      console.error("Update error:", err);
      setError("An error occurred while uploading the profile picture.");
    }
  };

 return (
  <Container fluid className="p-4 bg-gray-100 min-h-screen">
  <Row className="justify-content-center">
    <Col lg={10}>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <Row>
          {/* Kiri: Foto dan nama */}
          <Col md={4} className="text-center border-end py-4">
            <img
              src={profilePicture ? `${API_URL_1}${profilePicture}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              roundedCircle
              style={{
                width: '125px',
                height: '125px',
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              className="mb-3"
            />
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{username || "Username"}</p>
          </Col>

          {/* Kanan: Form */}
          <Col md={8}>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} disabled />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      type="text"
                      required
                      style={{
                        borderRadius: '5px',
                        padding: '12px 20px',
                        borderColor: '#ddd',
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      type="text"
                      style={{
                        borderRadius: '5px',
                        padding: '12px 20px',
                        borderColor: '#ddd',
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      type="text"
                      style={{
                        borderRadius: '5px',
                        padding: '12px 20px',
                        borderColor: '#ddd',
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
  <Col md={12}>
    <Form.Group className="mb-3">
      <Form.Label>Change Picture?</Form.Label>
      <div className="d-flex align-items-center">
        {/* Hidden native file input */}
        <Form.Control
          id="profilePictureInput"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          style={{ display: 'none' }}
        />

        {/* Custom Button */}
        <Button
          variant="secondary"
          onClick={() => document.getElementById('profilePictureInput').click()}
          style={{
            padding: '8px 20px',
            borderRadius: '5px',
            marginRight: '10px',
          }}
        >
          Choose Picture
        </Button>
                  {/* Display selected file name */}
                  <span id="selectedFileName" style={{ color: '#6c757d' }}>
                    {selectedFileName}
                  </span>
                </div>
              </Form.Group>
            </Col>
           </Row>
             {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              <Button type="submit" className="mt-3 float-end" style={{
                backgroundColor: '#495464',
                color: 'white',
                borderRadius: '5px', 
                padding: '10px 30px', 
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Shadow halus
              }}>
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </Col>
  </Row>
</Container>

);

}

export default User;
