import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import "./transaccionExitosa.scss";
import useSessionStorage from "../../hooks/useSessionStorage";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailsMovie } from "../../services/getDetailsMovie";
import { getSalas } from "../../services/getSalas";
import { saveTicket } from "../../services/ticket";
import { numberToMoney } from "../../utils/location";
const TransaccionExitosa = () => {
  const key = "teatroFecha";
  const keyFunction = "function";
  const keyBoletos = "boletos";
  const keyAsientos = "asientos";
  const keyInfoPago = "infoPago";
  const { getInfo } = useSessionStorage();
  const teatroFecha = getInfo(key);
  const functions = getInfo(keyFunction);
  const boletos = getInfo(keyBoletos);
  const asientos = getInfo(keyAsientos);
  const pago = getInfo(keyInfoPago);
  const { idMovie } = useParams();
  const [movie, setMovie] = useState([]);
  const [sala, setSala] = useState([]);
  const [codigoTransacion, setCodigoTransacion] = useState();
  const [codigoTarjeta, setCodigoTarjeta] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    detailMovie();
    consultarSala();
    generarCodigoTransaccion();
    numeroTarjeta();
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

  const generarCodigoTransaccion = () => {
    let codigo = "";
    const cantNumber = 6;
    for (let i = 0; i < cantNumber; i++) {
      codigo += Math.floor(Math.random() * 10);
    }
    setCodigoTransacion(codigo);
  };

  const numeroTarjeta = () => {
    const number = Number(pago.form.numeroTarjeta);
    const lastNumbers = number.toString().slice(-4);
    setCodigoTarjeta(lastNumbers);
  }

  const handleTickets = () => {
    const infoComprador = {
      email: pago.form.correo,
      codigoCompra: Number(codigoTransacion),
      StatusTransaction: true
    };

    const newTicket = {
            idFuncion: functions[0].id,
            codigoSilla: asientos,
            comprador: infoComprador,
            fechaCompra: pago.fechaCompra
    }
    saveTicket(newTicket);
    navigate(`/${idMovie}/descarga`)
  }

  return (
    <div className="containerTransaccion">
      <div className="containerTransaccion__up">
        <div className="transaccion">
          <BsCheckCircle style={{ color: '#2ecc71',  strokeWidth: '1', fontSize: '20px' }}/>
          <span>¡Transacción exitosa!</span>
        </div>

        <div className="infCompra">
          <h2>Información de compra</h2>
          <div className="dato">
            <div>
              <span>Código</span>
              <span>#{codigoTransacion}</span>
            </div>
            <div>
              <span>Fecha</span>
              <span>{pago.fechaCompra}</span>
            </div>
            <div>
              <span>Total</span>
              <span>{numberToMoney(boletos.total)}</span>
            </div>
            <div>
              <span>Método de pago</span>
              <p>
                <img src={pago.tipoTarjeta.ruta} />
                <span> - {pago.tipoTarjeta.name} - **** {codigoTarjeta}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="containerTransaccion__down">
        <h3>Resumen de compra</h3>
        <div className="infpel">
          <figure>
            <img
              src={movie?.image}
              alt="pelicula"
            />
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
        <button onClick={handleTickets}>Descargar boletos</button>
      </div>
    </div>
  );
};

export default TransaccionExitosa;
