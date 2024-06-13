import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !lastname || !birthday || !email || !password) {
            setError('Todos los campos son requeridos.');
            return;
        }
        try {
            const response = await axios.post('https://f570-181-229-4-119.ngrok-free.app/users', {
                name,
                lastname,
                birthday,
                email,
                password
            });

            if (response.status === 201) {
                const data = response.data;
                localStorage.setItem("userData", JSON.stringify(data));
                localStorage.setItem("token", data.token);
                setError('');
                setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
                setName('');
                setLastName('');
                setBirthday('');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.detail || 'Error al registrar el usuario.');
            } else {
                setError('Error de conexión. Por favor, inténtalo nuevamente.');
            }
            setSuccess('');
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Registro</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre:</label>
                <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Nombre" />
                <label htmlFor="lastname">Apellido:</label>
                <input value={lastname} name="lastname" onChange={(e) => setLastName(e.target.value)} id="lastname" placeholder="Apellido" />
                <label htmlFor="birthday">Fecha de Nacimiento:</label>
                <input value={birthday} name="birthday" onChange={(e) => setBirthday(e.target.value)} id="birthday" type="text" placeholder="DD/MM/YYYY"/>
                <label htmlFor="email">Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Contraseña:</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Registrar</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            
            <Link to="/login" className="link-btn">¿Ya tienes una cuenta? Ir al Login.</Link>
            
        </div>
    );
};

export default Register;
