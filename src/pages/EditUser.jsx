import React, { useState } from "react";

function EditUser({ user, onUpdateUser, onDeleteUser }) {
  const [name, setName] = useState(user?.name || "");
  const [lastname, setLastName] = useState(user?.lastname || "");
  const [birthday, setBirthday] = useState(user?.birthday || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { name, lastname, birthday, email: user?.email };
    onUpdateUser(updatedUser);
  };

  const handleDelete = () => {
    onDeleteUser(user.id);
  };

  return (
    <div className="auth-form-container">
      <h2>Editar Usuario</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="Nombre"
          disabled
        />
        <label htmlFor="lastname">Apellido:</label>
        <input
          value={lastname}
          name="lastname"
          onChange={(e) => setLastName(e.target.value)}
          id="lastname"
          placeholder="Apellido"
          disabled
        />
        <label htmlFor="birthday">Fecha de Nacimiento:</label>
        <input
          value={birthday}
          name="birthday"
          onChange={(e) => setBirthday(e.target.value)}
          id="birthday"
          type="date"
          placeholder="Birthday"
        />
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <button className="button" type="submit">
          Actualizar Datos
        </button>
        {/* Botón de eliminar inhabilitado */}
        <button className="delete-btn btn" onClick={handleDelete} type="button" disabled>
          Eliminar Usuario
        </button>
      </form>
    </div>
  );
}

export default EditUser;






