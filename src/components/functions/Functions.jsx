import React from 'react'

const Functions = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  return (
    <main className="d-flex justify-content-center align-items-center vw-100 vh-100">
      <form className="card p-5 bg-body-tertiary">
        <div className="mb-3">
          <label className="form-label">
            <span>Id Pelicula</span>
            <input
              type="number"
              className="form-control mt-2"
              placeholder="Escriba el id de la pelicula"
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
            />
          </label>
        </div>
        <button type="submit" className="btn btn-success">Agregar Función</button>
      </form>
    </main>
  )
}

export default Functions