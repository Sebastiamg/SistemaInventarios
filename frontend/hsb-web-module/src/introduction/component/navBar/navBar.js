import './navBar.css';
import React from 'react';
// import {NavLink, Router} from 'react-router-dom'
import Logo from './hsbcadlogo.png'
import User from './user.png'

function NavBar() {

    return (
      <nav className="navBar-container">
        <div className="content-div1 ">
          <button onClick={()=>{window.location.href="/activities"}} ><img  className="icon-init" src={ Logo } alt="init"/></button>
          <div className="dropdown">
              <button className="menu" ><img  src="https://cdn-icons-png.flaticon.com/128/1828/1828726.png" alt="menu"/></button>
                  <div className="dropdown-content">
                    
                      <a href="/activities/FixedAssets" >Fixed Assets</a>
                      <a href="/activities/Expenses" >Expenses</a>
                      <a href="/activities/HumanResources" >Human Resources</a>
                    
                  </div>
          </div>
        </div>

        <div className="content-div2 ">
          <button ><img src={ User } alt="user"/></button>
          <button className="user-out" translate="yes" onClick={()=>{sessionStorage.removeItem("tokenHsb");window.location.href="/"}} >exit</button>
        </div>
      </nav>
    );
  }

  
export default NavBar;
  