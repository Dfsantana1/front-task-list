import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { Container } from 'react-bootstrap';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
// import Dashboard from './components/Dashboard';
// import PrivateRoute from './components/PrivateRoute';
import { QueryClient } from 'react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <Container className="flex-grow-1 mt-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} path="/dashboard" />} /> */}
              {/* Agrega más rutas aquí */}
            </Routes>
          </Container>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
