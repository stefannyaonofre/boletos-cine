import React from "react";
import Header from "../header/Header";
import { Outlet, useLocation } from "react-router-dom";

const PanelAdmin = () => {

  const location = useLocation();
  const path = location.pathname;

  return (
    <>
    {
      path == "/admin" ? <Header /> : ""

    }
      <Outlet />
    </>
  );
};

export default PanelAdmin;
