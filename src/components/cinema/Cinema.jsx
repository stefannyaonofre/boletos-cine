import React from 'react'
import { useForm } from 'react-hook-form';
import { saveCinema } from '../../services/getCinemas';

const Teatro = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const response = await saveCinema(data);
        if (response) {
          Swal.fire(
            "Cinema Registrad",
            "El Cinema fue registrado con exito",
            "success"
          );
        }else{
          Swal.fire(
            'Cinema no registrado',
            'Hubo un problema al registrar el Cinema',
            'error'
          )
          reset({
            name: "",
            cantidadSalas: ""
          })
        }
      }

  return (
    <main className="d-flex justify-content-center align-items-center vw-100 vh-100">
      <form className="card p-5 bg-body-tertiary" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">
            <span>Nombre cinema</span>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Escriba el nombre del cinema"
              {...register('name', {required: true})}
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
              {...register('cantidadSalas', {required: true})}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-success">Agregar Función</button>
      </form>
    </main>
  )
}

export default Teatro