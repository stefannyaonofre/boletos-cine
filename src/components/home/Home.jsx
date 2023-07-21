
import React, { useState } from "react";
import Header from "../header/Header.jsx";
import Login from "../login/Login.jsx";
import DetallePelicula from "../detallePelicula/DetallePelicula.jsx";
import SeleccionAsientos from "../seleccionAsientos/SeleccionAsientos.jsx";
import SeleccionBoletos from "../seleccionBoletos/SeleccionBoletos.jsx";
const Home = () => {
  const [adulto, setAdulto] = useState(0);
  const [niño, setNiño] = useState(0);
  const [terceraEdad, setTerceraEdad] = useState(0);

  return (
    <div>
      <Header />
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
      <SeleccionAsientos/>
    </div>
  );
};

export default Home;
