import React, { useState } from "react";
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'; 

function App() {
  const [currentForm, setCurrentForm] = useState('home'); 

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">

      {/* Renderiza el componente correspondiente según el valor de currentForm */}
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : 
        currentForm === "register" ? <Register onFormSwitch={toggleForm} /> : 
        <Home />
      }
    </div>
  );
}

export default App;



