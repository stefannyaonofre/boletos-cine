import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/home/Home.jsx";
import PublicRouter from "./PublicRouter.jsx";
import Cartelera from "../components/cartelera/Cartelera.jsx";
import Admin from "../components/admin/Admin.jsx";
import PrivateRouter from "./PrivateRouter.jsx";
import DetallePelicula from "../components/detallePelicula/DetallePelicula.jsx";
import { createContext } from "react";
import SeleccionBoletos from "../components/seleccionBoletos/SeleccionBoletos.jsx";
import SeleccionAsientos from "../components/seleccionAsientos/SeleccionAsientos.jsx";

export const AppContext = createContext({});

const Router = () => {
  const [ isLogin, setIsLogin ] = useState(false);
  const [ genders, setGenders ] = useState("");
  const [ movieDetail, setMovieDetail ] = useState();
  const [ seleccionTeatro, setSeleccionTeatro ] = useState();
  const [ seleccionFecha, setSeleccionFecha ] = useState();

  return (
    <AppContext.Provider value={{movieDetail, setMovieDetail, seleccionTeatro, setSeleccionTeatro, seleccionFecha, setSeleccionFecha, isLogin, setIsLogin}}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route element={<PublicRouter isAutenticate={isLogin} />}>
              <Route element={<Home setGenders={setGenders} />}>
                <Route index element={<Cartelera genders={genders} />} />
                <Route path="detalle/:idMovie" element={<DetallePelicula />} />
                <Route path="detalle/:idMovie/boletos" element={<SeleccionBoletos/>}/>
                <Route path="detalle/:idMovie/boletos/asientos" element={<SeleccionAsientos />}/>
              </Route>
            </Route>
            <Route element={<PrivateRouter isAutenticate={isLogin} />}>
              <Route path="admin" element={<Admin signIn={setIsLogin} />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default Router;
