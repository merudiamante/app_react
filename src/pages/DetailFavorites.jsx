import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailFavorites.css';

function DetailFavorites() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const BACKEND_URL = "https://8f31-181-26-148-206.ngrok-free.app";
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json, text/plain, */*',
            "ngrok-skip-browser-warning": "69420"
          }
        });
        setMovie(data);
        setComment(data.comment || "");
      } catch (error) {
        console.error('Error al obtener los detalles de la película favorita:', error);
      }
    };

    fetchMovie();
  }, [id, token]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setError(""); // Clear error message on comment change
    setSuccess(""); // Clear success message on comment change
  };

  const saveFavorite = async () => {
    setError("");
    setSuccess("");

    if (!token) {
      console.error('Token de autenticación no encontrado.');
      return;
    }

    if (comment.trim() === "") {
      setError("El comentario no puede quedar vacío");
      window.scrollTo(0, 0); // Scroll to the top of the page
      return;
    }

    try {
      await axios.patch(`${BACKEND_URL}/api/movies/${id}`, { comment }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json, text/plain, */*',
          "ngrok-skip-browser-warning": "69420"
        }
      });
      setSuccess("Película favorita actualizada.");
      window.scrollTo(0, 0); // Scroll to the top of the page
    } catch (error) {
      console.error('Error al actualizar la película favorita:', error);
      setError("Error al actualizar la película favorita.");
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  };

  const deleteFavorite = async () => {
    setError("");
    setSuccess("");

    if (!token) {
      console.error('Token de autenticación no encontrado.');
      return;
    }

    try {
      await axios.delete(`${BACKEND_URL}/api/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json, text/plain, */*',
          "ngrok-skip-browser-warning": "69420"
        }
      });
      setSuccess("Película favorita eliminada.");
      window.scrollTo(0, 0); // Scroll to the top of the page
      setTimeout(() => {
        navigate('/favoritos');
      }, 2000); // Redirigir después de 2 segundos
    } catch (error) {
      console.error('Error al eliminar la película favorita:', error);
      setError("Error al eliminar la película favorita.");
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  };

  if (!movie) return <div>Cargando...</div>;

  return (
    <div className="container">
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>{movie.title}</h2>
      <img src={movie.poster_url} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>Duración: {movie.runtime}</p>
      <textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder="Modifica el comentario"
      />
      <div className="button-group">
        <button className="boton" onClick={saveFavorite}>Guardar Favorito</button>
        <button className="boton" onClick={deleteFavorite}>Eliminar Favorito</button>
      </div>
    </div>
  );
}

export default DetailFavorites;
