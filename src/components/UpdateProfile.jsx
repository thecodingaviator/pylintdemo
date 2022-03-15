import React, { createRef, useState } from 'react';
import {
  Form, Button, Card, Alert,
} from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function UpdateProfile() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmRef = createRef();
  const { updateEmail, updatePassword, currentUser } = useAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    setError('');
    setMessage('');

    const promises = [];
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises).then(() => {
      setMessage('Profile updated successfully');
    }).catch((err) => {
      setError(err.message);
    }).finally(() => {
      setLoading(false);
    });
  }

  return currentUser ? (
    <>
      <Card className="text-center mt-5">
        <Card.Header>
          <h2>
            Update Profile
          </h2>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" id="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="Enter email"
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group controlId="password" id="password" className="mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control ref={passwordRef} type="password" placeholder="Leave blank to keep same" />
            </Form.Group>
            <Form.Group controlId="password-confirm" id="password-confirm" className="mt-2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control ref={passwordConfirmRef} type="password" placeholder="Leave blank to keep same" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Link to="/" className="btn btn-primary w-100 mt-5">Go back</Link>
    </>
  ) : <Navigate to="/" />;
}
