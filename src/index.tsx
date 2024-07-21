import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambia la importación
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement); // Usa createRoot

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
