import React from "react";
import Header from "../header/Header";
import { Outlet, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PanelAdmin = ({ setGenders }) => {

  const location = useLocation();
  const path = location.pathname;

  return (
    <>
    {
      path == "/admin" ? <Header setGenders={setGenders} /> : ""

    }
      <Outlet />
    </>
  );
};

export default PanelAdmin;
