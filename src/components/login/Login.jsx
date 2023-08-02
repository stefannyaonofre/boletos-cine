import React, { useEffect, useState } from "react";
import eye from "../../assets/eye.svg";
import eyeShow from "../../assets/eye-show.svg";
import cancel from "../../assets/cancel.svg";
import "./login.scss";
import { getAdmin } from "../../services/getAdmin";
const Login = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [dataAdmin, setDataAdmin] = useState([]);

  const consultAdmin = async () => {
    const admins = await getAdmin();
    setDataAdmin(admins);
  };
  useEffect(() => {
    consultAdmin();
    console.log(dataAdmin);
  }, []);
console.log(dataAdmin)
  return (
    <>
      <div className="login">
        <button className="login__cancel" onClick={onClose}>
          <img src={cancel} alt="Close" />
        </button>

        <div className="login__text">
          <h1>Bienvenido</h1>
          <h3>Inicia sesión</h3>
        </div>

        <div className="login__email">
          <label>Usuario</label>
          <input type="text" placeholder="Ingresa tu usuario" />
        </div>

        <div className="login__password">
          <label>Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
          />
          <img
            className="img"
            src={showPassword ? eyeShow : eye}
            onClick={() => setShowPassword(!showPassword)}
          />
          {/* <img className="img" src={eyeShow} /> */}
        </div>

        <div className="login__checkbox">
          <input type="checkbox" />
          <label>Recuerdame</label>
        </div>
        <button className="login__button">Iniciar sesión</button>
      </div>
    </>
  );
};

export default Login;
