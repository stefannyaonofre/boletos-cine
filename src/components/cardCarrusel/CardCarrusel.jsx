import React, { useEffect, useState } from "react";
import "./cardCarrusel.scss";

const CardCarrusel = ({ movie }) => {
  const [gender, setGender] = useState([]);
  const [typePublic, setTypePublic] = useState("");
  useEffect(() => {
    genderMovie();
    publicType();
  }, []);
  const genderMovie = () => {
    const gen = movie.gender;
    setGender(gen);
  };
  const publicType = () => {
    let type;
    if (movie.adult) {
      type = "Público Mayor de edad";
    } else {
      type = "Para todo el Público";
    }
    setTypePublic(type);
  };

  return (
    <div className="card__carrusel">
      <figure className="card__carrusel__figure">
        <img src={movie.image} />
      </figure>
      <div className="card__carrusel__info-movie">
        <h2>{movie.name}</h2>
        <span>Título en inglés: {movie.nameEnglish}</span>
        <span>Estreno {movie.premiere}</span>
        <span>
          Género:{" "}
          {gender.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}
        </span>
        <div>
          <span>{typePublic}</span>
          <span>{movie.runtime} Min</span>
        </div>
      </div>
    </div>
  );
};

export default CardCarrusel;
