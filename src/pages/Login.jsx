import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar los datos de inicio de sesión al servidor y autenticar al usuario

        // Simulación de inicio de sesión exitoso
        setIsLoggedIn(true);
    }

    // Si el usuario ya está autenticado, redirigirlo a la página de inicio
    if (isLoggedIn) {
        return <Navigate to="/register" replace />;
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Contraseña:</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Login</button>
            </form>
            {/* Enlace para redirigir al usuario a la página de registro */}
            <button className="link-btn">
                <Link to="/register">No tienes una cuenta? Regístrate aquí.</Link>
            </button>
        </div>
    );
}

export default Login;

