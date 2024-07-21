import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { Container } from 'react-bootstrap';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register'; // Importar el componente Register
import Header from './components/layout/Header';
import Footer from './components/layout/Footer'; // Asegúrate de que esta ruta sea correcta
import { QueryClient } from 'react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="d-flex flex-column min-vh-100"> {/* Contenedor principal que ocupa toda la altura */}
          <Header /> {/* Agrega el Header aquí */}
          <Container className="flex-grow-1 mt-4"> {/* Flex-grow hace que el contenedor principal ocupe el espacio restante */}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> {/* Nueva ruta para el registro */}
              {/* Puedes agregar más rutas aquí */}
            </Routes>
          </Container>
          <Footer /> {/* Agrega el Footer aquí */}
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
