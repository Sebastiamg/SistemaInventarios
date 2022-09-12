import React from 'react'
import NavBar from './component/navBar/navBar';
// import { Link } from 'react-router-dom';
import '../introduction/activities.css'

const menu = () => {
  return (<>
    <NavBar/>
    
    <div className='container1'>
    <div className='menuTables menu2'>
            <img className='img' src='https://pics.computerbase.de/1/0/1/8/6/4-7e7af64f795cf3c5/article-1280x720.d04c4f8b.jpg' alt='a'/><br/>

            <button className="humanResources">
                <a className="link" href="/activities/fixedAssets/electronicEquipment/">Electronic Items</a>
             </button>
        </div>

        <div className='menuTables menu2'>
            <img className='img' src='https://upload.wikimedia.org/wikipedia/commons/7/79/Mobiliario_de_oficina_quito_guayaquil_sumar-1.jpg' alt=''/><br/>
            <button className="expenses">
                <a className="link" href="/activities/fixedAssets/furnitures/">furniture and fixtures</a>
            </button>
        </div>
    
    </div>
    
    </>
  )
}

export default menu;