import React from 'react';
import { Link } from 'react-router-dom'
import Logo from './hsbcadlogo.png'
import User from './user.png'
import './navBar.css';

function NavBar() {

    return (
      <nav className="flex mx-auto my-2 p-3 rounded-xl justify-between navBar-container">
        {/* left nav */}
        <div className="w-1/2 flex items-start">
          {/* hsb Lobo */}
          <div>
            <Link to="/activities">
              <img  className="icon-init rounded-2xl" src={ Logo } alt="HSBCAD logo"/>
            </Link>
          </div>
          {/* drop down */}
          <div className="flex dropdown">
              <button className="w-full mx-3" >
                <img  src="https://cdn-icons-png.flaticon.com/128/1828/1828726.png" alt="menu"/>
              </button>
              <div className="w-56 dropdown-content">
                  <Link to="/activities/humanResources/" >Human Resources</Link>
                  <Link to="/activities/expenses/" >Expenses</Link>
                  <Link to="/activities/fixedAssets/" >Fixed Assets</Link>
                  <Link to="/activities/form/" >Electronic Doc</Link>
              </div>
          </div>
        </div>
        {/* right nav */}
        <div className="w-2/12 flex items-center justify-evenly">
          {/* user Button */}
          <button className='rounded-full'>
            <img src={ User } alt="user" className='w-full'/>
          </button>
          {/* exit button */}
          <div  className='font-bold text-lg text-slate-200'>
            <button translate="yes" onClick={()=>{sessionStorage.removeItem("tokenHsb");window.location.href="/"}} >Log Out</button>
          </div>
        </div>

      </nav>
    );
  }

  
export default NavBar;
  