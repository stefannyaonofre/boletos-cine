
import React, { useState } from "react";
import Header from "../header/Header.jsx";
import Login from "../login/Login.jsx";
import DetallePelicula from "../detallePelicula/DetallePelicula.jsx";
import SeleccionAsientos from "../seleccionAsientos/SeleccionAsientos.jsx";
import SeleccionBoletos from "../seleccionBoletos/SeleccionBoletos.jsx";
import Carrusel from "../carrusel/Carrusel.jsx";
import Cartelera from "../cartelera/Cartelera.jsx";
import { Outlet } from "react-router-dom";
import PagoBoletos from "../pagoBoletos/PagoBoletos.jsx";
import TransaccionExitosa from "../transaccionExitosa/TransaccionExitosa.jsx";
import DescargaBoletos from "../descargaBoletos/DescargaBoletos.jsx";
import PanelAdmin from "../panelAdmin/PanelAdmin.jsx";
import Admin from "../admin/Admin.jsx";
const Home = ({setGenders}) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
     return (
      <div>
        {/* <Header
          setIsLoginOpen={setIsLoginOpen}
          isLoginOpen={isLoginOpen}
          setGenders={setGenders}
        /> */}
        {/* <Carrusel /> */}
        {/* <Cartelera genders={genders}/> */}
        {/* <PanelAdmin/>
        <Outlet /> */}
        <Admin/>
      </div>
    );
};

export default Home;
