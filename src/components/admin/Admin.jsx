import React, { useState } from "react";
import "./admin.scss";
import logo from "../../assets/logo.jpg";
import admin from "../../assets/admin.svg";
import tools from "../../assets/tools.svg";
import calendar from "../../assets/calendar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Admin = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

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
                <span>Stefannya Onofre</span>
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
            <img
              src="https://www.themoviedb.org/t/p/original/fNtqD4BTFj0Bgo9lyoAtmNFzxHN.jpg"
              alt="movie"
            />
          </figure>
          <figure className="video">
            <img
              src="https://i.ytimg.com/vi/fOLU-J0veQ0/maxresdefault.jpg"
              alt="video"
            />
          </figure>
        </div>
      </header>
      <main className="mainAdmin">
        <section className="mainAdmin__leftt">
          <div>
            <h1>Sipnosis</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              quos aliquam molestias fuga at facilis, corrupti praesentium
              minima ipsam reiciendis laudantium. Quos, pariatur fugiat quae
              corrupti autem temporibus officiis maxime.
            </p>
          </div>
          <div>
            <h2>Titulo original</h2>
            <span>Barbie</span>
          </div>
          <div>
            <h2>País de origen</h2>
            <span>Estados Unidos</span>
          </div>
          <div>
            <h2>Director o directora</h2>
            <span>Nombre</span>
          </div>
          <div>
            <h2>Actores</h2>
            <span>Nombre</span>
          </div>
          <div>
            <h2>Lenguaje</h2>
            <span>Español</span>
          </div>
        </section>
        <section className="mainAdmin__rightt">
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            rerum eius expedita facilis magni odio, ratione quaerat perspiciatis
            eveniet ipsa labore quam eum blanditiis. Quos quas quaerat modi
            ipsam debitis.
          </p>
        </section>
      </main>
    </>
  );
};

export default Admin;
