import React, { useEffect, useState } from 'react'
import { getFunctiosMovie } from '../../services/getFunctionsMovie';
import './cardFunctions.scss'
import Functions from '../functions/Functions';

const CardFunctions = ({idPelicula, idCinema}) => {

    const [horaFunction, setHoraFunction] = useState([])
    const [opened, setOpened] = useState(false)
    
    useEffect(() => {
        functionsCinemas();
    },[])

    const functionsCinemas = async() => {
        const response = await getFunctiosMovie(idPelicula, idCinema);
        setHoraFunction(response)
    }

    const handleClick = () => {
        console.log('hice click')
        setOpened(true)

    }

  return (
    <div className='component d-flex justify-content-around'>
        <div className='component_buttons d-flex buttonsHoras'>
        {
            horaFunction?.map((hora, index) => (
                <button type="button" className="btn btn-outline-secondary"  key={index}>{hora.horarioInicio}</button>
            )) 
        }
        </div>
        <div className='component_new'>
            {opened ? (<Functions />) :(
                <button type="button" onClick={handleClick} className="btn btn-outline-primary">Nueva Función +</button>
            )}
        
        </div>
        
    </div>
  )
}

export default CardFunctions