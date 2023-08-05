import React from "react";
import "./descargaBoletos.scss";
import QRCode from "react-qr-code";
import { v4 as uuidv4 } from "uuid";
const DescargaBoletos = () => {
   const uniqueRandomText = uuidv4().toUpperCase().substring(0,7);
   const qrCodeValue ='www.google.com'; // `www.google.com/${uniqueRandomText}`
  return (
    <div className="containerQr">
      <h1>Boletos</h1>
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
          <span>Número de sala:se pinta numero de sala</span>
          <span>Asientos: se pintan los asientos</span>
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
  );
};

export default DescargaBoletos;
