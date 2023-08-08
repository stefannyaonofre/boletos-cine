import React from "react";
import { useForm } from "react-hook-form";
import "./functions.scss";
import { saveFunction } from "../../services/getFunctions";
import Swal from "sweetalert2";
const Functions = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await saveFunction(data);
    if (response) {
      Swal.fire(
        "Función Registrada",
        "La Función fue registrada con exito",
        "success"
      );
    }else{
      Swal.fire(
        'Función no registrada',
        'Hubo un problema al registrar la función',
        'error'
      )
      reset({
        idPelicula: "",
        idSala: "",
        horarioInicio:"",
        price: "",
        fecha: "",
        cinemasId: ""
      })
    }
  };

  return (
    <main className="functions d-flex justify-content-center align-items-center vw-100 vh-100">
      <form
        className="card p-5 bg-body-tertiary"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-3">
          <label className="form-label">
            <span>Id Pelicula</span>
            <input
              type="number"
              className="form-control mt-2"
              placeholder="Escriba el id de la pelicula"
              {...register("idPelicula", { required: true })}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            <span>Id Sala</span>
            <input
              type="number"
              className="form-control mt-2"
              placeholder="Escriba el id de la sala"
              {...register("idSala", { required: true })}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            <span>Horario de inicio</span>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Escriba el horario de inicio"
              {...register("horarioInicio", { required: true })}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            <span>Precio</span>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Escriba el precio"
              {...register("price", { required: true })}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            <span>Fecha Función</span>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Escriba la fecha de la función"
              {...register("fecha", { required: true })}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            <span>Id Cinema</span>
            <input
              type="number"
              className="form-control mt-2"
              placeholder="Escriba el id del cinema"
              {...register("cinemasId", { required: true })}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-success">
          Agregar Función
        </button>
      </form>
    </main>
  );
};

export default Functions;
