const URL_API_JSON = "http://localhost:5000/";
const URL_API_MOVIES = "https://api.themoviedb.org/3/movie/now_playing";
const URL_API_MOVIE = "https://api.themoviedb.org/3/movie/";
const API_KEY="d539189f15b232683c9d1f3bd35b25ba"

export const endpoints = {
    urlCinemas: `${URL_API_JSON}cinemas`,
    urlFunctions: `${URL_API_JSON}functions`,
    urlTickect:`${URL_API_JSON}tikect`,
    urlAdmin: `${URL_API_JSON}admin`,
    urlMovies: `${URL_API_MOVIES}?api_key=${API_KEY}&language=es-ES`,
    urlMovie:(id)=>`${URL_API_MOVIE}${id}?api_key=${API_KEY}&language=es-ES`
}
// url pelicula, para consultar la informacion complementaria de la pelicula seleccionada
// const id = endpoints.urlMovie(1);