import React, { useEffect, useState } from 'react';
import Header from './Header'; 
import axios from 'axios';
import './Home.css';
import YouTube from 'react-youtube';


function Home() {
const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "85efa55a480bb42cbb15cc3bf6ab7bc3";
const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

// endpoint para las imagenes
const URL_IMAGE = "https://image.tmdb.org/t/p/original";

// variables de estado
const [movies, setMovies] = useState([]);
const [searchKey, setSearchKey] = useState("");
const [trailer, setTrailer] = useState(null);
const [movie, setMovie] = useState({ title: "Cargando Peliculas" });
const [playing, setPlaying] = useState(false);

// funcion para realizar la peticion get a la api
const fetchMovies = async (searchKey) => {
const type = searchKey ? "search" : "discover";
const {
data: { results },
} = await axios.get(`${API_URL}/${type}/movie`, {
params: {
api_key: API_KEY,
query: searchKey,
language: 'es-ES' // Descripcion en español
},
});

setMovies(results);
setMovie(results[0]);

if (results.length) {
await fetchMovie(results[0].id);
}
};

//Funcion para la peticion de un solo objeto y mostrar en reproductor de videos
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

//Buscar la clasificación de edad en las fechas de lanzamiento
let ageRating = "Desconocido"; // Por defecto

//Filtrar la clasificación de edad para el país deseado (por ejemplo, EE. UU.)
const releaseDatesUS = data.release_dates.results.find(date => date.iso_3166_1 === "US");

if (releaseDatesUS && releaseDatesUS.release_dates.length > 0) {
//Suponiendo que queremos mostrar solo la primera clasificación de edad encontrada
ageRating = releaseDatesUS.release_dates[0].certification;
}

//Obtener el género de la película en español
let genresInSpanish = "";
if (data.genres && data.genres.length) {
genresInSpanish = data.genres
.map((genre) => {
return genre.name.toLowerCase().replace(/ /g, "_"); // Convertir espacios a guiones bajos para facilitar la búsqueda
})
.join(", ");
}

//Parsear la duración de la película en horas y minutos
let duration = "";
if (data.runtime) {
const totalMinutes = data.runtime;
const hours = Math.floor(totalMinutes / 60);
const minutes = totalMinutes % 60;
duration = `${hours}h ${minutes}min`;
}

//Extraer el año de lanzamiento de las fechas de lanzamiento
let releaseYear = null;
if (data.release_dates && data.release_dates.results) {
  const releaseDatesUS = data.release_dates.results.find(
    (date) => date.iso_3166_1 === "US" // Assuming US release date
  );
  if (releaseDatesUS && releaseDatesUS.release_dates.length > 0) {
    releaseYear = releaseDatesUS.release_dates[0].release_date.substring(
      0,
      4
    );
  }
}

//Extraer información del reparto y del director.
let cast = [];
let director = "";
if (data.credits && data.credits.cast) {
  cast = data.credits.cast.slice(0, 5).map((actor) => actor.name); // Get top 5 cast members
}
if (data.credits && data.credits.crew) {
  director = data.credits.crew.find((crewMember) => crewMember.job === "Director");
  if (director) {
    director = director.name;
  }
}

//Actualizar el estado de la película con la información de género y duración en español
setMovie({
...data,
genresInSpanish,
duration,
ageRating,
releaseYear,
cast,
director,
});

};

const selectMovie = async (movie) => {
fetchMovie(movie.id);
setMovie(movie);
window.scrollTo(0, 0);
};

//Funcion para buscar peliculas
const searchMovies = (e) => {
e.preventDefault();
fetchMovies(searchKey);
};

useEffect(() => {
fetchMovies();
}, []);

return (
<div>
<Header /> {/* Renderiza el componente Header */}
<h2 className="text-center mt-5 mb-5">Catálogo de Peliculas</h2>

{/*Buscador */}
<form className="container mb-4" onSubmit={searchMovies}>
<input
type="text"
placeholder="buscar"
onChange={(e) => setSearchKey(e.target.value)}
/>
<button className="boton">Buscar</button>
</form>
<div>
<main>
{movie ? (
<div
className="viewtrailer"
style={{
  backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
}}
>
{playing ? (
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
  <button onClick={() => setPlaying(false)} className="boton">
    Close
  </button>
</>
) : (
<div className="container">
  <div className="">
  <button
        className="boton"
        type="button"
      >
      + Favoritos
      </button>
    {trailer ? (
      <button
        className="boton"
        onClick={() => setPlaying(true)}
        type="button"
      >
      Ver Trailer
      </button>
    ) : (
      "Lo sentimos, no hay tráiler disponible."
    )}
 <div className="movie-details">
  <h1>{movie.title} ({movie.releaseYear ? movie.releaseYear : '?'})</h1>
  <p>{movie.overview}</p>
  <p>Género: {movie.genresInSpanish}</p>
  <p>Clasificación por Edad: {movie.ageRating}</p>
  <p>Duración: {movie.duration}</p>
  <p>Director: {movie.director}</p>
  <p>Elenco: {movie.cast ? movie.cast.join(', ') : 'Cargando elenco...'}</p>
  <div className="rating"></div>
</div>
    </div>
  </div>
)}
</div>
) : null}
</main>
</div>

{/*Contenedor para mostrar los posters y las peliculas en la peticion a la api */}
<div className="container mt-3">
<div className="row">
{movies.map((movie) => (
<div
key={movie.id}
className="col-md-4 mb-3"
onClick={() => selectMovie(movie)}
>
<img
  src={`${URL_IMAGE + movie.poster_path}`}
  alt=""
  height={600}
  width="100%"
/>
<h4 className="text-title">{movie.title}</h4>
</div>
))}
</div>
</div>
</div>
);
}

export default Home;
