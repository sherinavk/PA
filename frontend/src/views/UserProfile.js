import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Image } from "react-bootstrap";
import API_URL from "../config/apiConfig";

function User() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [username, setUsername] = useState(storedUser?.username || "");
  const [email] = useState(storedUser?.email || "");
  const [firstName, setFirstName] = useState(storedUser?.firstName || "");
  const [lastName, setLastName] = useState(storedUser?.lastName || "");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(storedUser?.avatar || "");

  // Handle Avatar Change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file); // Keep the file for upload
      setAvatarPreview(URL.createObjectURL(file)); // For preview only
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("username", username);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      if (avatarFile) {
        formData.append("avatar", avatarFile); // Append avatar file if selected
      }

      const response = await fetch(`${API_URL}/users/${storedUser.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Profile updated successfully.");
        const updatedUser = { ...storedUser, username, firstName, lastName };
        if (data.user?.avatar) {
          updatedUser.avatar = data.user.avatar;
        }
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        setError(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Update error:", err);
      setError("An error occurred.");
    }
  };

  return (
    <Container fluid className="py-4 px-4" style={{ maxWidth: "900px" }}>
      <Card className="mb-3" style={{ borderRadius: "10px", padding: "1.5rem" }}>
        <Row className="align-items-center">
          <Col xs="auto">
            <Image
              src={avatarPreview || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              roundedCircle
              width="50"
              height="50"
              alt="Avatar"
            />
            <Form.Group className="mt-2">
              <Form.Label>Change Avatar</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="avatar"
                onChange={handleAvatarChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      <Card style={{ borderRadius: "10px", padding: "1.5rem" }}>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} disabled />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Change Password?</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="New Password"
                  disabled
                  style={{ backgroundColor: "#f7f7f7" }}
                />
              </Form.Group>
            </Col>
          </Row>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <div className="text-end">
            <Button
              type="submit"
              className="btn btn-dark mt-2"
              style={{ borderRadius: "20px", padding: "8px 20px" }}
            >
              Save
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default User;
