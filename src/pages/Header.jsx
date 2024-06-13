import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

function Header( ) {

   
      return (
        <header>
        <div className="nav-container">
          <ul className="nav-left">
            <li className="nav-item">
              <Link to="/" class="link-btn">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/favoritos" class="link-btn">Favoritos</Link>
            </li>
            <li className="nav-item">
              <Link to="/mis-datos" class="link-btn">Mis Datos</Link>
            </li>
          </ul>
          <ul className="nav-right">
            <li className="nav-item">
              <Link to="/login" class="link-btn">Iniciar Sesión</Link>
            </li>
          </ul>
        </div>
      </header>
      );
}

export default Header;