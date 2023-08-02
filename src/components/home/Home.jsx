
import React, { useState } from "react";
import Header from "../header/Header.jsx";
import Carrusel from "../carrusel/Carrusel.jsx";
import { Outlet } from "react-router-dom";
import PagoBoletos from "../pagoBoletos/PagoBoletos.jsx";
import TransaccionExitosa from "../transaccionExitosa/TransaccionExitosa.jsx";
import DescargaBoletos from "../descargaBoletos/DescargaBoletos.jsx";
import PanelAdmin from "../panelAdmin/PanelAdmin.jsx";
import Admin from "../admin/Admin.jsx";
import Login from "../login/Login.jsx";

const Home = ({setGenders}) => {

  return (
    <div>
      <Header setGenders={setGenders} />
      <Carrusel />
      <Outlet/>
     {/* <Admin/> */}
     
    </div>
  );

};

export default Home;
