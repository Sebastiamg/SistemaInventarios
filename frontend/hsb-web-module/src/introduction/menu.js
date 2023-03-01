import React from 'react'
import NavBar from './component/navBar/navBar';
import { Link } from 'react-router-dom';

const menu = () => {
  return (
    <>
      <NavBar />
      <h1 className='text-5xl font-bold py-4 rounded-t-xl text-center'>Activities</h1>
      <div className='w-3/5 mx-auto flex items-center'>
        <div className='w-2/6 mx-auto border-3 border-slate-500 rounded-lg h-72 bg-slate-300 hover:translate-y-4 transition-all shadow-md shadow-slate-600'>
          <Link className="w-full flex flex-col items-center justify-evenly h-full no-underline" to="/activities/fixedAssets/electronicEquipment/">
            <img className='w-4/5 h-4/6 mx-auto' src='https://pics.computerbase.de/1/0/1/8/6/4-7e7af64f795cf3c5/article-1280x720.d04c4f8b.jpg' alt='a' />
            <h3 className='font-bold text-xl text-slate-700 hover:text-slate-900'>Electronic Items</h3>
          </Link>
        </div>

        <div className='w-2/6 mx-auto border-3 border-slate-500 rounded-lg h-72 bg-slate-300 hover:translate-y-4 transition-all shadow-md shadow-slate-600'>
          <Link className="w-full flex flex-col items-center justify-evenly h-full no-underline" to="/activities/fixedAssets/furnitures/">
            <img className='w-4/5 h-4/6 mx-auto' src='https://upload.wikimedia.org/wikipedia/commons/7/79/Mobiliario_de_oficina_quito_guayaquil_sumar-1.jpg' alt='' />
            <h3 className='font-bold text-xl text-slate-700 hover:text-slate-900'> Furniture and Fixtures</h3>
          </Link>
        </div>
      </div>
    </>
  )
}

export default menu;