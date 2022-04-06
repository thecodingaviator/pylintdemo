import React from 'react';

import { Container } from 'react-bootstrap';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';
import UserData from './components/UserData';
import MarkdownEditor from './components/MarkdownEditor';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';

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
              {/* Public pages */}
              <Route
                path="/signup"
                element={(
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                )}
              />
              <Route
                path="/login"
                element={(
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                )}
              />
              <Route
                path="/forgot-password"
                element={(
                  <PublicRoute>
                    <ForgotPassword />
                  </PublicRoute>
              )}
              />

              {/* Non auth pages */}
              <Route path="/view/:userID" element={<UserData />} />

              {/* Private pages */}
              <Route
                exact
                path="/"
                element={(
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                )}
              />
              <Route
                path="/update-profile"
                element={(
                  <ProtectedRoute>
                    <UpdateProfile />
                  </ProtectedRoute>
                )}
              />
              <Route
                path="/markdown-editor"
                element={(
                  <ProtectedRoute>
                    <MarkdownEditor />
                  </ProtectedRoute>
                )}
              />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
