import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Form, Alert } from 'react-bootstrap';
import api from '../../api/axios'; // Usa la instancia de axios desde api
import { useNavigate, useParams } from 'react-router-dom';
import { Task } from '../../interfaces/Task';

interface CreateEditTaskProps {
  task?: Task;
}

const CreateEditTask: React.FC<CreateEditTaskProps> = ({ task }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const [priority, setPriority] = useState<'1' | '2' | '3'>(task?.priority || '1');
  const [status, setStatus] = useState<'Incomplete' | 'Complete'>(task?.status || 'Incomplete');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  // Lógica para obtener una tarea para edición, si es necesario
  useEffect(() => {
    if (id && !task) {
      const fetchTask = async () => {
        try {
          const response = await api.get(`/tasks/${id}`); // Usa api en lugar de axios
          const taskData: Task = response.data;
          setTitle(taskData.title);
          setDescription(taskData.description);
          setDueDate(taskData.dueDate);
          setPriority(taskData.priority);
          setStatus(taskData.status);
        } catch (error) {
          setError('Failed to fetch task.');
        }
      };

      fetchTask();
    }
  }, [id, task]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (id) {
        // Editar tarea existente
        await api.put(`/tasks/${id}`, { // Usa api en lugar de axios
          title,
          description,
          dueDate,
          priority,
          status,
        });
        setSuccess('Task updated successfully!');
      } else {
        // Crear nueva tarea
        await api.post('/tasks', { // Usa api en lugar de axios
          title,
          description,
          dueDate,
          priority,
          status,
          userId: 1, // Puedes ajustar esto según el contexto
        });
        setSuccess('Task created successfully!');
      }
      
      navigate('/tasks'); // Redirigir a una página de tareas después de la operación
    } catch (error) {
      setError('Failed to save task.');
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} className="offset-md-2">
          <h1>{id ? 'Edit Task' : 'Create New Task'}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="dueDate" className="mt-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="priority" className="mt-3">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                value={priority}
                onChange={(e) => setPriority(e.target.value as '1' | '2' | '3')}
                required
              >
                <option value="1">1 - Low</option>
                <option value="2">2 - Medium</option>
                <option value="3">3 - High</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="status" className="mt-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Incomplete' | 'Complete')}
                required
              >
                <option value="Incomplete">Incomplete</option>
                <option value="Complete">Complete</option>
              </Form.Control>
            </Form.Group>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}

            <Button variant="primary" type="submit" className="mt-3">
              {id ? 'Update Task' : 'Create Task'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateEditTask;
