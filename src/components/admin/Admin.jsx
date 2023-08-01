import React from "react";
import "./admin.scss";
import logo from "../../assets/logo.jpg";
import admin from "../../assets/admin.svg";
import tools from "../../assets/tools.svg";
const Admin = () => {
  return (
    <>
      <header className="headerAdmin">
        <div className="headerAdmin__logo">
          <img src={logo} alt="CineColombia"/>
          <span>CINE COLOMBIA</span>
        </div>
        <div className="headerAdmin__user">
          <div className="perfil">
          <figure>
            <img src={admin} alt="Administrador" />
          </figure>
          <div className="date">
          <span>Stefannya Onofre</span>
          <span>View profile</span>
          </div>
        </div>
        <figure className="tools">
          <img className="tool" src={tools} alt="Configuracion" />
        </figure>
        </div>
      </header>
    </>
  );
};

export default Admin;
