import React from "react";
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Header component can go here (optional) */}

        {/* Rutas para el Login, Register y para el Home*/}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mis-datos" element={<EditUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;



