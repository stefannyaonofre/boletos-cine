import React, { useEffect, useState } from 'react'
import "./seleccionBoletos.scss";
const SeleccionBoletos = () => {
  const [publico, setPublico] = useState(0);
  const [mayorEdad, setMayorEdad] = useState(0);
  
  const valorBoleto = 10000;
  const [botonActivo, setBotonActivo] = useState(false); //bandera para el boton continuar
  const handlePlus = (type) => {
    switch (type) {
      case "PUBLICO":
        setPublico((prevValue) => (prevValue < 10 ? prevValue + 1 : prevValue));
        break;
      case "MAYOR":
        setMayorEdad((prevValue) => (prevValue < 10 ? prevValue + 1 : prevValue));
        break;
      default:
        break;
    }
  };
  const handleMinus = (type) => {
    switch (type) {
      case "PUBLICO":
        setPublico((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
        break;
      case "MAYOR":
        setMayorEdad((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
        break;
      default:
        break;
    }
  };
  const totalPublico = publico * valorBoleto;
  const totalMayor = mayorEdad * valorBoleto;
  const totalBoletos = totalPublico + totalMayor;
  //--------------
  useEffect(() => {
    // Verificar si al menos uno de los contadores es mayor que cero
    if (publico > 0 || mayorEdad > 0) {
      setBotonActivo(true); // Si es así, activar el botón
    } else {
      setBotonActivo(false); // Si todos los contadores están en cero, desactivar el botón
    }
  }, [publico, mayorEdad]);
  return (
    <div className="containerBoleto">
    <div className="containerBoleto__left">
      <h1>Selecciona tus boletos</h1>
      <span>Puedes comprar 10 boletos máximo por transacción</span>
      <div className="containerBoleto__left-buttons">
        <div className="div">
          <span>Para todo público</span>
          <button
            className="buttonMinus"
            onClick={() => handleMinus("PUBLICO")}
          >
            -
          </button>
          <span className="number">{publico}</span>
          <button className="buttonPlus" onClick={() => handlePlus("PUBLICO")}>
            +
          </button>
          ${totalPublico}
        </div>

        <div className="div">
          <span>Para mayores de edad</span>
          <button className="buttonMinus" onClick={() => handleMinus("MAYOR")}>
            -
          </button>
          <span className="number">{mayorEdad}</span>
          <button className="buttonPlus" onClick={() => handlePlus("MAYOR")}>
            +
          </button>
          ${totalMayor}
        </div>
      </div>
    </div>

    <div className="containerBoleto__right">
      <h1>Resumen de compra</h1>
      <div className="infpel">
        <figure>
          <img
            src="https://dca.gob.gt/noticias-guatemala-diario-centro-america/wp-content/uploads/2022/04/Strange-estreno-guatemala-DCA.jpeg"
            alt="pelicula"
          />
        </figure>
        <div className="deta">
          <span>Pelicula: Doctor Strange </span>
          <span>Cinema: Marco plaza del mar</span>
          <span>Fecha: 07 de julio de 2023</span>
          <span>Funcion: 7:30 pm</span>
        </div>
      </div>

      <span>
        Se realizara un cargo por servicio por cada boleto dentro de la orden
      </span>
      <h2>Total (IVA incluido): ${totalBoletos}</h2>
      <button  className={botonActivo ? "activeButton" : "inactiveButton"}>Continuar</button>
    </div>
  </div>
  )
}

export default SeleccionBoletos