import React from 'react';
import logo from '../../assets/logo.jpg';

const Header = () => {
  return (
    <>
      <header>
        <section className='menu'>
          <div>
            <img src={logo} />
            <span>CINE COLOMBIA</span>
          </div>
        </section>
        <section className='carrusel'></section>
      </header>
    </>
  )
}

export default Header