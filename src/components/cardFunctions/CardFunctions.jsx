import React, { useEffect, useState } from "react";
import { getFunctiosMovie } from "../../services/getFunctionsMovie";
import "./cardFunctions.scss";
import Functions from "../functions/Functions";
import { deleteFunction } from "../../services/getFunctions";
import Swal from "sweetalert2";

const CardFunctions = ({ idPelicula, idCinema, onClose }) => {
  const [horaFunction, setHoraFunction] = useState([]);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    functionsCinemas();
  }, []);

  const functionsCinemas = async () => {
    const response = await getFunctiosMovie(idPelicula, idCinema);
    setHoraFunction(response);
  };

  const handleClick = () => {
    setOpened(true);
  };
  const handleCloseForm = () => {
    setOpened(false);
  };

  const handleDelete = async (id) => {
    const response = await deleteFunction(id);
    if(!response){
        Swal.fire(
            "Función Eliminada",
            "La Función fue eliminada con exito",
            "success"
          );
    }else{
        Swal.fire(
            "Función No Eliminada",
            "La Función no pudo ser eliminada",
            "success"
          );
    }
  }

  return (
    <div className="component d-flex justify-content-around">
      <div className="component_buttons d-flex buttonsHoras">
        {horaFunction?.map((hora, index) => (
          <span key={index}> 
            <button
              type="button"
              className="btn btn-outline-secondary"
            >
              {hora.horarioInicio}
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
              onClick={() => handleDelete(hora.id)}
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg>
          </span>
        ))}
      </div>
      <div className="component_new">
        {opened ? (
          <Functions onClose={handleCloseForm} />
        ) : (
          <button
            type="button"
            onClick={handleClick}
            className="btn btn-outline-primary"
          >
            Nueva Función +
          </button>
        )}
      </div>
    </div>
  );
};

export default CardFunctions;
