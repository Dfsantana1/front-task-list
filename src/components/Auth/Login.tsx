import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Row, Col, Alert, Spinner, Form } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import FormField from '../FormField';

const Login: React.FC = () => {
  const { login, isLoading, error } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      login(values);
    }
  });

  // Formatea el mensaje de error
  const errorMessage = typeof error === 'string' ? error : (error as any)?.message || 'An unexpected error occurred';

  return (
    <Container className="full-height full-with d-flex align-items-center justify-content-center p-3">
      <Row   className="d-flex align-items-center justify-content-center border border-primary rounded p-4 shadow-sm bg-light">
        <Col md="12">
          <h1 className="text-center">Sign In</h1>
          <Form onSubmit={formik.handleSubmit}>
            <FormField
              label="Email address"
              type="email"
              name="email"
              placeholder="Enter email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={(formik.touched.email ?? false) && !!formik.errors.email}
              errorMessage={formik.touched.email ? formik.errors.email : ''}
            />
            <FormField
              label="Password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={(formik.touched.password ?? false) && !!formik.errors.password}
              errorMessage={formik.touched.password ? formik.errors.password : ''}
            />
          {error && <Alert variant="danger">{errorMessage}</Alert>}
            <Button variant="primary" type="submit" className="w-100 mt-3" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" /> : 'Sign In'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
