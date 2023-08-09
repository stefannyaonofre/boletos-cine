import React, { useEffect, useState } from "react";
import "./descargaBoletos.scss";
import QRCode from "react-qr-code";
import { v4 as uuidv4 } from "uuid";
import useSessionStorage from "../../hooks/useSessionStorage";
import { useParams } from "react-router-dom";
import { getSalas } from "../../services/getSalas";
import { getDetailsMovie } from "../../services/getDetailsMovie";

const DescargaBoletos = () => {
   const uniqueRandomText = uuidv4().toUpperCase().substring(0,7);
   const qrCodeValue ='www.google.com'; // `www.google.com/${uniqueRandomText}`
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

  useEffect(() => {
    detailMovie();
    consultarSala();
  },[])

  const detailMovie = async () => {
    const detail = await getDetailsMovie(idMovie);
    setMovie(detail);
  };

  const consultarSala = async () => {
    const detailSala = await getSalas();
    const filter = detailSala.filter((item) => item.id == functions[0].idSala);
    setSala(filter);
  };
  
   return (
    <div className="descargaBoletos">
      <div className="containerQr">
      <h2>Boletos</h2>
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
          <span>Número de sala: {sala[0]?.name}</span>
          <span>Asientos: {asientos?.map((item) => item).join(", ")}</span>
        </div>
      </div>
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 150,
          width: "100%",
        }}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={qrCodeValue}
          viewBox={`0 0 256 256`}
        />
      </div>
      <p>{uniqueRandomText}</p>

    </div>
    </div>
    
  );
};

export default DescargaBoletos;
