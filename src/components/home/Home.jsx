
import React, { useState } from "react";
import Header from "../header/Header.jsx";
import Carrusel from "../carrusel/Carrusel.jsx";
import { Outlet } from "react-router-dom";
const Home = ({setGenders}) => {

  return (
    <div>
      <Header setGenders={setGenders} />
      <Carrusel />
      <Outlet/>
    </div>
  );
};

export default Home;
