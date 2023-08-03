import React, { useEffect, useState } from 'react'
import "./seleccionBoletos.scss";
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailsMovie } from '../../services/getDetailsMovie';
import useSessionStorage from '../../hooks/useSessionStorage';

const SeleccionBoletos = () => {
  const [publico, setPublico] = useState(0);
  const [mayorEdad, setMayorEdad] = useState(0);
  const [movie, setMovie] = useState([]);
  const { idMovie } = useParams()
  const { getInfo, saveInfo } = useSessionStorage();
  const key = 'teatroFecha';
  const keyFunction = 'function';
  const keyBoletos = 'boletos';
  const teatroFecha = getInfo(key);
  const functions = getInfo(keyFunction);
  const navigate = useNavigate();
  
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
    detailMovie();
    // Verificar si al menos uno de los contadores es mayor que cero
    if (publico > 0 || mayorEdad > 0) {
      setBotonActivo(true); // Si es así, activar el botón
    } else {
      setBotonActivo(false); // Si todos los contadores están en cero, desactivar el botón
    }
  }, [publico, mayorEdad]);

  const detailMovie = async () => {
    const detail = await getDetailsMovie(idMovie);
    setMovie(detail);
  };

  const continueSelection = () => {
    const newObject = {
      cantBoletos: publico + mayorEdad,
      total: totalBoletos
    }
    saveInfo(keyBoletos, newObject)
    navigate(`/${idMovie}/asientos`)
  }

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

    <div className="containerBoleto__right card p-3 bg-body-secondary">
      <h1>Resumen de compra</h1>
      <div className="infpel">
        <figure>
          <img src={movie?.image} alt="pelicula"/>
        </figure>
        <div className="deta">
          <span>Pelicula: {movie?.name} </span>
          <span>Cinema: {teatroFecha.teatro}</span>
          <span>Fecha: {teatroFecha.fecha}</span>
          <span>Funcion: {functions[0].horarioInicio}</span>
        </div>
      </div>

      <span>
        Se realizara un cargo por servicio por cada boleto dentro de la orden
      </span>
      <h2>Total (IVA incluido): ${totalBoletos}</h2>
      <button  className={botonActivo ? "activeButton" : "inactiveButton"} onClick={continueSelection}>Continuar</button>
    </div>
  </div>
  )
}

export default SeleccionBoletos