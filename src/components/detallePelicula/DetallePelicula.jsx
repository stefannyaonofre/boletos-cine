import React from "react";
import "./detallePelicula.scss";
import { useContext } from "react";
import { AppContext } from "../../routes/Router";
import { useEffect } from "react";
import { getVideoMovie } from "../../services/getVideoMovie";
import { useState } from "react";

const DetallePelicula = () => {
  const { movieDetail } = useContext(AppContext);
  const [ videoMovie, setVideoMovie ] = useState('');
  useEffect(() => {
    console.log(movieDetail);
    getVideoMovie(movieDetail.id).then((response) => {
      setVideoMovie(response.key);
    })
  }, []);

  return (
    <section className="details">
      <article className="details__start">
        <div className="details__start-movie">
          <figure>
            <img src={movieDetail.image} alt="pelicula" />
          </figure>
          <div className="all">
            <h1>{movieDetail.name}</h1>
            <span>{movieDetail.name}: EUA (2021)</span>

            <div className="buttons">
              <button>B</button>
              <button>{movieDetail.runtime} Min</button>
              <button>
                {movieDetail.gender.map((item, index) => (
                  <span key={index}>{item}, </span>
                ))}
              </button>
            </div>
          </div>
        </div>

        <div className="details__start-info">
          <h1>Horarios disponibles: 07 de julio</h1>
          <span>Elige el horario que prefieras</span>
          <span>Marco plaza del mar</span>
          <div className="buttons">
            <button>18:00</button>
            <button>19:00</button>
            <button>21:30</button>
          </div>
          <button className="bol">Seleccionar boletos</button>
        </div>
      </article>

      <article className="details__end">
        <h1>Trailer</h1>
        <iframe 
        src={`https://www.youtube.com/embed/${videoMovie}`} 
        title={movieDetail.name}
        frameBorder="0"
        allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        ></iframe>
        <br />
        <h2>Sipnosis</h2>
        <p>
          {movieDetail.overview}
        </p>
      </article>
    </section>
  );
};

export default DetallePelicula;
