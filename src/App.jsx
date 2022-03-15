import React from 'react';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';
import UserData from './components/UserData';

function App() {
  return (
    <Container
      className="d-flex align-items-center
    justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/view/:userID" element={<UserData />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
