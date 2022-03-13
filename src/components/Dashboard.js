import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";
import MainArea from "./MainArea";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');

    try{
      await logout();
      navigate("/");
    }
    catch(error) {
      setError("Logout: " + error.message);
    }
  }

  return currentUser ? (
    <>
      <Card className="mt-5">
        <Card.Header>
          <h2>
            Hello <strong>{currentUser.email}</strong>
          </h2>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </Card>
      <MainArea />
    </>
  ) : (
    <Navigate to="/login" />
  );
}