import React, { useEffect, useState } from "react";
import "./cardCarrusel.scss";

const CardCarrusel = ({ movie }) => {

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
          {movie.gender?.map((item, index) => (
            <span key={index}>{item} {index < movie.gender.length - 1 ? ", " : ""}</span>
          ))}
        </span>
        <div>
          <span>{movie.adult ? 'Público Mayor de edad' : 'Para todo el Público'}</span>
          <span>{movie.runtime} Min</span>
        </div>
      </div>
    </div>
  );
};

export default CardCarrusel;
