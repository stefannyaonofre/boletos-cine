import React, { useEffect, useState } from "react";
import "./admin.scss";
import logo from "../../assets/logo.jpg";
import admin from "../../assets/admin.svg";
import tools from "../../assets/tools.svg";
import calendar from "../../assets/calendar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useSessionStorage from "../../hooks/useSessionStorage";
import { useParams } from "react-router-dom";
import { getDetailsMovie } from "../../services/getDetailsMovie";
import { getVideoMovie } from "../../services/getVideoMovie";
import "bootstrap/dist/css/bootstrap.min.css";
import Functions from "../functions/Functions";

const Admin = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [user, setUser] = useState({});
  const key = "user";
  const { getInfo } = useSessionStorage();
  const nameUser = getInfo(key);
  const { idMovie } = useParams();
  const [movie, setMovie] = useState([]);
  const [videoMovie, setVideoMovie] = useState("");

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

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const onChangeCallback = (date) => {
    setSelectedDate(date);
    console.log("Fecha seleccionada:", date.toLocaleDateString("es"));
  };
  const fecha = selectedDate ? selectedDate.toLocaleDateString("es") : null;

  return (
    <>
      <header className="headerAdmin">
        <div className="headerAdmin__logo">
          <div className="headerAdmin__logo-left">
            <img src={logo} alt="CineColombia" />
            <span>CINE COLOMBIA</span>
          </div>
          <div className="headerAdmin__logo-right">
            <div className="perfil">
              <figure className="ad">
                <img src={admin} alt="Administrador" />
              </figure>
              <div className="date">
                <span>{nameUser.name}</span>
                <span>View profile</span>
              </div>
            </div>
            <figure className="tools">
              <img className="tool" src={tools} alt="Configuracion" />
            </figure>
          </div>
        </div>
        <div className="headerAdmin__movie">
          <figure className="poster">
            <img src={movie?.image} alt="movie" />
          </figure>
          <figure className="video">
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
          </figure>
        </div>
      </header>

      <main className="mainAdmin d-flex justify-content-space-around g-5">
        <section className="mainAdmin__leftt">
          <div>
            <h3>Sipnosis</h3>
            <p>{movie?.overview}</p>
          </div>
          <div>
            <h5>Titulo original</h5>
            <span>{movie?.nameEnglish}</span>
          </div>
          <div>
            <h5>País de origen</h5>
            {movie.productionCountries?.map((item, index) => (
              <span key={index}>
                {item}{" "}
                {index < movie.productionCountries.length - 1 ? ", " : ""}{" "}
              </span>
            ))}
          </div>
          <div>
            <h5>Duración</h5>
            <span>{movie?.runtime}Min</span>
          </div>
          <div>
            <h5>Generos:</h5>
            {movie?.gender?.map((item, index) => (
              <span key={index}>
                {item} {index < movie.gender.length - 1 ? ", " : ""}{" "}
              </span>
            ))}
          </div>
          <div>
            <h5>Lenguaje</h5>
            {movie.languages?.map((item, index) => (
              <span key={index}>
                {item} {index < movie.languages.length - 1 ? ", " : ""}{" "}
              </span>
            ))}
          </div>
        </section>
        <section className="mainAdmin__rightt d-flex p-10 vw-50">
          <span>Selecciona el calendario</span>
          <figure className="calendar-button" onClick={toggleCalendar}>
            <img src={calendar} />
          </figure>

          {/* Calendario */}
          {showCalendar && (
            <DatePicker
              selected={selectedDate}
              onChange={onChangeCallback}
              dateFormat="dd/MM/yy" // Formato deseado "02/08/23"
              minDate={new Date()}
              placeholderText="01/08/23"
              className="react-datepicker-custom" // Clase personalizada para el input
              calendarClassName="react-datepicker-custom-calendar"
            />
          )}

          <span>La fecha seleccionada fue: {fecha}</span>
          <h2>Edición</h2>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            numquam libero voluptas sint reiciendis, quod quidem, veritatis
            illum ut sed quo minus tenetur laboriosam deleniti voluptatem
            doloribus iusto quaerat necessitatibus.
          </p>
        </section>
      </main>
    </>
  );
};

export default Admin;
