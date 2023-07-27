import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import "./transaccionExitosa.scss";
const TransaccionExitosa = () => {
  return (
    <div className="containerTransaccion">
      <div className="containerTransaccion__up">
        <div className="transaccion">
          <BsCheckCircle />
          <span>¡Transacción exitosa!</span>
        </div>

        <div className="infCompra">
          <h2>Información de compra</h2>
          {/* en el div dato se trae y se pinta la info obtenida de los datos de compra */}
          <div className="dato">
            <div>
              <span>Código</span>
              <span>#12345</span>
            </div>
            <div>
              <span>Fecha</span>
              <span>Julio 07, 2023</span>
            </div>
            <div>
              <span>Total</span>
              <span>$40000</span>
            </div>
            <div>
              <span>Método de pago</span>
              <span>Visa</span>
            </div>
          </div>
        </div>
      </div>
      <div className="containerTransaccion__down">
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
        <button>Descargar boletos</button>
      </div>
    </div>
  );
};

export default TransaccionExitosa;
