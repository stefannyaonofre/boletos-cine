import React, { useEffect, useState } from "react";
import { getMovies } from "../../services/getMovies";
import { getDetailsMovie } from "../../services/getDetailsMovie";
import "./cartelera.scss";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../routes/Router";

const Cartelera = ({genders}) => {
  const [moviesList, setMoviesList] = useState([]);
  const list = [];
  const navigate = useNavigate();
  const { setMovieDetail } = useContext(AppContext);

  useEffect(() => {
    movies();
    console.log(genders);
  }, [genders]);

  const movies = async () => {
    const data = await getMovies();
    for (let i = 0; i < data.length; i++) {
      const listId = await getDetailsMovie(data[i].id);
      list.push(listId);
    }
    if(genders === ''){
      setMoviesList(list);
    }else{
      const filterGenders = list.filter((item)=>(item.gender.find(gender => gender === genders)));
      setMoviesList(filterGenders)
    }
  };

  const handleDetail = (movie) => {
    console.log(movie);
    setMovieDetail(movie);
    navigate('detalle')
  }

  return (
    <>
      <section>
        <h3>EN CARTELERA</h3>
        <article className="article__cartelera">
          {moviesList.map((movie) => (
            <div className="cartelera" id={movie.id} key={movie.id} onClick={() => (handleDetail (movie))}>
              <figure className="cartelera__figure">
                <img src={movie.image} />
              </figure>
              <div>
                <h4>{movie.name}</h4>
                <span>Título en inglés: {movie.nameEnglish}</span>
                <br />
                <span>Estreno {movie.premiere}</span>
                <br />
                <span>
                  Género:{" "}
                  {movie.gender.map((item, index) => (
                    <span key={index}>{item}, </span>
                  ))}
                </span>
                <br />
                <span>
                  {movie.adult
                    ? "Público Mayor de edad"
                    : "Para todo el Público"}
                </span>
                <br />
                <span>{movie.runtime} Min</span>
              </div>
            </div>
          ))}
        </article>
      </section>
    </>
  );
};

export default Cartelera;
