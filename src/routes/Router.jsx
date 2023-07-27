import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/home/Home.jsx";
import PublicRouter from "./PublicRouter.jsx";
import Cartelera from "../components/cartelera/Cartelera.jsx";
import Admin from "../components/admin/Admin.jsx";
import PrivateRouter from "./PrivateRouter.jsx";
import DetallePelicula from "../components/detallePelicula/DetallePelicula.jsx";
import { createContext } from "react";

export const AppContext = createContext({});

const Router = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [genders, setGenders] = useState("");
  const [movieDetail, setMovieDetail] = useState();

  return (
    <AppContext.Provider value={{movieDetail, setMovieDetail}}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route element={<PublicRouter isAutenticate={isLogin} />}>
              <Route path="home" element={<Home setGenders={setGenders} />}>
                <Route index element={<Cartelera genders={genders} />} />
                <Route path="detalle" element={<DetallePelicula />} />
              </Route>
            </Route>
            <Route element={<PrivateRouter isAutenticate={isLogin} />}>
              <Route index element={<Admin signIn={setIsLogin} />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default Router;
