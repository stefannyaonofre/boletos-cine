import React, { useState } from "react";
import Header from "../header/Header.jsx";
import Login from "../login/Login.jsx";
import DetallePelicula from "../detallePelicula/DetallePelicula.jsx";
import SeleccionAsientos from "../seleccionAsientos/SeleccionAsientos.jsx";
import SeleccionBoletos from "../seleccionBoletos/SeleccionBoletos.jsx";
const Home = () => {


  return (
    <div>
      <Header />
      {/* <Login/> */}
      {/* <DetallePelicula/> */}
      {/* <SeleccionBoletos/> */}
      <SeleccionAsientos/>
    </div>
  );
};

export default Home;
