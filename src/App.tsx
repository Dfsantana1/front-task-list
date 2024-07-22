import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Container } from 'react-bootstrap';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CreateEditTask from './components/Task/CreateTask';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/PrivateRoute';

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
              <Route path="/tasks/create" element={<PrivateRoute element={<CreateEditTask />} />} />
              <Route path="/tasks/edit/:id" element={<PrivateRoute element={<CreateEditTask />} />} />
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
