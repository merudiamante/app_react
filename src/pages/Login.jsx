import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPass] = useState(''); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [token, setToken] = useState(''); 
    const [user, setUser] = useState(null); 
    const [message, setMessage] = useState('');  

    useEffect(() => {
        const savedToken = localStorage.getItem('token'); 
        if (savedToken) {
            setToken(savedToken); 
            fetchUser(savedToken); 
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Verificar si los campos están vacíos
        if (!email || !password) {
            setMessage('Todos los campos son requeridos.');
            return;
        }

        try {
            const response = await axios.post('https://f570-181-229-4-119.ngrok-free.app/token', { email, password });
            setToken(response.data.access_token); 
            localStorage.setItem('token', response.data.access_token); 
            fetchUser(response.data.access_token); 
            setIsLoggedIn(true); 
            setMessage('Logueo exitoso!');  // Establece el mensaje de éxito
        } catch (error) {
            console.error('Error', error); 
            setMessage('Error al iniciar sesión. Verifique sus credenciales.');
        }
    };

    const fetchUser = async (token) => {
        try {
            const response = await axios.get('https://f570-181-229-4-119.ngrok-free.app/me', {
                headers: { 
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json, text/plain, */*',
                    "ngrok-skip-browser-warning": "69420"
                }
            });
            setUser(response.data); 
        } catch (error) {
            console.error('Error fetching user', error); 
        }
    };

    if (isLoggedIn) {
        return <Navigate to="/home" replace />;
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="youremail@gmail.com"
                    id="email"
                    name="email"
                />
                <label htmlFor="password">Contraseña:</label>
                <input
                    value={password}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                />
                <button type="submit">Login</button>
            </form>
            {message && <p className={`message ${isLoggedIn ? 'success' : 'error'}`}>{message}</p>} 
            
            <Link to="/register" className="link-btn">No tienes una cuenta? Regístrate aquí.</Link>
        </div>
    );
};

export default Login;
