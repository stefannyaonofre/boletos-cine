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
import { getFunctions } from "../../services/getFunctions";
import { getCinemas } from "../../services/getCinemas";
import { Accordion } from "react-bootstrap";
import { getSalas } from "../../services/getSalas";
import CardFunctions from "../cardFunctions/CardFunctions";
import Cinema from "../cinema/Cinema"
const Admin = ({onClose}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [user, setUser] = useState({});
  const key = "user";
  const { getInfo } = useSessionStorage();
  const nameUser = getInfo(key);
  const { idMovie } = useParams();
  const [movie, setMovie] = useState([]);
  const [videoMovie, setVideoMovie] = useState("");
  const [cinemas, setCinemas] = useState([]);
  const [salas, setSalas] = useState([]);
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    detailMovie();
    getVideoMovie(idMovie).then((response) => {
      setVideoMovie(response?.key);
    });
    // filtrarFunction(1);
    funcionePelicula()
    getCinema();
  }, []);

  const detailMovie = async () => {
    const detail = await getDetailsMovie(idMovie);
    setMovie(detail);
  };

  // const filtrarFunction = async (idCinema) => {
  //   const response = await getFunctions();
  //   const salas = await getSalas();
  //   const filterSalas = salas.filter((sala) => sala.idCinema == idCinema);
  //   setSalas(filterSalas);

  //   const filterFunciones = response.filter((functionItem) => {
  //     return filterSalas.some((sala) => sala.id === functionItem.idSala);
  //   });
  //   return filterFunciones;
  // };

  const funcionePelicula = async (idMovie, idCinema) => {

    // const functions = await getFunctions();
    // const filter = functions.filter((item) => item.idPelicula == idMovie);
    // console.log(filter)
  }

  const getCinema = async () => {
    const response = await getCinemas();
    setCinemas(response);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const onChangeCallback = (date) => {
    setSelectedDate(date);
    console.log("Fecha seleccionada:", date.toLocaleDateString("es"));
  };
  const fecha = selectedDate ? selectedDate.toLocaleDateString("es") : null;
  const handleClick = () => {
    console.log('hice click')
    setOpened(true)

}
const handleCloseForm = () => {
    setOpened(false);
  };
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

      <main className="mainAdmin d-flex justify-content-around g-5">
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
        <section className="mainAdmin__rightt d-flex bg-body-secondary g-10">
          <div className="d-flex justify-content-around align-items-center p-10">
            <span>FUNCIONES POR MULTIPLEX</span>
              {opened ? (<Cinema onClose={handleCloseForm}/>):(
                <button type="button" 
                onClick={handleClick}
                className="btn btn-outline-primary">Nuevo Cinema + </button>
              )}
            

          </div>
          <div className="d-flex flex-column align-items-center">
          {cinemas?.map((cinema, index) => (
            <Accordion
              defaultActiveKey="0"
              key={index}
              className="bg-body-secondary"
            >
              <Accordion.Item eventKey="1">
                <Accordion.Header>{cinema?.name}</Accordion.Header>
                <Accordion.Body>
                 <CardFunctions idPelicula={idMovie} idCinema={cinema.id}/>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
          </div>   
        </section>
      </main>
    </>
  );
};

export default Admin;
