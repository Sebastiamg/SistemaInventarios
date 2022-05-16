import './navBar.css';
import React from 'react';
import Logo from './hsbcadlogo.png'


function NavBar(props) {

  return (
    <nav className="navBar-container ">
      <div className="content-div1 ">
        <button ><img src={ Logo } className="icon-init"  alt="init"/></button>
      </div>
    </nav>
  );
}
  
export default NavBar; 