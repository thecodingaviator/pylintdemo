import React, { useState } from 'react';
import {
  Card, Button, Alert, Row, Col,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Editor from './Editor';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      navigate('/');
    } catch (err) {
      setError(`Logout: ${err.message}`);
    }
  }

  return (
    <>
      <Row>
        <Col md={{ span: 6 }}>
          <Card className="text-center mt-5">
            <Card.Header>
              <h4>
                Dashboard
                {' '}
                <strong>{currentUser.email}</strong>
              </h4>
            </Card.Header>
            <Card.Body>
              Paste your code below
            </Card.Body>
          </Card>
        </Col>
        <Col md={{ span: 4, offset: 2 }}>
          <Card className="mt-5 float-right">
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Link to="/update-profile" className="btn btn-primary w-100 mt-1">
                Update Profile
              </Link>
              <Button onClick={handleLogout} className="btn btn-primary w-100 mt-3">
                Log out
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Editor />
    </>
  );
}
