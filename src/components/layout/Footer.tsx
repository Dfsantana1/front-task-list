import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto">
      <Container className="p-3">
        <Row>
          <Col>
            <p className="mb-0">© 2024 My Task App. All rights reserved.</p>
          </Col>
          <Col>
            <a href="/about" className="text-dark">About</a> | <a href="/contact" className="text-dark">Contact</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
