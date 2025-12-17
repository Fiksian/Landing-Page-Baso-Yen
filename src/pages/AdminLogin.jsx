import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if(res.ok) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        navigate('/Admindashboard');
    } else {
        setError(data.message);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }} className="shadow-lg border-0">
        <Card.Body className="p-5 text-center">
          <h3 className="fw-bold mb-4">Admin Login</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Control placeholder="Username" onChange={e => setUsername(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 py-2">Masuk</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;