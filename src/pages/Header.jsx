import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

function Header( ) {

   
      return (
        <header>
        <div class="nav-container">
          <ul class="nav-left">
            <li class="nav-item">
              <Link to="/" class="link-btn">Home</Link>
            </li>
            <li class="nav-item">
              <Link to="/favoritos" class="link-btn">Favoritos</Link>
            </li>
            <li class="nav-item">
              <Link to="/mis-datos" class="link-btn">Mis Datos</Link>
            </li>
          </ul>
          <ul class="nav-right">
            <li class="nav-item">
              <Link to="/login" class="link-btn">Iniciar Sesión</Link>
            </li>
          </ul>
        </div>
      </header>
      );
}

export default Header;