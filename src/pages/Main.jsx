import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css'; 

const Main = () => {
  return (
    <div className="main-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <Link to="/register">Registrar</Link>
        <Link to="/login">Iniciar Sesión</Link>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <h1>Bienvenido a la App de Películas</h1>
      </div>
    </div>
  );
};

export default Main;

