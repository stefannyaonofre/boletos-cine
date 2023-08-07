import React from 'react'

const Functions = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <main className="d-flex justify-content-center align-items-center vw-100 vh-100">
      <form className="card p-5 bg-body-tertiary" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">
            <span>Id Pelicula</span>
            <input
              type="number"
              className="form-control mt-2"
              placeholder="Escriba el id de la pelicula"
              {...register('idPelicula', {required: true})}
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
              {...register('idSala', {required: true})}
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
              {...register('horarioInicio', {required: true})}
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
              {...register('price', {required: true})}
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
              {...register('fecha', {required: true})}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-success">Agregar Función</button>
      </form>
    </main>
  )
}

export default Functions