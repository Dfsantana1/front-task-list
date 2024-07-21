import React from 'react';
import { Form } from 'react-bootstrap';

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
  errorMessage?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, type, name, placeholder, value, onChange, onBlur, isInvalid, errorMessage }) => (
  <Form.Group controlId={`formBasic${name}`}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      isInvalid={isInvalid}
    />
    <Form.Control.Feedback type="invalid">
      {errorMessage}
    </Form.Control.Feedback>
  </Form.Group>
);

export default FormField;
