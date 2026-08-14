import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AuthProvider } from './context/AuthContext';
import { CareerProvider } from './context/CareerContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CareerProvider>
        <App />
      </CareerProvider>
    </AuthProvider>
  </React.StrictMode>
);
