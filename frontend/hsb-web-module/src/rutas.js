import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Activities from './introduction/activities';
import Container1Data from './introduction/component/Containers/Container1Data';
import React from 'react'

function Rutas() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<h1>SSSSS</h1>} />
            <Route path='/activities' element={<Activities />} />
            <Route path='/activities/expenses' element={<Container1Data />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Rutas