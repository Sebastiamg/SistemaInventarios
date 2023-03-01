import './Container1Data.css';  
import React, { useState, useEffect } from "react";
import {Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter} from "reactstrap";
import ContainerDepre from './ContainerDepre'
import WindowExport from './WindowExport';
import WindowFilter from './WindowFilter';
import NavBar from '../navBar/navBar';
import Api from "../../../services"

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
      annual_de: '',
      montly_de: '',
      observation: '',
      insured: '',
    })
  
    useEffect(() => {
      editDepreciation()
    }, [form.months_de])
  
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
            annual_de: details.annual_de,
            montly_de: Number(details.montly_de).toFixed(2),
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
          array[counter].annual_de = dato.annual_de
          array[counter].montly_de = dato.montly_de
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
        console.log('meses')
        // editDepreciation()
      }
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  
    // calc depreciation
  
    function depre(value, months) {
      return {
        anualD: parseInt(value) / (parseInt(months) / 12),
        mensD: parseInt(value) / parseInt(months),
      }
    }
  
    //calculo depreciacion en edit
    function editDepreciation() {
      const months = form.months_de
      const value = form.value
  
      const allDe = depre(value, months)
      console.log(allDe)
  
      if (
        isNaN(allDe.mensD) ||
        isNaN(allDe.anualD) ||
        !isFinite(allDe.mensD) ||
        !isFinite(allDe.anualD)
      ) {
        return setForm((values) => ({
          ...values,
          montly_de: 0,
          annual_de: 0,
        }))
      }
  
      return setForm((values) => ({
        ...values,
        montly_de: allDe.mensD.toFixed(2),
        annual_de: allDe.anualD,
      }))
    }
    //calculo depreciacion en create
  
    const createDepreciation = () => {
      const months = document.querySelector('#months').value
      const value = document.querySelector('#value').value
  
      const allDe = depre(value, months)
  
      let montly_de = document.querySelector('#montly_de')
      let annual_de = document.querySelector('#annual_de')
    
      montly_de.value = allDe.mensD.toFixed(2)
      annual_de.value = allDe.anualD
  
      setForm((form.montly_de = allDe.mensD))
      setForm((form.annual_de = allDe.anualD))
      // console.log(allDe)
      // console.log(form)
    }
  


      return (
        <>
          <NavBar /> {/* NavBar 2*/}
          <div id="main-container1">
            <h1>
              <font size="6">Inventary</font>
            </h1>
            <div id="containerBotones">
              <Button color="success" id="add" onClick={() => showModalInsert()}>
                Add
              </Button>
              <WindowExport />
              <WindowFilter />
            </div>
            <div className="table-responsive"></div>
            <Container id="tableDad" className="table-responsive">
              <Table id="table" className="table table-hover table-sm">
                {' '}
                <thead>
                  <tr>
                    <th></th>
                    <th>Item</th>
                    <th>Brand</th>
                    <th>Name</th>
                    <th>Acquisition Date</th>
                    <th>Value</th>
                    <th>Months of depretation </th>
                    <th>Supplier</th>
                    <th>Annual Depreciation</th>
                    <th>Monthly Depreciation</th>
                    <th>Status</th>
                    <th>Observation</th>
                    <th>Insured</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((dato, index) => (
                    <tr key={dato.item}>
                      <th>
                        <Button
                          color="primary"
                          onClick={() => showModalUpdate(dato)}
                        >
                          🖊
                        </Button>
                      </th>
                      <td>{index + 1}</td>
                      <td>{dato.brand}</td>
                      <td>{dato.name}</td>
                      <td>{dato.acquisition_date}</td>
                      <td>{dato.value}</td>
                      <td>{dato.months_de}</td>
                      <td>{dato.supplier}</td>
                      <td>{dato.annual_de}</td>
                      <td>{dato.montly_de}</td>
                      <td>{dato.statusD}</td>
                      <td>{dato.observation}</td>
                      <td>{dato.insured}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
            <ContainerDepre /> 
            {/* --------------------MODALS------------------- */}
            {/* edit modal */}
            <Modal isOpen={modalUpdate}>
              <ModalHeader>
                <div>
                  <h3>Edit Registration</h3>
                </div>
              </ModalHeader>
    
              <ModalBody>
                <FormGroup>
                  <label> Item: </label>
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    value={form.item}
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Brand: </label>
                  <input
                    className="form-control"
                    name="brand"
                    type="text"
                    onChange={handleChange}
                    value={form.brand}
                  />
                </FormGroup>
    
                <FormGroup>
                  <label> Name: </label>
                  <input
                    className="form-control"
                    name="name"
                    type="text"
                    onChange={handleChange}
                    value={form.name}
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Acquisition date: </label>
                  <input
                    className="form-control"
                    name="acquisition_date"
                    type="date"
                    onChange={handleChange}
                    value={form.acquisition_date}
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Value: </label>
                  <input
                    className="form-control"
                    name="value"
                    type="text"
                    onChange={handleChange}
                    value={form.value}
                    id="value"
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Months of depreciation: </label>
                  <input
                    className="form-control"
                    name="months_de"
                    type="text"
                    onChange={handleChange}
                    value={form.months_de}
                    id="months"
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Supplier: </label>
                  <input
                    className="form-control"
                    name="supplier"
                    type="text"
                    onChange={handleChange}
                    value={form.supplier}
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Annual_de: </label>
                  <input
                    className="form-control"
                    name="annual_de"
                    type="text"
                    value={form.annual_de}
                    id="annual_de"
                    readOnly
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Montly_de: </label>
                  <input
                    className="form-control"
                    name="montly_de"
                    type="text"
                    value={form.montly_de}
                    id="montly_de"
                    readOnly
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Status: </label>
                  <input
                    className="form-control"
                    name="statusD"
                    type="text"
                    onChange={handleChange}
                    value={form.statusD}
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Observation: </label>
                  <input
                    className="form-control"
                    name="observation"
                    type="text"
                    onChange={handleChange}
                    value={form.observation}
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Insured: </label>
                  <input
                    className="form-control"
                    name="insured"
                    type="text"
                    onChange={handleChange}
                    value={form.insured}
                  />
                </FormGroup>
              </ModalBody>
    
              <ModalFooter>
                <Button color="primary" onClick={() => edit(form)}>
                  Edit
                </Button>
                <Button color="danger" onClick={() => closeModalUpdate()}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            {/* add item Modal */}
            <Modal isOpen={modalInsert}>
              <ModalHeader>
                <div>
                  <h3>Insert Item</h3>
                </div>
              </ModalHeader>
    
              <ModalBody>
                {/* <FormGroup> */}
                {/* <label> Item: </label> */}
                {/* <input className="form-control" readOnly type="text" value={state.data.length+1}/> ---------- */}
                {/* </FormGroup> */}
    
                <FormGroup>
                  <label>Brand: </label>
                  <input
                    className="form-control"
                    name="brand"
                    type="text"
                    onChange={handleChange}
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Name: </label>
                  <input
                    className="form-control"
                    name="name"
                    type="text"
                    onChange={handleChange}
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Acquisition date: </label>
                  <input
                    className="form-control"
                    name="acquisition_date"
                    type="date"
                    onChange={handleChange}
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Value: </label>
                  <input
                    className="form-control"
                    name="value"
                    type="text"
                    onChange={handleChange}
                    id="value"
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Months of depreciation: </label>
                  <input
                    className="form-control"
                    name="months_de"
                    type="text"
                    onChange={handleChange}
                    onInput={createDepreciation}
                    id="months"
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Supplier: </label>
                  <input
                    className="form-control"
                    name="supplier"
                    type="text"
                    onChange={handleChange}
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Annual_de: </label>
                  <input
                    className="form-control"
                    name="annual_de"
                    type="text"
                    defaultValue={form.annual_de}
                    id="annual_de"
                    readOnly
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Montly_de: </label>
                  <input
                    className="form-control"
                    name="montly_de"
                    type="text"
                    defaultValue={form.montly_de}
                    id="montly_de"
                    readOnly
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Status: </label>
                  <input
                    className="form-control"
                    name="statusD"
                    type="text"
                    onChange={handleChange}
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Observation: </label>
                  <input
                    className="form-control"
                    name="observation"
                    type="text"
                    onChange={handleChange}
                  />
                </FormGroup>
    
                <FormGroup>
                  <label>Insured: </label>
                  <input
                    className="form-control"
                    name="insured"
                    type="text"
                    onChange={handleChange}
                  />
                </FormGroup>
              </ModalBody>
    
              <ModalFooter>
                <Button color="primary" onClick={() => insert()}>
                  {' '}
                  Insert{' '}
                </Button>
                <Button
                  className="btn btn-danger"
                  onClick={() => closeModalInsert()}
                >
                  {' '}
                  Cancel{' '}
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </>
      )
    
  } 

  export default Container1Data;