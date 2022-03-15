import React, { createRef, useState } from 'react';
import {
  Form, Button, Card, Alert, Row, Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {
  const emailRef = createRef();
  const { resetPassword } = useAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setMessage('');
      setLoading(true);
      setError('');
      await resetPassword(emailRef.current.value);
      setMessage('Check your email for a password reset link.');
    } catch (err) {
      setError('Failed to reset password');
    }

    setLoading(false);
  }

  return (
    <>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Card className="text-center mt-5">
            <Card.Header>
              <h2>
                Reset Password
              </h2>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" id="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
                  Reset password
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                Login?
                {' '}
                <Link to="/">Here</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="w-100 text-center mt-2">
        New?
        {' '}
        <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
}
