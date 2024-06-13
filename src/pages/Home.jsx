import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import './Home.css';
import YouTube from 'react-youtube';

function Home() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "85efa55a480bb42cbb15cc3bf6ab7bc3";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";
  const BACKEND_URL = "https://8f31-181-26-148-206.ngrok-free.app";
  const token = localStorage.getItem('token');

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Cargando Peliculas" });
  const [playing, setPlaying] = useState(false);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
        language: 'es-ES'
      },
    });

    setMovies(results);
    setMovie(results[0]);

    if (results.length) {
      await fetchMovie(results[0].id);
    }
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos,credits,release_dates",
        language: 'es-ES'
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }

    let ageRating = "Desconocido";
    const releaseDatesUS = data.release_dates.results.find(date => date.iso_3166_1 === "US");
    if (releaseDatesUS && releaseDatesUS.release_dates.length > 0) {
      ageRating = releaseDatesUS.release_dates[0].certification;
    }

    let genresInSpanish = "";
    if (data.genres && data.genres.length) {
      genresInSpanish = data.genres
        .map((genre) => genre.name.toLowerCase().replace(/ /g, "_"))
        .join(", ");
    }

    let runtime = "";
    if (data.runtime) {
      const totalMinutes = data.runtime;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      runtime = `${hours}h ${minutes}min`;
    }

    let releaseDate = null;
    if (data.release_dates && data.release_dates.results) {
      const releaseDatesUS = data.release_dates.results.find(
        (date) => date.iso_3166_1 === "US"
      );
      if (releaseDatesUS && releaseDatesUS.release_dates.length > 0) {
        releaseDate = releaseDatesUS.release_dates[0].release_date.substring(0, 4);
      }
    }

    setMovie({
      ...data,
      genresInSpanish,
      runtime,
      ageRating,
      releaseDate,
    });
  };

  const selectMovie = async (movie) => {
    fetchMovie(movie.id);
    setMovie(movie);
    setComment("");
    setPlaying(false);
    window.scrollTo(0, 0);
  };

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  const addToFavorites = async () => {
    if (!comment) {
      setError('El comentario no puede estar vacío');
      setMessage(null); // Clear success message
      window.scrollTo(0, 0); // Scroll to the top of the page
      return;
    }

    if (isNaN(movie.id)) {
      setError('El idTmbd debe ser un número');
      setMessage(null); // Clear success message
      window.scrollTo(0, 0); // Scroll to the top of the page
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/api/movies`, {
        id_user: movie.id_user,//id_user: movie.id_user,
        idTmbd: movie.id,
        title: movie.title,
        poster_url: `${IMAGE_PATH}${movie.poster_path}`,
        overview: movie.overview,
        comment: comment,
        releaseDate: movie.releaseDate,
        runtime: movie.runtime
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json, text/plain, */*',
          "ngrok-skip-browser-warning": "69420",
        }
      });
      setMessage('Película agregada a favoritos.');
      setError(null); // Clear error message if successful
      window.scrollTo(0, 0); // Scroll to the top of the page
    } catch (error) {
      console.error('Error al agregar la película a favoritos:', error);
      setError('Error al agregar la película a favoritos.');
      setMessage(null); // Clear success message if error
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setError(null); // Clear error message on comment change
    setMessage(null); // Clear success message on comment change
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <Header />
      <h2 className="text-center mt-5 mb-5">Catálogo de Peliculas</h2>
      <form className="container mb-4" onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="buscar películas"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button>Buscar</button>
      </form>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <main>
          {movie ? (
            <div className="container">
              <div className="viewtrailer" style={{ backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")` }}>
                <img src={`${IMAGE_PATH}${movie.poster_path}`} alt="" height={500} width="100%" />
                <div className="movie-details">
                  <h1>{movie.title} ({movie.releaseDate ? movie.releaseDate : '?'})</h1>
                  <p>{movie.overview}</p>
                  <p>Duración: {movie.runtime}</p>
                  <div className="rating"></div>
                </div>
                <div className="comment-section">
                  <textarea
                    placeholder="Agrega un comentario"
                    value={comment}
                    onChange={handleCommentChange}
                  ></textarea>
                  <button className="boton" onClick={addToFavorites}>+ Favoritos</button>
                  {trailer ? (
                    <button className="boton" onClick={() => setPlaying(true)} type="button">
                      Ver Trailer
                    </button>
                  ) : (
                    <p>Lo sentimos, no hay tráiler disponible.</p>
                  )}
                </div>
                {playing && (
                  <>
                    <YouTube
                      videoId={trailer.key}
                      className="reproductor container"
                      containerClassName={"youtube-container amru"}
                      opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                          autoplay: 1,
                          controls: 0,
                          cc_load_policy: 0,
                          fs: 0,
                          iv_load_policy: 0,
                          modestbranding: 0,
                          rel: 0,
                          showinfo: 0,
                        },
                      }}
                    />
                    <button onClick={() => setPlaying(false)}>
                      Cerrar Trailer
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </main>
      </div>
      <div className="container mt-3">
        <div className="row">
          {movies.map((movie) => (
            <div key={movie.id} className="col-md-4 mb-3" onClick={() => selectMovie(movie)}>
              <img src={`${URL_IMAGE + movie.poster_path}`} alt="" height={400} width="100%" />
              <h4 className="text-title">{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
