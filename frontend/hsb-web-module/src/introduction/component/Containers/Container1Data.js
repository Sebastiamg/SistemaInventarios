import './Container1Data.css'
import React, { useState, useEffect } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Form,
  ModalFooter,
} from 'reactstrap'
import ContainerDepre from './ContainerDepre'
import NavBar from '../navBar/navBar'
import Api from '../../../services'

const Container1Data = () => {
  // Array Items
  let dataItems = []
  // Data Hooks
  const [data, setData] = useState(dataItems)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [modalInsert, setModalInsert] = useState(false)
  const [form, setForm] = useState({
    item: '',
    brand: '',
    name: '',
    acquisition_date: '',
    statusD: '',
    value: '',
    months_de: '',
    supplier: '',
    re_value: '',
    annual_de: '',
    montly_de: '',
    value_books: '',
    observation: '',
    insured: '',
  })
  useEffect(()=>{
    calcEditModal()
  },[form.months_de,form.value,form.acquisition_date])

  const getData = async () => {
    const items = await Api.fun2()
    if (typeof items == 'undefined') {
      // console.log("sin datos disponibles")
      return null
    } else {
      const url = window.location.href
      const electronicEquipment = '/fixedAssets/electronicEquipment/'
      const furniture = '/fixedAssets/furnitures/'

      const allItems = items.map((elm) => {
        const details = JSON.parse(elm['assetDetails'].replace(/&quot;/g, '"'))
        const item = {
          item: Number(parseInt(elm.id)),
          name: elm.assetName,
          acquisition_date: elm.assetPurchaseDate,
          statusD: elm.assetActive,
          // details
          brand: details.brand,
          value: details.value,
          months_de: details.months_de,
          supplier: details.supplier,
          re_value: details.re_value,
          annual_de: details.annual_de,
          montly_de: Number(details.montly_de).toFixed(2),
          value_books: details.value_books,
          observation: details.observation,
          insured: details.insured,
          itemType: details.itemType,
        }
        // console.log(item)
        // dataItems.push(item)
        return item
      })
      if (url.includes(electronicEquipment)) {
        const electronicItems = allItems.filter(
          (x) => x.itemType === 'electronicEquipment',
        )
        electronicItems.forEach((x) => dataItems.push(x))
      } else if (url.includes(furniture)) {
        const furnitureItems = allItems.filter(
          (x) => x.itemType === 'furniture',
        )
        furnitureItems.forEach((x) => dataItems.push(x))
      }
    }
  }
  getData()

  //Methods and actions
  //UPDATE MODAL
  const showModalUpdate = (dato) => {
    setForm(dato)
    setModalUpdate(true)
  }
  const closeModalUpdate = () => setModalUpdate(false)

  //ADD MODAL
  const showModalInsert = () => setModalInsert(true)
  const closeModalInsert = () => setModalInsert(false)

  // UPDATE
  const edit = (dato) => {
    // console.log(dato); //dato = item editado
    var counter = 0
    var array = data
    // console.log(array) //array = todos los items
    array.map((items) => {
      if (dato.item === items.item) {
        array[counter].brand = dato.brand
        array[counter].name = dato.name
        array[counter].acquisition_date = dato.acquisition_date
        array[counter].value = dato.value
        array[counter].months_de = dato.months_de
        array[counter].supplier = dato.supplier
        array[counter].re_value = dato.re_value
        array[counter].annual_de = dato.annual_de
        array[counter].montly_de = dato.montly_de
        array[counter].value_books = dato.value_books
        array[counter].statusD = dato.statusD
        array[counter].observation = dato.observation
        array[counter].insured = dato.insured

        // console.log(array[counter])
        Api.apiUpdate(array[counter])
      }
      counter++
      return null
    })
    setData(array)
    setModalUpdate(false)
  }

  // URL/Location
  const url = window.location.href.toString()

  // Insert
  const insert = () => {
    let newValue = form
    // id
    // data.length <= 0 ?
    // newValue.item = data.length + 1:
    // newValue.item = parseInt(data.pop().item) + 1;
    newValue.item = parseInt(
      newValue.item +
        newValue.brand.length +
        newValue.value.length +
        Math.floor(Math.random() * 1000),
    )

    url.includes('/fixedAssets/electronicEquipment/')
      ? (newValue['itemType'] = 'electronicEquipment')
      : url.includes('/fixedAssets/furnitures/')
      ? (newValue['itemType'] = 'furniture')
      : console.log('caca')

    console.log(newValue)

    Api.apiCreate(newValue)
    setData([...dataItems, newValue])
    setModalInsert(false)
  }
  // validacion
  // console.log(url.includes("/fixedAssets/electronicEquipment/"))

  // handleChange
  const handleChange = (e) => {
    if (e.target.name === 'months_de') {
      // console.log('meses')
      // editDepreciation()
    }
    setForm({ ...form, [e.target.name]: e.target.value })
  }




  //-------------------*calculos globales*-----------------------------------
  // 1.- formula calculo depreciacion mensual y anual 
  function depre(value,re_value, months) {
    return {
      anualD: parseInt((value)-(re_value)) / (parseInt(months) / 12),
      mensD: parseInt((value)-(re_value)) / parseInt(months),
    }
  }
  // 2.- formula calculo valor residual
  const calcReValue =(value)=>{
    const residual = (value)*(10/100)
    return residual  
  }
  // 3.- Formula calculo valor en libros 
  const calcValueBooks =(value,AdYear,AcYear,annual_de)=>{
    const year = AcYear-AdYear
    const value_books = parseInt((value)-(year * annual_de))
    return {
      year: year,
      value_books: value_books
    }
  }
  //-------------------*calculos en modal Edit*------------------------------
  const calcEditModal = ()=>{
//--------------------*------------------
  const months = form.months_de;
  const value = form.value;
  const re_value = form.re_value;
  const adYear= parseInt(form.acquisition_date);
  const acYear = parseInt(Date().slice(11,-36));
  const annual_de = form.annual_de;
  
  
  const residual = calcReValue(value)
  if(isNaN(value)){
    setForm((values)=>({
      ...values,
      re_value : 0,
    }))
  }else{
    setForm((values)=>({
      ...values,
      re_value : residual
    }))
  } 
  
  const allDe = depre(value,re_value,months)
  if(isNaN(allDe.mensD)||
     isNaN(allDe.anualD)||
     !isFinite(allDe.mensD)||
     !isFinite(allDe.anualD)
     ){
    setForm((values)=>({
      ...values,
      montly_de : 0,
      annual_de : 0
    }))
  }else {
    setForm((values)=>({
    ...values,
    montly_de : allDe.mensD.toFixed(2),
    annual_de : allDe.anualD.toFixed(2)
  }))
}

  const year  = calcValueBooks(value,adYear,acYear,annual_de).year

  if(year <= 5 ){
    const valueBooks  = calcValueBooks(value,adYear,acYear,annual_de).value_books
    if(isNaN(value)) {
      setForm((values)=>({
        ...values,
        value_books : 0 
      }))
    }else{
      setForm((values)=>({
        ...values,
        value_books : valueBooks
      }))
    }
  }else{
    setForm((values)=>({
      ...values,
      value_books : re_value
    }))
  }

}



//------------------*calculos en el modal Create*----------------------

const calcCreateModal = () => {
  //------------------------*---------------------------
  const months = document.querySelector('#months').value
  const value = document.querySelector('#value').value
  let re_value = document.querySelector('#re_value')
  const adYear =(document.querySelector('#acquisition_date').value).slice(0,-6)
  const acYear = Date().slice(11,-36)
  let annual_de = document.querySelector('#annual_de')
  let montly_de = document.querySelector('#montly_de')
  let value_books = document.querySelector('#value_books')

  const residual = calcReValue(value);
  if(isNaN(value)){
    re_value.value = 0
  }else{
    re_value.value = residual.toFixed(2)
  }
  
  const allDe = depre(value,(re_value.value), months)
  if(isNaN(allDe.anualD)||
     isNaN(allDe.mensD)
     ){
      annual_de.value = 0
      montly_de.value = 0
     }else{
      annual_de.value = allDe.anualD.toFixed(2)
      montly_de.value = allDe.mensD.toFixed(2)
     }
  const year = calcValueBooks(value,adYear,acYear,(annual_de.value)).year
  if(year <=5 ){
    const valueBooks = calcValueBooks(value,adYear,acYear,(annual_de.value)).value_books
    if(isNaN(valueBooks)){
      value_books.value = 0
    }else{
      value_books.value = valueBooks
    }

  } else{
    value_books.value = re_value.value
  }
}






  


  return (
    <>
      <NavBar /> 
      <div className='border-3 border-slate-500 rounded-xl mx-5 my-4 shadow-md shadow-slate-600'>
        <h1 className='text-4xl font-bold py-3 bg-slate-300 rounded-t-xl border-b-4 border-slate-400 text-center'>Inventary</h1>
        <div id="containerBotones">
          <button className='bg-slate-500 hover:bg-slate-600 transition-all w-20 mr-3 mt-3 border-2 font-semibold py-1 border-slate-600 text-slate-100 rounded-md' id="add" onClick={() => showModalInsert()}>
            Add
          </button>
        </div>
        <div className='mx-8'>
        <div className='text-sl table-responsive '>
          <table className='table-auto w-full mb-4'> 
            <thead className='border-b-2 border-slate-500 '>
              <tr className='h-16 text-center'>
                <th></th>
                <th>Item</th>
                <th>Brand</th>
                <th>Name</th>
                <th>Acquisition Date</th>
                <th>Value</th>
                <th>Months of depretation </th>
                <th>Supplier</th>
                <th>Residual Value</th>
                <th>Annual Depreciation</th>
                <th>Monthly Depreciation</th>
                <th>Value in Books</th>
                <th>Status</th>
                <th>Observation</th>
                <th>Insured</th>
              </tr>
            </thead>
            <tbody>
              {data.map((dato, index) => (
                <tr key={dato.item} className='h-16 border-b-2 border-zinc-300 text-center'>
                  <th >
                    <button className='bg-slate-500 hover:bg-slate-600 transition-all w-20 mr-3 mt-3 border-2 font-semibold py-1 border-slate-600 text-slate-100 rounded-md '
                      color="primary"
                      onClick={() => showModalUpdate(dato)}
                    >
                      Edit
                    </button>
                  </th>
                  <td>{index + 1}</td>
                  <td>{dato.brand}</td>
                  <td>{dato.name}</td>
                  <td>{dato.acquisition_date}</td>
                  <td>{dato.value}</td>
                  <td>{dato.months_de}</td>
                  <td>{dato.supplier}</td>
                  <td>{dato.re_value}</td>
                  <td>{dato.annual_de}</td>
                  <td>{dato.montly_de}</td>
                  <td>{dato.value_books}</td>
                  <td>{dato.statusD}</td>
                  <td>{dato.observation}</td>
                  <td>{dato.insured}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        <ContainerDepre />
        {/* --------------------MODALS------------------- */}
        {/* edit modal */}
        <Modal isOpen={modalUpdate}>
          
            <div className='text center bg-slate-700'>
              <h3 className='font-bold text-center text-2x1 py-2 text-slate-200'>Edit Registration</h3>
            </div>
          
        <div className='bg-slate-200'>
          <ModalBody>
            <Form>

            <FormGroup className=' flex flex-col px-2'>
              <label className='font-bold mr-4'> Item: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                readOnly
                type="text"
                value={form.item}
              />
            </FormGroup>

            <FormGroup className=' flex flex-col px-2'>
              <label className='font-bold mr-4'>Brand: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                name="brand"
                type="text"
                onChange={handleChange}
                value={form.brand}
              />
            </FormGroup>

            <FormGroup className=' flex flex-col px-2'>
              <label className='font-bold mr-4'> Name: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                name="name"
                type="text"
                onChange={handleChange}
                value={form.name}
              />
            </FormGroup>

            <FormGroup className=' flex flex-col px-2'>
              <label className='font-bold mr-4'>Acquisition date: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                name="acquisition_date"
                type="date"
                onChange={handleChange}
                value={form.acquisition_date}
              />
            </FormGroup>

            <FormGroup className=' flex flex-col px-2'>
              <label className='font-bold mr-4'>Value: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                name="value"
                type="text"
                onChange={handleChange}
                value={form.value}
                id="value"
              />
            </FormGroup>

            <FormGroup className=' flex flex-col px-2'>
              <label className='font-bold mr-4'>Months of depreciation: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                name="months_de"
                type="text"
                onChange={handleChange}
                value={form.months_de}
                id="months"
              />
            </FormGroup>

            <FormGroup className=' flex flex-col px-2'>
              <label className='font-bold mr-4'>Supplier: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                name="supplier"
                type="text"
                onChange={handleChange}
                value={form.supplier}
              />
            </FormGroup>
            <FormGroup className=' flex flex-col px-2'>
              <label className='font-bold mr-4'>Residual value: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none bg-slate-300 font-semibold"
                name="re_value"
                type="text"
                onChange={handleChange}
                value={form.re_value}
                id="re_value"
                readOnly
              />
            </FormGroup>

            <FormGroup className=' flex flex-col px-2'>
              <label className='font-bold mr-4'>Annual_de: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none bg-slate-300 font-semibold"
                name="annual_de"
                type="text"
                value={form.annual_de}
                id="annual_de"
                readOnly
              />
            </FormGroup>

            <FormGroup className=' flex flex-col px-2'>
              <label className='font-bold mr-4'>Montly_de: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none bg-slate-300 font-semibold"
                name="montly_de"
                type="text"
                value={form.montly_de}
                id="montly_de"
                readOnly
              />
            </FormGroup>
            <FormGroup className=' flex flex-col px-2'>
              <label className='font-bold mr-4'>Value in Books: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none bg-slate-300 font-semibold"
                name="value_books"
                type="text"
                value={form.value_books}
                id="value_books"
                readOnly
              />
            </FormGroup>

            <FormGroup className=' flex flex-col px-2'>
              <label className='font-bold mr-4'>Status: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                name="statusD"
                type="text"
                onChange={handleChange}
                value={form.statusD}
              />
            </FormGroup>

            <FormGroup className=' flex flex-col px-2'>
              <label className='font-bold mr-4'>Observation: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                name="observation"
                type="text"
                onChange={handleChange}
                value={form.observation}
              />
            </FormGroup>

            <FormGroup className=' flex flex-col px-2'>
              <label className='font-bold mr-4'>Insured: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                name="insured"
                type="text"
                onChange={handleChange}
                value={form.insured}
              />
            </FormGroup>
            </Form>
          </ModalBody>
          </div>
          <div className='flex justify-evenly'>
            <button className='text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-500 hover:bg-slate-800' onClick={() => edit(form)}>
              Edit
            </button>
            <button className='text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-600 hover:bg-slate-800' onClick={() => closeModalUpdate()}>
              Cancel
            </button>
          </div>
        </Modal>

        {/* add item Modal */}
        <Modal isOpen={modalInsert}>
            <div className='text-center bg-slate-700'>
              <h3 className='font-bold text-center text-2xl py-2 text-slate-200'>Insert Item</h3>
            </div>
        {/* form */}
        <div className='bg-slate-200'>
          <ModalBody>
            <Form>
            <FormGroup className='flex flex-col px-2 '>
              <label className='font-bold mr-4'>Brand: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none "
                name="brand"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup className='flex flex-col px-2 '>
              <label className='font-bold mr-4'>Name: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none "
                name="name"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup className='flex flex-col px-2 '>
              <label className='font-bold mr-4'>Acquisition date: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none "
                name="acquisition_date"
                type="date"
                onChange={handleChange}
                onInput={calcCreateModal}
                id="acquisition_date"
              />
            </FormGroup>

            <FormGroup className='flex flex-col px-2 '>
              <label className='font-bold mr-4'>Value: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none "
                name="value"
                type="text"
                onChange={handleChange}
                onInput={calcCreateModal}
                id="value"
              />
            </FormGroup>

            <FormGroup className='flex flex-col px-2 '>
              <label className='font-bold mr-4'>Months of depreciation: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none "
                name="months_de"
                type="text"
                onChange={handleChange}
                onInput={calcCreateModal}
                id="months"
              />
            </FormGroup>

            <FormGroup className='flex flex-col px-2 '>
              <label className='font-bold mr-4'>Supplier: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none "
                name="supplier"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className='flex flex-col px-2 '>
              <label className='font-bold mr-4'>Residual Value: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none bg-slate-300 font-semibold "
                name="re_value"
                type="text"
                onChange={handleChange}
                defaultValue={0}
                id="re_value"
                readOnly
              />
            </FormGroup>

            <FormGroup className='flex flex-col px-2 '>
              <label className='font-bold mr-4'>Annual_de: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none bg-slate-300 font-semibold "
                name="annual_de"
                type="text"
                defaultValue={0}
                id="annual_de"
                readOnly
              />
            </FormGroup>

            <FormGroup className='flex flex-col px-2 '>
              <label className='font-bold mr-4'>Montly_de: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none bg-slate-300 font-semibold "
                name="montly_de"
                type="text"
                defaultValue={0}
                id="montly_de"
                readOnly
              />
            </FormGroup>
            <FormGroup className='flex flex-col px-2 '>
              <label className='font-bold mr-4'>Value in Books: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none bg-slate-300 font-semibold "
                name="value_books"
                type="text"
                defaultValue={0}
                id="value_books"
                readOnly
              />
            </FormGroup>

            <FormGroup className='flex flex-col px-2 '>
              <label className='font-bold mr-4'>Status: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none "
                name="statusD"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup className='flex flex-col px-2 '>
              <label className='font-bold mr-4'>Observation: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none "
                name="observation"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup className='flex flex-col px-2'>
              <label className='font-bold mr-4'>Insured: </label>
              <input
                className="w-full border-2 p-1 border-slate-400 rounded-md outline-none "
                name="insured"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            </Form>
          </ModalBody>

          </div>

            <div className='flex justify-evenly'>
            <button className='text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-500 hover:bg-slate-800' onClick={() => insert()}>
              Insert
            </button>
            <button 
              className='text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-600 hover:bg-slate-800'
              onClick={() => closeModalInsert()}
              >
              Cancel
            </button>
            </div>
        </Modal>
      </div>
    </>
  )
}

export default Container1Data
