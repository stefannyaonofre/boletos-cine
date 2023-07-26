import React, { useState } from "react";
import "./seleccionAsientos.scss";
import Asiento from "../asiento/Asiento";
import { MdChair } from "react-icons/md";
const SeleccionAsientos = () => {
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const generarAsientos = () => {
    const filas = "ABCDE"; // Letras de las filas A a E
    const numeroAsientosPorFila = 6; // Número de asientos por fila-columna
    const asientosOcupados = ["B2", "B3", "B4"]; // Asientos ocupados (ejemplo)

    const asientos = [];
    for (let i = 0; i < filas.length; i++) {
      const fila = filas[i];
      for (let numero = 1; numero <= numeroAsientosPorFila; numero++) {
        const numeroAsiento = `${fila}${numero}`;
        const estado = asientosOcupados.includes(numeroAsiento)
          ? "ocupado"
          : "disponible";
        asientos.push({ letra: fila, numero, estado });
      }
    }
    console.log(asientos);

    return asientos;
  };

  const asientosDisponibles = generarAsientos();

  const handleSeleccionarAsiento = (letra, numero) => {
    const asientoSeleccionado = `${letra}${numero}`;
    // const asientoActual = asientosDisponibles.find((asiento) => asiento.letra === letra && asiento.numero === numero);

    if (asientosSeleccionados.includes(asientoSeleccionado)) {
      // Si el asiento ya está seleccionado, se deselecciona
      setAsientosSeleccionados(
        asientosSeleccionados.filter(
          (asiento) => asiento !== asientoSeleccionado
        )
      );
    } else {
      // Si el asiento no está seleccionado, se agrega a la lista
      setAsientosSeleccionados([...asientosSeleccionados, asientoSeleccionado]);
    }
  };
  return (
    <div className="chair">
      <div className="chair__left">
        <h1>Selecciona tus asientos</h1>
        <span>
          Para cambiar tu lugar asignado da click en el asiento deseado
        </span>
        <div className="tipos">
          <figure>
            <MdChair className="sele" /> <span>Seleccionado</span>
            <MdChair className="ocu" /> <span>Ocupado</span>
            <MdChair className="dis" /> <span>Disponible</span>
          </figure>
        </div>
        <div className="row-labels">
          <div className="row-label">1</div>
          <div className="row-label">2</div>
          <div className="row-label">3</div>
          <div className="row-label">4</div>
          <div className="row-label">5</div>
          <div className="row-label">6</div>
        </div>

        <div className="columChair">
          <div className="column-labels">
            <div className="column-label">A</div>
            <div className="column-label">B</div>
            <div className="column-label">C</div>
            <div className="column-label">D</div>
            <div className="column-label">E</div>
          </div>
          <div className="sillas">
            {asientosDisponibles.map((asiento) => (
              <Asiento
                key={`${asiento.letra}${asiento.numero}`}
                letra={asiento.letra}
                numero={asiento.numero}
                estado={ //si A1 existe en asientos seleccionados, entonces el as ha sido sele por el user
                  asientosSeleccionados.includes(
                    `${asiento.letra}${asiento.numero}`
                  )
                    ? "seleccionado"
                    : asiento.estado //estado ocupado o disponible
                }
                onSeleccionarAsiento={handleSeleccionarAsiento}
              />
            ))}
          </div>
        </div>
        {/* <div className="asientos-seleccionados">
          <h2>Asientos seleccionados:</h2>
          <p>{asientosSeleccionados.join(", ")}</p>
        </div> */}
      </div>

      {/* <!-- /* ------------------- */}

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
            <span>Boletos:se pinta numero boletos</span>
            <span>Número de sala:se pinta numero de sala</span>
            <span>Asientos:{asientosSeleccionados.join(", ")}</span>
          </div>
        </div>

        <span>
          Se realizara un cargo por servicio por cada boleto dentro de la orden
        </span>
        <h2>Total (IVA incluido):</h2>
        {/* ${totalBoletos} */}
        <button>Continuar</button>
        {/* className={botonActivo ? "activeButton" : "inactiveButton"} */}
      </div>
    </div>
  );
};

export default SeleccionAsientos;
