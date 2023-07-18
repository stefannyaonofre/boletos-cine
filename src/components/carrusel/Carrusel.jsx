import React from 'react'
import { getMovies } from '../../services/getMovies'
import { getDetailsMovie } from '../../services/getDetailsMovie';
import './carrusel.scss'
import Slider from 'react-slick';

const Carrusel = () => {

    const movies = async () => {
        const data = await getMovies();
        console.log(data)
    }

    const detailMovie = async () => {
        const detail = await getDetailsMovie();
    }    

    return (
        <>
            <button onClick={movies}>infoPeliculas</button>
            <button onClick={detailMovie}>detalle pelicula</button>
           
        </>
    )
}

export default Carrusel