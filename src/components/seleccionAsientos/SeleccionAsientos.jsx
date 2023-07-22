import React from "react";
import "./seleccionAsientos.scss";
const SeleccionAsientos = () => {

  return (
    <div className="chair">
    <div className="chair__left">
      sillitas
    </div>

    <div className="chair__right">
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
          <span>Boletos:</span>
          <span>Número de sala:</span>
          <span>Asientos:</span>

        </div>
      </div>

      <span>
        Se realizara un cargo por servicio por cada boleto dentro de la orden
      </span>
      <h2>Total (IVA incluido):</h2> 
      {/* ${totalBoletos} */}
      <button  >Continuar</button>
      {/* className={botonActivo ? "activeButton" : "inactiveButton"} */}
    </div>
  </div>
  );
};

export default SeleccionAsientos;
