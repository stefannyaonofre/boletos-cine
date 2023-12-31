import React, { useState, useEffect, useContext } from "react";
import logo from "../../assets/logo.jpg";
import user from "../../assets/user.svg";
import "./header.scss";
import { getCinemas } from "../../services/getCinemas";
import { AppContext } from "../../routes/Router";
import Login from "../login/Login";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Header = ({ setGenders }) => {
  const navigate = useNavigate();
  const [dataCinemas, setDataCinemas] = useState([]);
  const {
    setSeleccionTeatro,
    seleccionTeatro,
    setSeleccionFecha,
    isLogin,
    setIsLogin,
    isLoginOpen,
    setIsLoginOpen,
  } = useContext(AppContext);
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    consultCinemas();
  }, [seleccionTeatro]);

  const consultCinemas = async () => {
    const cinema = await getCinemas();
    setDataCinemas(cinema);
  };

  const handleSubmit = (gender) => {
    setGenders(gender);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleLogoClick = () => {
    Swal.fire({
      title: "Serás redirigido a la página principal",
      text: "¿Estás seguro? Deberás empezar de nuevo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2ecc71",
      cancelButtonColor: "#d33",
      confirmButtonText: "Estoy seguro",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      } else {
      }
    });
  };
  return (
    <>
      <header className="header">
        <div className="header__logo" onClick={handleLogoClick}>
          <img src={logo} />
          <span>CINE COLOMBIA</span>
        </div>
        {path == "/" || path === "/admin" ? (
          <div className="header__buttons">
            <button
              className="header__btn"
              onClick={() => handleSubmit("Acción")}
            >
              Accion
            </button>
            <button
              className="header__btn"
              onClick={() => handleSubmit("Terror")}
            >
              Terror
            </button>
            <button
              className="header__btn"
              onClick={() => handleSubmit("Ciencia ficción")}
            >
              Ciencia Ficción
            </button>
            <button
              className="header__btn"
              onClick={() => handleSubmit("Comedia")}
            >
              Comedia
            </button>
          </div>
        ) : (
          ""
        )}
        {path == "/admin" ? (
          ""
        ) : (
          <div className="header__selects">
            <div className="header__teatros">
              <span>Cines cercanos</span>
              <select
                name="select__teatro"
                className="header__teatros-select"
                onChange={(event) => setSeleccionTeatro(event.target.value)}
              >
                <option value={seleccionTeatro}>Seleccione un teatro</option>
                {dataCinemas.map((cine) => (
                  <option value={cine.name} key={cine.id}>
                    {cine.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="header__fecha">
              <span>Fecha</span>
              <select
                name="select__fecha"
                className="header__fecha-selec"
                onChange={(event) => setSeleccionFecha(event.target.value)}
              >
                <option value="fecha">Seleccione una Fecha</option>
                <option value="2023-08-08">2023-08-08</option>
                <option value="2023-08-09">2023-08-09</option>
              </select>
            </div>
            <figure
              className="header__user"
              onClick={() => setIsLoginOpen(!isLoginOpen)}
            >
              <img src={user} />
            </figure>
          </div>
        )}

        {isLoginOpen && (
          <Login signIn={setIsLogin} onClose={handleCloseLogin} />
        )}
      </header>
    </>
  );
};

export default Header;
