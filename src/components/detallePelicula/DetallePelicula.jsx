import React from "react";
import "./detallePelicula.scss";
import { useEffect } from "react";
import { getVideoMovie } from "../../services/getVideoMovie";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailsMovie } from "../../services/getDetailsMovie";
import useSessionStorage from "../../hooks/useSessionStorage";
import { getFunctions } from "../../services/getFunctions";
import { useNavigate } from "react-router-dom";

const DetallePelicula = () => {
  const key = 'teatroFecha';
  const keyFunction = 'function';
  const [movie, setMovie] = useState([]);
  const [videoMovie, setVideoMovie] = useState("");
  const { idMovie } = useParams();
  const { getInfo, saveInfo } = useSessionStorage();
  const teatroFecha = getInfo(key);
  const [botonActivo, setBotonActivo] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    detailMovie();
    getVideoMovie(idMovie).then((response) => {
      setVideoMovie(response?.key);
    });
  }, []);

  const detailMovie = async () => {
    const detail = await getDetailsMovie(idMovie);
    setMovie(detail);
  };

  const consultFunction = async (hora) => {
    const functions = await getFunctions();
    const filterIdMovie = functions?.filter((item) => item.idPelicula == idMovie);
    const filterFecha = filterIdMovie?.filter((item) => item.fecha == teatroFecha.fecha);
    const filterHora = filterFecha?.filter((item) => item.horarioInicio == hora)

    saveInfo(keyFunction, filterHora)
  }
  
  const handleClick = (index, hora) =>{
    setBotonActivo(index === botonActivo ? null : index);
    consultFunction(hora);
  }

  const handleSelection = () => {
    navigate(`/${idMovie}/boletos`)
  }

  return (
    <section className="detailss d-flex justify-content-space-between">
      <article className="detailss__start">
        <div className="detailss__start-movie">
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
                  <span key={index}>{item} {index < movie.gender.length - 1 ? ", " : ""} </span>
                ))}
              </button>
            </div>
          </div>
        </div>

      <div className='detailss__start-info d-flex justify-content-center align-items-center'>
        <h4>Horarios disponibles: {teatroFecha.fecha}</h4>
        <span>Elige el horario que prefieras</span>
        <span>{teatroFecha.teatro}</span>
        <div className='buttons'>
          <button 
          onClick={() => handleClick(0, "18:00")}
          className={botonActivo === 0 ? 'activeButton' : 'inactiveButton'}
          >18:00</button>
          <button 
          onClick={() => handleClick(1, "19:00")}
          className={botonActivo === 1 ? 'activeButton' : 'inactiveButton'}
          >19:00</button>
          <button 
          onClick={() => handleClick(2, "21:30")}
          className={botonActivo === 2 ? 'activeButton' : 'inactiveButton'}
          >21:30</button>
        </div>
        <button 
        className={botonActivo !== null ? 'activeButton' : 'inactiveButton'}
        onClick={handleSelection}
        >Seleccionar boletos</button>
      </div>
      </article>

      <article className="detailss__end">
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
