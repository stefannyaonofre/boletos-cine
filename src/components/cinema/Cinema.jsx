import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { saveCinema } from "../../services/getCinemas";
import cancel from "../../assets/cancel.svg";
import "./cinema.scss"
import Swal from "sweetalert2";
const Teatro = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isFormOpen, setIsFormOpen] = useState(true);
  const onSubmit = async (data) => {
    const response = await saveCinema(data);
    if (response) {
      Swal.fire(
        "Cinema Registrado",
        "El Cinema fue registrado con exito",
        "success"
      );
      reset({
        name: "",
        cantidadSalas: "",
      });
    } else {
      Swal.fire(
        "Cinema no registrado",
        "Hubo un problema al registrar el Cinema",
        "error"
      );
      reset({
        name: "",
        cantidadSalas: "",
      });
    }
  };

  return (
    <main className="cinemas d-flex justify-content-center align-items-center vw-100 vh-100">
      {isFormOpen && (
        <form
          className="formulario card p-5 bg-body-tertiary no-padding"
          onSubmit={handleSubmit(onSubmit)}
        >
          <button className="closet" onClick={onClose}>
            <img src={cancel} alt="Close" />
          </button>
          <div className="mb-3">
            <label className="form-label">
              <span>Nombre cinema</span>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Escriba el nombre del cinema"
                {...register("name", { required: true })}
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              <span>Cantidad de Salas</span>
              <input
                type="number"
                className="form-control mt-2"
                placeholder="Escriba la cantidad de salas"
                {...register("cantidadSalas", { required: true })}
              />
            </label>
          </div>
          <button type="submit" className="btn btn-success">
            Agregar Cinema
          </button>
        </form>
      )}
    </main>
  );
};

export default Teatro;
