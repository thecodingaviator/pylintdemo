import React, { createRef, useState } from 'react';
import {
  Form, Button, Card, Alert,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { login } = useAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError('');
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (err) {
      setError(error.message);
    }

    setLoading(false);
  }

  return (
    <>
      <Card className="text-center mt-5">
        <Card.Header>
          <h2>
            Log In
          </h2>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" id="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
            </Form.Group>
            <Form.Group controlId="password" id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control ref={passwordRef} type="password" placeholder="Enter password" required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
              Login!
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            Forgot password?
            {' '}
            <Link to="/forgot-password">Here</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        New?
        {' '}
        <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
}
