import React from "react";
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditUser from "./pages/EditUser";
import Main from "./pages/Main";
import Favorites from './pages/Favorites';
import DetailFavorites from "./pages/DetailFavorites";

function App() {
  const token = localStorage.getItem('token'); 

  return (
    <BrowserRouter>
      <div className="App">
        {/* Header(optional)*/}

        {/* Rutas para el Login, Register y para el Home*/}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mis-datos" element={<EditUser />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route
            path="/detail-favorite/:id"
            element={<DetailFavorites token={token} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
