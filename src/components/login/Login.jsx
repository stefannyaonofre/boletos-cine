import React, { useEffect, useState } from "react";
import eye from "../../assets/eye.svg";
import eyeShow from "../../assets/eye-show.svg";
import cancel from "../../assets/cancel.svg";
import "./login.scss";
import { getAdmin } from "../../services/getAdmin";
import useSessionStorage from "../../hooks/useSessionStorage";
import Swal from "sweetalert2";
import useForm from "../../hooks/useForm";
const Login = ({ onClose, signIn}) => {
  const key = "user";
  const [dataForm, handleChange, resetForm] = useForm();
  const [showPassword, setShowPassword] = useState(false); //estado bandera para la contraseña
  const [dataAdmin, setDataAdmin] = useState([]);
  const { saveInfo } = useSessionStorage(key);

  //   const consultAdmin = async () => {
  //     const admins = await getAdmin();
  //     setDataAdmin(admins);
  //   };
  //   useEffect(() => {
  //     consultAdmin();
  //     console.log(dataAdmin);
  //   }, []);
  // console.log(dataAdmin)
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(dataForm)
    const loggedUser = await getAdmin(dataForm);
    console.log(loggedUser)
    if (loggedUser) {
      Swal.fire(
        `¡Excelente ${loggedUser.user}!`,
        "Has iniciado sesión exitosamente",
        "success"
      ).then(() => {
        signIn(true);
        saveInfo(key, loggedUser);
      });
    } else {
      Swal.fire(
        "Oopps!",
        "El usuario o contraseña son incorrectas",
        "error"
      );
    }
    console.log(loggedUser);
    resetForm();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="login">
        <button className="login__cancel" onClick={onClose}>
          <img src={cancel} alt="Close" />
        </button>
        <div className="login__text">
          <h1>Bienvenido</h1>
          <h3>Inicia sesión</h3>
        </div>

        <div className="login__email">
          <label>Usuario</label>
          <input
            onChange={handleChange}
            name="name"
            value={dataForm?.name || ""}
            type="text"
            placeholder="Ingresa tu usuario"
          />
        </div>

        <div className="login__password">
          <label>Contraseña</label>
          <input
            onChange={handleChange}
            name="password"
            value={dataForm?.password || ""}
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
          />
          <img
            className="img"
            src={showPassword ? eyeShow : eye}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <div className="login__checkbox">
          <input type="checkbox" />
          <label>Recuerdame</label>
        </div>
        <button className="login__button">Iniciar sesión</button>
      </form>
      {/* <div onSubmit={handleSubmit} className="login">
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
         
        </div>

        <div className="login__checkbox">
          <input type="checkbox" />
          <label>Recuerdame</label>
        </div>
        <button className="login__button">Iniciar sesión</button>
      </div> */}
    </>
  );
};

export default Login;
