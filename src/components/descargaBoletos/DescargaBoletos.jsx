import React from 'react'
import './descargaBoletos.scss'
import QRCode from "react-qr-code";

const DescargaBoletos = () => {
  return (
    <div className='containerPago'>
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
            <div>
            <QRCode value="www.google.com" />
            </div>

    </div>
  )
}

export default DescargaBoletos