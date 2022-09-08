import './root.css';
import NavBar from './component/navBar/navBar'
import { useState,useEffect } from 'react';
//import Api from "../services";
import Loading from "./component/loading"
import '../introduction/activities.css'
import { Link } from 'react-router-dom'



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
      <h1>Administrative Activities</h1>
    <div className='container1'>

        <div className='menuTables'>
            <img className='img' src='https://www.questionpro.com/userimages/site_media/portada-recursos-humanos.png' alt='a'/><br/>

            <button className="humanResources">
                <Link className="link" to="/activities/humanResources/">Human Resources</Link>
             </button>
        </div>

        <div className='menuTables'>
            <img className='img' src='https://www.bbva.com.ar/content/dam/public-web/argentina/images/Illustrations/micro-blue-loan-money-time.png.img.320.1562251534064.png' alt=''/><br/>
            <button className="expenses">
                <Link className="link" to="/activities/expenses">Expenses</Link>
            </button>
        </div>

        <div className='menuTables'>
            <img className='img' src='https://www.giitic.com/img/activos/activos_fijos_software_niif.png?pfdrid_c=true' alt=''/><br/>
            <button className="fixedAssets">
                <Link className="link" to="/activities/fixedAssets">Fixed Assets</Link>
            </button>
        </div>


    </div>
      
    </div>
  );
}


export default Activities;



