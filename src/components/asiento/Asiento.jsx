import React from "react";
import { MdChair } from "react-icons/md";
import "./asiento.scss";
import Swal from "sweetalert2";
const Asiento = ({ letra, numero, estado, onSeleccionarAsiento }) => { //recibe del componente padre
  const handleClick = () => { //cuando el usuario de click en el asiento
    // No permitir seleccionar un asiento ocupado (rojo)
    if (estado !== "ocupado") {
      onSeleccionarAsiento(letra, numero);
    }
    // console.log('hice click', estado)
    else {
      // Mostrar el asiento ocupado en una alerta
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El asiento ${letra}${numero} que has seleccionado se encuentra ocupado, por favor selecciona otro`,
      });
    }
  };
  const classNames = `asiento ${estado} ${estado === "ocupado" ? "no-seleccionable" : ""}`;//agrego la clase no-seleccionable para evitar que el usuario seleccione esse asiento
  return (
    <div>
      <div className={classNames} onClick={handleClick}>
        <figure>
          <MdChair className="asiento__icon" />
        </figure>
      </div>
    </div>
  );
};

export default Asiento;
