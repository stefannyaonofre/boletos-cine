import React, { useEffect, useState } from "react";
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
import PagoBoletos from "../components/pagoBoletos/PagoBoletos.jsx";
import TransaccionExitosa from "../components/transaccionExitosa/TransaccionExitosa.jsx";
import PanelAdmin from "../components/panelAdmin/PanelAdmin.jsx";
import DescargaBoletos from "../components/descargaBoletos/DescargaBoletos.jsx";
import useSessionStorage from "../hooks/useSessionStorage.jsx";

export const AppContext = createContext({});

const Router = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [genders, setGenders] = useState("");
  const [movieDetail, setMovieDetail] = useState();
  const [seleccionTeatro, setSeleccionTeatro] = useState();
  const [seleccionFecha, setSeleccionFecha] = useState();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const key= "user";
  const {getInfo} = useSessionStorage()
  const user = getInfo(key);

  useEffect(() => {
    if(user?.name){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  },[isLogin])



  return (
    <AppContext.Provider
      value={{
        movieDetail,
        setMovieDetail,
        seleccionTeatro,
        setSeleccionTeatro,
        seleccionFecha,
        setSeleccionFecha,
        isLogin,
        setIsLogin,
        isLoginOpen,
        setIsLoginOpen,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route element={<PublicRouter isAutenticate={isLogin} />}>
              <Route element={<Home setGenders={setGenders} />}>
                <Route index element={<Cartelera genders={genders} />} />
                <Route path=":idMovie" element={<DetallePelicula />} />
                <Route path=":idMovie/boletos" element={<SeleccionBoletos />} />
                <Route
                  path=":idMovie/asientos"
                  element={<SeleccionAsientos />}
                />
                <Route path=":idMovie/pagos" element={<PagoBoletos />} />
                <Route
                  path=":idMovie/transaccion"
                  element={<TransaccionExitosa />}
                />
                <Route path=":idMovie/descarga" element={<DescargaBoletos />}/>
              </Route>
            </Route>
            <Route element={<PrivateRouter isAutenticate={isLogin} />}>
              <Route path="admin" element={<PanelAdmin />}>
                <Route index element={<Cartelera genders={genders}/>} />
                <Route path=":idMovie" element={<Admin />}/>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default Router;
