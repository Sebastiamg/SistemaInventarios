import './root.css';
import NavBar from './component/navBar/navBar'
import { useState,useEffect } from 'react';
//import Api from "../services";
import Loading from "./component/loading"
import '../introduction/activities.css'
import { BrowserRouter ,Link, Router } from 'react-router-dom'



function Activities() {
 const [token, settoken] = useState(0)




   useEffect(() => {
       //Api.apiTokenAccesId(sessionStorage.getItem("tokenHsb")).then((res)=>{ settoken(res.data.data.id)})
       //console.log(token)
       settoken(664564564656)
      //console.log("pagian de prueba con token de verificacion +token)
  if (token === 0) {
  sessionStorage.removeItem("")
  }

  },[token]) 
 


  return (
      (token === 0) ? <Loading/>:

    <div className="root">
      <NavBar/>
      <h1>Actividades Administrativas</h1>
    <div className='contenedor'>

        <div className='menuTables'>
            <img className='img' src='https://planillascontables.cl/wp-content/uploads/2021/11/pp_1626297095_RRHH.png' alt='a'/><br/>

            <button className="humanResources">
                 <a className="link" href="/activities/humanResources">Human Resources </a>
             </button>
        </div>

        <div className='menuTables'>
            <img className='img' src='https://www.bbva.com.ar/content/dam/public-web/argentina/images/Illustrations/micro-blue-loan-money-time.png.img.320.1562251534064.png' alt=''/><br/>
            <button className="expenses">
                <a className="link" href="/activities/expenses">Expenses</a>
            </button>
        </div>

        <div className='menuTables'>
            <img className='img' src='https://www.giitic.com/img/activos/activos_fijos_software_niif.png?pfdrid_c=true' alt=''/><br/>
            <button className="fixedAssets">
                <a className="link" href="/activities/fixedAssets">Fixed Assets</a>
            </button>
        </div>

    </div>
      
    </div>
  );
}


export default Activities;



