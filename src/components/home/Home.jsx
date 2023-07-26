
import React, { useState } from "react";
import Header from "../header/Header.jsx";
import Login from "../login/Login.jsx";
import DetallePelicula from "../detallePelicula/DetallePelicula.jsx";
import SeleccionAsientos from "../seleccionAsientos/SeleccionAsientos.jsx";
import SeleccionBoletos from "../seleccionBoletos/SeleccionBoletos.jsx";
import Carrusel from "../carrusel/Carrusel.jsx";
import PagoBoletos from "../pagoBoletos/PagoBoletos.jsx";
import TransaccionExitosa from "../transaccionExitosa/TransaccionExitosa.jsx";
import DescargaBoletos from "../descargaBoletos/DescargaBoletos.jsx";
const Home = () => {


  return (
    <div>
      <Header/>
      <Carrusel/>
      {/* <Login/> */}
      {/* <DetallePelicula/> */}
      {/* <SeleccionBoletos/> */}
      {/* <SeleccionAsientos/> */}
      {/* <PagoBoletos/> */}
      {/* <TransaccionExitosa/> */}
      <DescargaBoletos/>
    </div>
  );
};

export default Home;
