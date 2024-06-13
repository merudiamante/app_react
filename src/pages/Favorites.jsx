import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Cambiar a useNavigate
import './Favorites.css';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const BACKEND_URL = "https://8f31-181-26-148-206.ngrok-free.app";
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // Cambiar a useNavigate

  const fetchFavorites = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/movies`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json, text/plain, */*',
          "ngrok-skip-browser-warning": "69420"
        }
      });
      setFavorites(data);
    } catch (error) {
      console.error('Error al obtener las películas favoritas:', error);
    }
  };

  const searchFavorites = async (e) => {
    e.preventDefault();
    if (!searchKey) {
    fetchFavorites();
    return;
    }
    try {
    setLoading(true);
    setError(null);
    const response = await axios.get(`${BACKEND_URL}/api/movies?title=${searchKey}`, {
    headers: {
     'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'Accept': 'application/json, text/plain, */*',
     "ngrok-skip-browser-warning": "69420"
     }
     });
     setFavorites(response.data);
   } catch (error) {
     console.error('Error al buscar la película:', error);
     setError("Hubo un error al buscar películas. Por favor, inténtalo de nuevo más tarde.");
    } finally {
     setLoading(false);
    }
   };

  const handleTitleClick = (movie) => {
    navigate(`/detail-favorite/${movie.id}`); 
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      <h2 className="text-center mt-5 mb-5">Películas Favoritas</h2>
      <form className="container mb-4" onSubmit={searchFavorites}>
        <input
          type="text"
          placeholder="Buscar en favoritos"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button className="boton">Buscar</button>
      </form>
      <div className="container mt-3">
        <div className="row">
          {favorites.map((movie) => (
            <div key={movie.idTmbd} className="col-md-4 mb-3">
              <img src={movie.poster_url} alt={movie.title} height={400} width="100%" />
              <h4 className="text-title" onClick={() => handleTitleClick(movie)}>{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
