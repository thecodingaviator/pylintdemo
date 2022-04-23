import React, { createRef, useState } from 'react';
import {
  Form, Button, Card, Alert, Col, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Signup() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmRef = createRef();
  const { signup } = useAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    if (!emailRef.current.value.endsWith('.edu')) {
      return setError('You must use .edu email');
    }

    try {
      setLoading(true);
      setError('');
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="text-center mt-5">
            <Card.Header>
              <h2>
                Sign Up
              </h2>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" id="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group controlId="password" id="password" className="mt-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control ref={passwordRef} type="password" placeholder="Enter password" required />
                </Form.Group>
                <Form.Group controlId="password-confirm" id="password-confirm" className="mt-2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control ref={passwordConfirmRef} type="password" placeholder="Confirm password" required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
                  Sign up!
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="w-100 text-center mt-3">
        Already have an account?
        {' '}
        <Link to="/login">Login</Link>
      </div>
    </>
  );
}
