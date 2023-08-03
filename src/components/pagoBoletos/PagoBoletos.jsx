import React, { useState } from "react";
import "./pagoBoletos.scss";
import master from "../../assets/master.svg";
import visa from "../../assets/visa.svg";
import amex from "../../assets/amex.svg";
import Swal from "sweetalert2";
import useSessionStorage from "../../hooks/useSessionStorage";
import { useParams } from "react-router-dom";

const PagoBoletos = () => {
  const [botonActivo, setBotonActivo] = useState(false);
  const [formulario, setFormulario] = useState({
    correo: "",
    nombreTarjeta: "",
    numeroTarjeta: "",
    fecha: "",
    cvv: "",
  });
  const key = "teatroFecha";
  const keyFunction = "function";
  const keyBoletos = "boletos";
  const keyAsientos = "asientos";
  const { getInfo, saveInfo } = useSessionStorage();
  const { idMovie } = useParams();

  const handleInputChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setFormulario({ //actualiza el estado del formulario
      ...formulario,
      [inputName]: inputValue,
    });

    // Verificar si todos los campos obligatorios están diligenciados
    const camposDiligenciados = [
      "correo",
      "nombreTarjeta",
      "numeroTarjeta",
      "fecha",
      "cvv",
    ];
    const formularioCompleto = camposDiligenciados.every((campo) => //verifica cada uno 
      campo === "correo" ||
      campo === "nombreTarjeta" ||
      campo === "numeroTarjeta" ||
      campo === "fecha" ||
      campo === "cvv"
        ? formulario[campo] !== ""
        : formulario[campo] !== ""
    );

    setBotonActivo(formularioCompleto); //si estan diligenciados se activa el boton de continuar a pago
  
    
  };
  const handlePagarAhora = () => {
    // Verificar si algún campo obligatorio está vacío
    const camposDiligenciados = [
      "correo",
      "nombreTarjeta",
      "numeroTarjeta",
      "fecha",
      "cvv",
    ];
    const camposFaltantes = camposDiligenciados.filter(
      (campo) => formulario[campo] === "" 
    );

    if (camposFaltantes.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: `Faltan campos por diligenciar:  ${camposFaltantes}` ,
      });
    } else {
      //  logica para procesar el pago si todos los campos están diligenciados correctamente
      // 
      console.log("Pago realizado con éxito!");
      console.log(formulario)
    }
  };
  return (
    <div className="containerPago">
      <div className="containerPago__left">
        <h1>Información personal</h1>
        <span>Completa los datos del formulario para realizar el pago.</span>
        <div className="containerPago__left-info">
          <div className="datos">
            <label>Correo electrónico</label>
            <input
              type="text"
              name="correo"
              placeholder="Ingrese su correo electrónico"
              value={formulario.correo}
              onChange={handleInputChange}
            />
          </div>

          <div className="datos">
            <label>Nombre de la tarjeta</label>
            <div className="inputt">
              <input
                type="text"
                name="nombreTarjeta"
                placeholder="Ingrese el nombre de la tarjeta"
                value={formulario.nombreTarjeta}
                onChange={handleInputChange}
              />

              <figure className="icons">
                <img className="icon" src={visa} alt="visa" />
                <img className="icon" src={master} alt="master" />
                <img className="icon" src={amex} alt="amex" />
              </figure>
            </div>
          </div>

          <div className="datos">
            <label>Número de la tarjeta</label>
            <input
              type="text"
              name="numeroTarjeta"
              placeholder="1234 1234 1234"
              value={formulario.numeroTarjeta}
              onChange={handleInputChange}
            />
          </div>
          <div className="date">
            <div className="date1">
              <label>Seleccione una fecha</label>
              <input
                type="date"
                name="fecha"
                placeholder="MM/YY"
                value={formulario.fecha}
                onChange={handleInputChange}
              />
            </div>
            <div className="date1">
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                placeholder="Enter CVV"
                value={formulario.cvv}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="containerPago__right card p-3 bg-body-secondary">
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
            <span>Boletos:se pinta numero boletos</span>
            <span>Número de sala:se pinta numero de sala</span>
            <span>Asientos:</span>
          </div>
        </div>

        <span>
          Se realizara un cargo por servicio por cada boleto dentro de la orden
        </span>
        <h2>Total (IVA incluido): </h2>
        {/* ${totalBoletos} */}
        <button className={botonActivo ? "activeButton" : "inactiveButton"}
        onClick={handlePagarAhora}>
          Pagar ahora
        </button>
      </div>
    </div>
  );
};

export default PagoBoletos;
