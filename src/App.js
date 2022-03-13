import { Container } from 'react-bootstrap';

import MainArea from './components/MainArea.js';
import Signup from './components/Signup.js';
import { AuthProvider } from './contexts/AuthContext.js';

function App() {
  return (
    <AuthProvider>
      <Container className="d-flex align-items-center
    justify-content-center"
        style={{ minHeight: '100vh' }}>
        <div className="w-100">
          <Signup />
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
