
import React, { useState } from "react";
import Header from "../header/Header.jsx";
import Login from "../login/Login.jsx";
import DetallePelicula from "../detallePelicula/DetallePelicula.jsx";
import SeleccionAsientos from "../seleccionAsientos/SeleccionAsientos.jsx";
import SeleccionBoletos from "../seleccionBoletos/SeleccionBoletos.jsx";
import Carrusel from "../carrusel/Carrusel.jsx";
import Cartelera from "../cartelera/Cartelera.jsx";
import { Outlet } from "react-router-dom";
const Home = ({setGenders}) => {
  const [adulto, setAdulto] = useState(0);
  const [niño, setNiño] = useState(0);
  const [terceraEdad, setTerceraEdad] = useState(0);

  return (
    <div>
      <Header setGenders={setGenders} />
      <Carrusel />
      {/* <Cartelera genders={genders}/> */}
      {/* <Login/> */}
      {/* <DetallePelicula/> */}
      {/* <SeleccionBoletos
        adulto={adulto}
        setAdulto={setAdulto}
        niño={niño}
        setNiño={setNiño}
        terceraEdad={terceraEdad}
        setTerceraEdad={setTerceraEdad}
      /> */}
      {/* <SeleccionAsientos/> */}
      <Outlet/>
    </div>
  );
};

export default Home;
