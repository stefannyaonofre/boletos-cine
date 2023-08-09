const URL_API_JSON = "https://miniback-boletos-cine.onrender.com/";
const URL_API_MOVIES = "https://api.themoviedb.org/3/movie/now_playing";
const URL_API_MOVIE = "https://api.themoviedb.org/3/movie/";
const API_KEY="d539189f15b232683c9d1f3bd35b25ba";
const URL_IMAGE ="https://image.tmdb.org/t/p/original";

export const endpoints = {
    urlCinemas: `${URL_API_JSON}cinemas`,
    urlFunctions: `${URL_API_JSON}functions`,
    urlTickect:`${URL_API_JSON}tikect`,
    urlAdmin: `${URL_API_JSON}admin`,
    urlSala: `${URL_API_JSON}salas`,
    urlMovies: `${URL_API_MOVIES}?api_key=${API_KEY}&language=es-ES`,
    urlMovie:(id)=>`${URL_API_MOVIE}${id}?api_key=${API_KEY}&language=es-ES`,
    urlImage: `${URL_IMAGE}`,
    urlVideo:(id)=> `${URL_API_MOVIE}${id}/videos?api_key=${API_KEY}&language=es-ES`,
    ulrFunctionsCinema: (idPelicula, idCinema) => `${URL_API_JSON}functions?idPelicula=${idPelicula}&cinemasId=${idCinema}`
}
