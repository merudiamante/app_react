import React, { useState } from "react";

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
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
                <button className="btn" type="submit">Registrar</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Ya tenes una cuenta? Ir al Login.</button>
        </div>
    )
}

export default Register;
