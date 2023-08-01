import React from "react";
import "./detallePelicula.scss";
import { useContext } from "react";
import { AppContext } from "../../routes/Router";
import { useEffect } from "react";
import { getVideoMovie } from "../../services/getVideoMovie";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailsMovie } from "../../services/getDetailsMovie";
import useSessionStorage from "../../hooks/useSessionStorage";

const DetallePelicula = () => {
  const key = 'teatroFecha'
  const { seleccionTeatro, seleccionFecha } = useContext(AppContext);
  const [movie, setMovie] = useState([]);
  const [videoMovie, setVideoMovie] = useState("");
  const { idMovie } = useParams();
  const { getInfo } = useSessionStorage();
  const teatroFecha = getInfo(key);
  const [botonActivo, setBotonActivo] = useState(null);

  useEffect(() => {
    detailMovie();
    getVideoMovie(idMovie).then((response) => {
      setVideoMovie(response?.key);
    });
    
    console.log(teatroFecha)
  }, []);

  const detailMovie = async () => {
    const detail = await getDetailsMovie(idMovie);
    setMovie(detail);
  };
  
  const handleClick = (index) =>{
    setBotonActivo(index === botonActivo ? null : index);
  }
  return (
    <section className="details">
      <article className="details__start">
        <div className="details__start-movie">
          <figure>
            <img src={movie?.image} alt="pelicula" />
          </figure>
          <div className="all">
            <h1>{movie?.name}</h1>
            <span>
              {movie?.nameEnglish}: ({movie?.premiere})
            </span>

            <div className="buttons">
              <button>{movie?.adult ? "B" : "A"}</button>
              <button>{movie?.runtime} Min</button>
              <button>
                {movie?.gender?.map((item, index) => (
                  <span key={index}>{item}, </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='details__start-info'>
        <h1>Horarios disponibles: 07 de julio</h1>
        <span>Elige el horario que prefieras</span>
        <span>Marco plaza del mar</span>
        <div className='buttons'>
          <button 
          onClick={() => handleClick(0)}
          className={botonActivo === 0 ? 'activeButton' : 'inactiveButton'}

          >18:00</button>
          <button 
          onClick={() => handleClick(1)}
          className={botonActivo === 1 ? 'activeButton' : 'inactiveButton'}

          >19:00</button>
          <button 
          onClick={() => handleClick(2)}
          className={botonActivo === 2 ? 'activeButton' : 'inactiveButton'}

          >21:30</button>
        </div>
        <button 
        
        className={botonActivo !== null ? 'activeButton' : 'inactiveButton'}
        >Seleccionar boletos</button>
      </div>
      </article>

      <article className="details__end">
        <h1>Trailer</h1>
        {videoMovie && (
          <iframe
            src={`https://www.youtube.com/embed/${videoMovie}`}
            title={movie?.name}
            frameBorder="0"
            allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            key={movie?.id}
          ></iframe>
        )}
        <br />
        <h2>Sipnosis</h2>
        <p>{movie?.overview}</p>
      </article>
    </section>
  );
};

export default DetallePelicula;
