import React, { useEffect, useState } from "react";
import "./pagoBoletos.scss";
import master from "../../assets/master.svg";
import visa from "../../assets/visa.svg";
import amex from "../../assets/amex.svg";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailsMovie } from "../../services/getDetailsMovie";
import useSessionStorage from "../../hooks/useSessionStorage";
import { getSalas } from "../../services/getSalas";
import { numberToMoney } from "../../utils/location";

const PagoBoletos = () => {
  const [botonActivo, setBotonActivo] = useState(false);
  const [formulario, setFormulario] = useState({
    correo: "",
    nombreTarjeta: "",
    numeroTarjeta: "",
    fecha: "",
    cvv: "",
  });
  const [movie, setMovie] = useState([]);
  const { getInfo, saveInfo } = useSessionStorage();
  const [sala, setSala] = useState([]);
  const key = "teatroFecha";
  const keyFunction = "function";
  const keyBoletos = "boletos";
  const keyAsientos = "asientos";
  const keyInfoPago = "infoPago";
  const teatroFecha = getInfo(key);
  const functions = getInfo(keyFunction);
  const boletos = getInfo(keyBoletos);
  const asientos = getInfo(keyAsientos);
  const { idMovie } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState("");

  useEffect(() => {
    detailMovie();
    consultarSala();
  }, []);

  const detailMovie = async () => {
    const detail = await getDetailsMovie(idMovie);
    setMovie(detail);
  };

  const consultarSala = async () => {
    const detailSala = await getSalas();
    const filter = detailSala.filter((item) => item.id == functions[0].idSala);
    setSala(filter);
  };

  const handleInputChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setFormulario({
      //actualiza el estado del formulario
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
    const formularioCompleto = camposDiligenciados.every(
      (
        campo //verifica cada uno
      ) =>
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
      "tipoTarjeta",
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
        text: `Faltan campos por diligenciar:  ${camposFaltantes}`,
      });
    } else {
      //  logica para procesar el pago si todos los campos están diligenciados correctamente
      //
      Swal.fire({
        icon: "success",
        title: "¡Muy bien!",
        text: "Pago realizado con exito",
      });
      const infoFecha = new Date();
      const dia = infoFecha.getDate();
      const mes = infoFecha.getMonth();
      const anio = infoFecha.getFullYear();

      const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];

      const fecha = `${dia < 10 ? "0" : ""}${dia} de ${meses[mes]} de ${anio}`;
      const newObjectPago = {
        form: formulario,
        tipoTarjeta: card,
        fechaCompra: fecha
      };
      saveInfo(keyInfoPago, newObjectPago);
      navigate(`/${idMovie}/transaccion`);
    }
  };
  const handleClick = (rutaImagen, nombre) => {
    const newCard = {
      ruta: rutaImagen,
      name: nombre,
    };
    setCard(newCard);
  };
  return (
    <div className="containerPago">
      <div className="containerPago__left">
        <h2>Información personal</h2>
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
            </div>
          </div>

          <div className="datos d-flex justify-content-center">
            <label>Número de la tarjeta</label>
            <div className="inputt">
              <input
                type="text"
                name="numeroTarjeta"
                placeholder="1234 1234 1234"
                value={formulario.numeroTarjeta}
                onChange={handleInputChange}
              />
              <figure className="icons">
                <img
                  className="icon"
                  src={visa}
                  alt="visa"
                  onClick={() => handleClick(visa, "visa")}
                />
                <img
                  className="icon"
                  src={master}
                  alt="master"
                  onClick={() => handleClick(master, "master")}
                />
                <img
                  className="icon"
                  src={amex}
                  alt="amex"
                  onClick={() => handleClick(amex, "amex")}
                />
              </figure>
            </div>
          </div>
          <div className="cardSelect">
            <span>Haz seleccionado: </span>
            <div>
              {card.name ? <span>{card.name}</span> : ""}
              {card.name && card.ruta ? " " : ""}
              {card.ruta ? (
                <img
                  className="iconSelect"
                  src={card.ruta}
                  alt="tarjeta seleccionada"
                />
              ) : (
                ""
              )}
            </div>
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

      <div className="containerPago__right">
        <h3>Resumen de compra</h3>
        <div className="infpel">
          <figure>
            <img src={movie?.image} alt="pelicula" />
          </figure>
          <div className="deta">
            <span>Pelicula: {movie?.name} </span>
            <span>Cinema: {teatroFecha.teatro}</span>
            <span>Fecha: {teatroFecha.fecha}</span>
            <span>Funcion: {functions[0].horarioInicio}</span>
            <span>Boletos: {boletos.cantBoletos}</span>
            <span>Número de sala: {sala[0]?.name}</span>
            <span>Asientos: {asientos?.map((item) => item).join(", ")}</span>
          </div>
        </div>

        <span>
          Se realizara un cargo por servicio por cada boleto dentro de la orden
        </span>
        <h5>Total (IVA incluido): {numberToMoney(boletos.total)}</h5>
        <button
          className={botonActivo ? "activeButton" : "inactiveButton"}
          onClick={handlePagarAhora}
        >
          Pagar ahora
        </button>
      </div>
    </div>
  );
};

export default PagoBoletos;
