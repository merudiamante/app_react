import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario registrado

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí deberías enviar los datos del usuario al servidor para registrarlo
        // Una vez que el usuario se haya registrado correctamente, guarda los datos del usuario en el local storage
        const newUser = { name, lastname, birthday, email, pass }; // Suponiendo que también estás recopilando la contraseña
        localStorage.setItem("userData", JSON.stringify(newUser));
        setUserData(newUser);
    }

    return (
        <div className="auth-form-container">
            {!userData ? (
                <>
                    <h2>Registro</h2>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <label htmlFor="name">Nombre:</label>
                        <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Nombre" />
                        <label htmlFor="lastname">Apellido:</label>
                        <input value={lastname} name="lastname" onChange={(e) => setLastName(e.target.value)} id="lastname" placeholder="Apellido" />
                        <label htmlFor="birthday">Fecha de Nacimiento:</label>
                        <input value={birthday} name="birthday" onChange={(e) => setBirthday(e.target.value)} id="birthday" type="date" placeholder="Birthday" />
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                        <label htmlFor="password">Contraseña:</label>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                        <button type="submit">Registrar</button>
                    </form>
                    <button className="link-btn">
                        <Link to="/login">¿Ya tienes una cuenta? Ir al Login.</Link>
                    </button>
                </>
             ) : (
                // Si userData está definido, redirige al usuario a la página de edición de usuario
                <Navigate to="/mis-datos" replace />
            )}
        </div>
    )
}

export default Register;


