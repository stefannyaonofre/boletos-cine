import React from 'react'
import './detallePelicula.scss';
const DetallePelicula = () => {
  return (
   <section className='details'>
    <article className='details__start'>
      <div className='details__start-movie'>
        <figure>
          <img src="https://dca.gob.gt/noticias-guatemala-diario-centro-america/wp-content/uploads/2022/04/Strange-estreno-guatemala-DCA.jpeg" alt="pelicula" />
        </figure>
        <div className='all'>
        <h1>Doctor Strange </h1>
        <span>Doctor strange: EUA (2021)</span>

        <div className='buttons'>
        <button>B</button>
        <button>148 min</button>
        <button>Acción y aventura</button>
        </div>
        </div>
      </div>

      <div className='details__start-info'>
        <h1>Horarios disponibles: 07 de julio</h1>
        <span>Elige el horario que prefieras</span>
        <span>Marco plaza del mar</span>
        <div className='buttons'>
          <button>18:00</button>
          <button>19:00</button>
          <button>21:30</button>
        </div>
        <button className='bol'>Seleccionar boletos</button>
      </div>
      </article>

      <article className='details__end'>
       <h1>Trailer</h1>
       <figure>
        <img src="https://variety.com/wp-content/uploads/2022/02/Dr.-Strange.png?w=1000&h=549&crop=1" alt="video" />
       </figure>
       <h2>Sipnosis</h2>
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo qui temporibus et maxime quis numquam veritatis suscipit molestias laborum nesciunt ducimus ea, molestiae eaque aperiam esse. Excepturi tempore maiores accusamus.</p>
      </article>
    </section>
  )
}

export default DetallePelicula