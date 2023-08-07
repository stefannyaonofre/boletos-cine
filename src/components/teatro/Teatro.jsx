import React from 'react'
import useForm from '../../hooks/useForm'

const Teatro = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <main className="d-flex justify-content-center align-items-center vw-100 vh-100">
      <form className="card p-5 bg-body-tertiary">
        <div className="mb-3">
          <label className="form-label">
            <span>Nombre cinema</span>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Escriba el nombre del cinema"
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
            />
          </label>
        </div>
        <button type="submit" className="btn btn-success">Agregar Función</button>
      </form>
    </main>
  )
}

export default Teatro