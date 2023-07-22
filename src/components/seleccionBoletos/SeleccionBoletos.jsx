import React, { useEffect, useState } from 'react'
import "./seleccionBoletos.scss";
const SeleccionBoletos = () => {
  const [adulto, setAdulto] = useState(0);
  const [niño, setNiño] = useState(0);
  const [terceraEdad, setTerceraEdad] = useState(0);
  
  const valorBoleto = 10000;
  const [botonActivo, setBotonActivo] = useState(false); //bandera para el boton continuar
  const handlePlus = (type) => {
    switch (type) {
      case "ADULTO":
        setAdulto((prevValue) => (prevValue < 10 ? prevValue + 1 : prevValue));
        break;
      case "NIÑO":
        setNiño((prevValue) => (prevValue < 10 ? prevValue + 1 : prevValue));
        break;
      case "TERCERA_EDAD":
        setTerceraEdad((prevValue) =>
          prevValue < 10 ? prevValue + 1 : prevValue
        );
        break;
      default:
        break;
    }
  };
  const handleMinus = (type) => {
    switch (type) {
      case "ADULTO":
        setAdulto((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
        break;
      case "NIÑO":
        setNiño((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
        break;
      case "TERCERA_EDAD":
        setTerceraEdad((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
        break;
      default:
        break;
    }
  };
  const totalAdulto = adulto * valorBoleto;
  const totalNiño = niño * valorBoleto;
  const totalTerceraEdad = terceraEdad * valorBoleto;
  const totalBoletos = totalAdulto + totalNiño + totalTerceraEdad;
  //--------------
  useEffect(() => {
    // Verificar si al menos uno de los contadores es mayor que cero
    if (adulto > 0 || niño > 0 || terceraEdad > 0) {
      setBotonActivo(true); // Si es así, activar el botón
    } else {
      setBotonActivo(false); // Si todos los contadores están en cero, desactivar el botón
    }
  }, [adulto, niño, terceraEdad]);
  return (
    <div className="container">
    <div className="container__left">
      <h1>Selecciona tus boletos</h1>
      <span>Puedes comprar 10 boletos máximo por transacción</span>
      <div className="container__left-buttons">
        <div className="div">
          <span>ADULTO</span>
          <button
            className="buttonMinus"
            onClick={() => handleMinus("ADULTO")}
          >
            -
          </button>
          <span className="number">{adulto}</span>
          <button className="buttonPlus" onClick={() => handlePlus("ADULTO")}>
            +
          </button>
          ${totalAdulto}
        </div>

        <div className="div">
          <span>NIÑO</span>
          <button className="buttonMinus" onClick={() => handleMinus("NIÑO")}>
            -
          </button>
          <span className="number">{niño}</span>
          <button className="buttonPlus" onClick={() => handlePlus("NIÑO")}>
            +
          </button>
          ${totalNiño}
        </div>

        <div className="div">
          <span>TERCERA EDAD</span>
          <button
            className="buttonMinus"
            onClick={() => handleMinus("TERCERA_EDAD")}
          >
            -
          </button>
          <span className="number">{terceraEdad}</span>
          <button
            className="buttonPlus"
            onClick={() => handlePlus("TERCERA_EDAD")}
          >
            +
          </button>
          ${totalTerceraEdad}
        </div>
      </div>
    </div>

    <div className="container__right">
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