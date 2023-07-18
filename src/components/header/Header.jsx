import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.jpg';
import user from '../../assets/user.svg';
import './header.scss';
import { getCinemas } from '../../services/getCinemas';

const Header = () => {

  const [dataCinemas, setDataCinemas] = useState([]);

  useEffect(() => {
    
    consultCinemas();
    console.log(dataCinemas)
    
  },[])

  const consultCinemas = async() => {
    const cinema = await getCinemas();
    setDataCinemas(cinema);
  };
  
  

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <img src={logo} />
          <span>CINE COLOMBIA</span>
        </div>
        <div className="header__buttons">
          <button className="header__btn">Accion</button>
          <button className="header__btn">Terror</button>
          <button className="header__btn">Ciencia Ficción</button>
          <button className="header__btn">Comedia</button>
        </div>
        <div className="header__selects">
          <div className="header__teatros">
            <span>Cines cercanos</span>
            <select name="select__teatro" className="header__teatros-select">
              <option value="teatro1">Seleccione un teatro</option>
              {
                dataCinemas.map(cine => (
                  <option value="teatro" key={cine.id}>{cine.name}</option>
                ))
              }
            </select>
          </div>
          <div className="header__fecha">
            <span>Fecha</span>
            <select name="select__fecha" className="header__fecha-selec">
              <option value="fecha">07 de Julio</option>
            </select>
          </div>
          <figure className="header__user">
            <img src={user} />
          </figure>
        </div>
      </header>
    </>
  );
}

export default Header