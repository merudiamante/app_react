import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
    const [initialUser, setInitialUser] = useState({ name: '', lastname: '', birthday: '' });
    const [user, setUser] = useState({ name: '', lastname: '', birthday: '', email: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const USER_BASE_URL = "https://f570-181-229-4-119.ngrok-free.app";

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUser(token);
        }
    }, []);

    const fetchUser = async (token) => {
        try {
            const response = await axios.get(`${USER_BASE_URL}/me?timestamp=${new Date().getTime()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json, text/plain, */*',
                    "ngrok-skip-browser-warning": "69420"
                }
            });
            const userData = response.data;
            setInitialUser({ name: userData.name, lastname: userData.lastname, birthday: userData.birthday });
            setUser({ name: userData.name, lastname: userData.lastname, birthday: userData.birthday, email: userData.email });
        } catch (error) {
            console.error('Error al obtener los datos del usuario', error);
            setError('Error al obtener los datos del usuario.');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
    
        if (!user.name || !user.lastname || !user.birthday) {
            setError('Todos los campos son obligatorios y no pueden quedar vacíos.');
            return;
        }
    
        if (user.name === initialUser.name && user.lastname === initialUser.lastname && user.birthday === initialUser.birthday) {
            setError('Debe modificar al menos un campo para actualizar sus datos.');
            return;
        }
    
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.patch(`${USER_BASE_URL}/users/me`, {
                    name: user.name,
                    lastname: user.lastname,
                    birthday: user.birthday,
                }, {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json, text/plain, /',
                        "ngrok-skip-browser-warning": "69420"
                    }
                });
    
                console.log('Respuesta del PATCH:', response.data);
    
                if (response.status === 200) {
                    setSuccess('Datos actualizados exitosamente.');
    
                    // Actualizar el estado con los datos actualizados
                    setUser({
                        ...user,
                        name: response.data.name,
                        lastname: response.data.lastname,
                        birthday: response.data.birthday,
                        email: response.data.email // Asegúrate de incluir el email si es necesario
                    });
    
                    setInitialUser({
                        ...initialUser,
                        name: response.data.name,
                        lastname: response.data.lastname,
                        birthday: response.data.birthday,
                        email: response.data.email // Asegúrate de incluir el email si es necesario
                    });
    
                    // Volver a llamar a fetchUser para asegurarse de que los datos estén sincronizados
                    fetchUser(token);
                } else {
                    setError('Error al actualizar los datos.');
                }
            } catch (error) {
                setError('Error al actualizar los datos.');
                console.error('Error al actualizar los datos del usuario', error);
            }
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
            return;
        }

        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.delete(`${USER_BASE_URL}/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json, text/plain, */*',
                        "ngrok-skip-browser-warning": "69420"
                    }
                });
                if (response.status === 204) {
                    localStorage.removeItem('token');
                    setUser({ name: '', lastname: '', birthday: '', email: '' });
                    setInitialUser({ name: '', lastname: '', birthday: '' });
                    navigate('/register');
                } else {
                    setError('Error al eliminar el usuario.');
                }
            } catch (error) {
                setError('Error al eliminar el usuario.');
                console.error('Error al eliminar el usuario', error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="auth-form-container">
            <h2>Editar Usuario</h2>
            <form className="edit-form" onSubmit={handleUpdate}>
                <label htmlFor="name">Nombre:</label>
                <input
                    value={user.name}
                    name="name"
                    onChange={handleChange}
                    id="name"
                    placeholder="Nombre"
                />
                <label htmlFor="lastname">Apellido:</label>
                <input
                    value={user.lastname}
                    name="lastname"
                    onChange={handleChange}
                    id="lastname"
                    placeholder="Apellido"
                />
                <label htmlFor="birthday">Fecha de Nacimiento:</label>
                <input
                    value={user.birthday}
                    name="birthday"
                    onChange={handleChange}
                    id="birthday"
                    type="text"
                    placeholder="Fecha de Nacimiento"
                />
                <label htmlFor="email">Email:</label>
                <input
                    value={user.email}
                    name="email"
                    id="email"
                    type="email"
                    placeholder="youremail@gmail.com"
                    disabled
                />
                <button type="submit">Actualizar Datos</button>
            </form>
            <button onClick={handleDelete} type="button">Eliminar Usuario</button>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default EditUser;
