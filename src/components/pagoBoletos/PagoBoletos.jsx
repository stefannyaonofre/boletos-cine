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
  const keyInfoUser = "infoUser";
  const teatroFecha = getInfo(key);
  const functions = getInfo(keyFunction);
  const boletos = getInfo(keyBoletos);
  const asientos = getInfo(keyAsientos);
  // const infoUser = saveInfo(keyInfoUser)
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
        icon: "Success",
        title: "¡Muy bien!",
        text: "Pago realizado con exito",
      });
      console.log(formulario);
      saveInfo(keyInfoUser, formulario, card);
      navigate(`/${idMovie}/transaccion`);
    }
  };
  const handleClick = (rutaImagen) => {
    // console.log('hice click', tarjeta)
    // const card = tarjeta
    // console.log(card)
    setCard(rutaImagen);
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
            </div>
          </div>

          <div className="datos">
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
                  onClick={() => handleClick(visa)}
                />
                <img
                  className="icon"
                  src={master}
                  alt="master"
                  onClick={() => handleClick(master)}
                />
                <img
                  className="icon"
                  src={amex}
                  alt="amex"
                  onClick={() => handleClick(amex)}
                />
              </figure>
             
            </div>
          </div>
          <div className="cardSelect">
                <span>Haz seleccionado: </span>
              <figure>
                {card ? (
                  <img className="iconSelect" src={card} alt="tarjeta seleccionada" />
                ) : (
                  ""
                )}
              </figure>
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
        <h1>Resumen de compra</h1>
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
        <h2>Total (IVA incluido): {boletos.total}</h2>
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
