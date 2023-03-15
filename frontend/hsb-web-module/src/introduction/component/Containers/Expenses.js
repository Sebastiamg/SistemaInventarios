import './Container1Data.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react'
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from 'reactstrap'
import NavBar from '../navBar/navBar'
import Api from '../../../services'
// import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const Expenses = () => {
  let dataExpenses = []
  let dataUsers = []
  let result = []
  const [data, setData] = useState(dataExpenses)
  const [datas, setDatas] = useState(dataUsers)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [modalInsert, setModalInsert] = useState(false)
  const [form, setForm] = useState({
    item: '',
    name: '',
    brand: '',
    acquisition_date: '',
    statusD: '',
    value: '',
    supplier: '',
    responsible: '',
    observation: '',
  })
  const [search, setSearch] = useState('')

  const getDatas = async () => {
    const items = await Api.fun3()
    if (typeof items == 'undefined') {
      // console.log("sin datos disponibles")
      return null
    } else {
      items.map((elm) => {
        const details = JSON.parse(elm['details'].replace(/&quot;/g, '"'))
        const item = {
          id: elm.id,
          name: elm.name,
          email: elm.email,
          active: elm.active,
        }
        return dataUsers.push(item)
      })
    }
  }
  getDatas()

  const getData = async () => {
    const items = await Api.fun2()
    if (typeof items == 'undefined') {
      return null
    } else {
      const url = window.location.href
      const expenses = '/expenses/'

      const allItems = items.map((elm) => {
        const details = JSON.parse(elm['assetDetails'].replace(/&quot;/g, '"'))
        const item = {
          item: Number(parseInt(elm.id)),
          name: elm.assetName,
          acquisition_date: elm.assetPurchaseDate,
          statusD: elm.assetActive,
          brand: details.brand,
          value: details.value,
          supplier: details.supplier,
          responsible: details.responsible,
          observation: details.observation,
          itemType: details.itemType,
        }
        return item
      })

      if (url.includes(expenses)) {
        const expenses = allItems.filter((x) => x.itemType === 'expenses')
        expenses.forEach((x) => dataExpenses.push(x))
      }
    }
  }
  getData()

  const searcher = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  }
  if (!search) {
    result = data
  } else {
    result = data.filter((datos) =>
      datos.name.toLowerCase().includes(search.toLocaleLowerCase()),
    )
  }

  const showModalUpdate = (dato) => {
    setForm(dato)
    setModalUpdate(true)
  }
  const closeModalUpdate = () => setModalUpdate(false)
  const showModalInsert = () => setModalInsert(true)
  const closeModalInsert = () => setModalInsert(false)
  const edit = (dato) => {
    var counter = 0
    var array = data

    array.map((items) => {
      if (dato.item === items.item) {
        if ((array[counter].statusD = dato.statusD === '1')) {
          //console.log("esto será activo o en uso")
          array[counter].brand = dato.brand
          array[counter].name = dato.name
          array[counter].acquisition_date = dato.acquisition_date
          array[counter].value = dato.value
          array[counter].supplier = dato.supplier
          //array[counter].statusD = dato.statusD;
          /*
      if (array[counter].statusD = dato.statusD === "1"){
        //console.log("esto será activo o en uso")
        dato.statusD = "En uso";
        console.log(dato.statusD)
      } else if (array[counter].statusD = dato.statusD === "0"){
        //console.log("esto será inactivo o desechado")
        dato.statusD = "Desechado";
      } */
          array[counter].responsible = dato.responsible
          array[counter].observation = dato.observation
          console.log(dato.statusD)
        }

        //console.log(array[counter])
        Api.apiUpdate(array[counter])
      }
      counter++
      return null
    })
    setData(array)
    setModalUpdate(false)
  }
  const url = window.location.href.toString()
  const insert = () => {
    let newValue = form
    newValue.item = parseInt(
      newValue.item +
        newValue.brand.length +
        newValue.value.length +
        Math.floor(Math.random() * 1000),
    )

    url.includes('/expenses/')
      ? (newValue['itemType'] = 'expenses')
      : console.log('...')

    console.log(newValue)

    Api.apiCreate(newValue)
    setData([...dataExpenses, newValue])
    setModalInsert(false)
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <NavBar />
      <div className="border-3 border-slate-500 rounded-xl mx-5 my-4 shadow-md shadow-slate-600">
        <h1 className="text-5xl font-bold py-3 bg-slate-300 rounded-t-xl border-b-4 border-slate-400 text-center">
          Expenses
        </h1>
        <div>
          <div className="w-full flex justify-end font-semibold">
            <div className="w-fit border-2 border-slate-400 rounded-md px-1 mx-3 flex items-center text-slate-700">
              <input
                type="search"
                className="rounded-md outline-none"
                id="search"
                placeholder="Search Expenses"
                onChange={searcher}
                value={search}
              />
              <i className="border-l-2 px-2 fa-solid fa-magnifying-glass"></i>
            </div>
            <button
              className="mx-3 border-2 border-slate-600 p-1 rounded-md bg-slate-500 hover:bg-slate-600 text-slate-50"
              onClick={() => showModalInsert()}
            >
              Add Expense
            </button>
            <button className="mx-3 border-2 border-slate-600 p-1 rounded-md bg-slate-500 hover:bg-slate-600 text-slate-50">
              {/* <ReactHTMLTableToExcel
                id="botonExportarExcel"
                className="bottom-4"
                table="expenses"
                filename="expensesExcel"
                sheet="Expenses"
                buttonText="Export Expenses"
              /> */}
              <div id="tableExport">
                <Container className="text-xl table-responsive">
                  <Table className="table-auto w-full mb-4" id="expenses">
                    <thead className="border-b-2 border-slate-500">
                      <tr className="h-16">
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Adquisition Date</th>
                        <th>Value</th>
                        <th>Supplier</th>
                        <th>Responsible</th>
                        <th>Observation</th>
                        <th>State</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((dato, index) => (
                        <tr key={dato.item}>
                          <td>{dato.name}</td>
                          <td>{dato.brand}</td>
                          <td>{dato.acquisition_date}</td>
                          <td>{dato.value}</td>
                          <td>{dato.supplier}</td>
                          <td>{dato.responsible}</td>
                          <td>{dato.observation}</td>
                          <td>
                            {dato.statusD === '1' ? 'Using' : 'Discarded'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Container>
              </div>
            </button>
          </div>
        </div>
        <Container className="text-xl table-responsive">
          <Table className="w-full mb-4 text-center table-fixed">
            <thead className="w-full border-b-2 border-slate-500">
              <tr className="h-16 w-full">
                <th>▼</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Adquisition Date</th>
                <th>Value</th>
                <th>Supplier</th>
                <th>Responsible</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {result.map((dato, index) => (
                <tr key={dato.item}>
                  <th>
                    <button
                      class="bg-slate-500 hover:bg-slate-600 transition-all w-3/5 border-2 font-semibold py-1 border-slate-600 text-slate-100 rounded-md"
                      onClick={() => showModalUpdate(dato)}
                    >
                      Details
                    </button>
                  </th>

                  <td>{dato.name}</td>
                  <td>{dato.brand}</td>
                  <td>{dato.acquisition_date}</td>
                  <td>{dato.value}</td>
                  <td>{dato.supplier}</td>
                  <td>{dato.responsible}</td>
                  <td>{dato.statusD === '1' ? 'Using' : 'Discarded'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <Modal isOpen={modalUpdate}>
          <ModalHeader className="text-center bg-slate-700">
            <h3 className="font-bold text-center text-2xl py-2 text-slate-200">
              Edit Register
            </h3>
          </ModalHeader>
          <div className="bg-slate-200 pr-10 pl-10">
            <ModalBody>
              <FormGroup className="font-bold mr-4 ">
                <label className="font-bold mr-4">Name: </label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={form.name}
                />
              </FormGroup>
              <FormGroup>
                <label className="font-bold mr-4"> Brand: </label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  name="brand"
                  type="text"
                  onChange={handleChange}
                  value={form.brand}
                />
              </FormGroup>
              <FormGroup>
                <label className="font-bold mr-4">Acquisition date: </label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  name="acquisition_date"
                  type="date"
                  onChange={handleChange}
                  value={form.acquisition_date}
                />
              </FormGroup>
              <FormGroup>
                <label className="font-bold mr-4">Value: </label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  name="value"
                  type="text"
                  onChange={handleChange}
                  value={form.value}
                />
              </FormGroup>
              <FormGroup>
                <label className="font-bold mr-4">Supplier: </label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  name="supplier"
                  type="text"
                  onChange={handleChange}
                  value={form.supplier}
                />
              </FormGroup>
              <FormGroup>
                <label className="font-bold mr-4">Status: </label>
                <select
                  class="select outline-blue-500 w-full max-w-xs border-2 p-1 border-slate-400 rounded-md"
                  name="statusD"
                  onChange={handleChange}
                  value={form.statusD}
                >
                  <option value="0">Discarded</option>
                  <option value="1">Using</option>
                </select>
              </FormGroup>
              <FormGroup>
                <label className="font-bold mr-4">Responsible: </label>
                <select
                  class="select outline-blue-500 w-full border-2 p-1 border-slate-400 rounded-md"
                  name="responsible"
                  onChange={handleChange}
                  value={form.responsible}
                >
                  {datas.map((datou) => (
                    <option key={datou.id} value={datou.name}>
                      {datou.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup>
                <label className="font-bold mr-4">Observation: </label>
                <textarea
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none resize-none"
                  name="observation"
                  type="text"
                  onChange={handleChange}
                  value={form.observation}
                />
              </FormGroup>
            </ModalBody>
          </div>
          <div className="flex justify-evenly">
            <button
              className="text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-500 hover:bg-slate-800"
              onClick={() => edit(form)}
            >
              Edit
            </button>
            <button
              className="text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-600 hover:bg-slate-800"
              color="danger"
              onClick={() => closeModalUpdate()}
            >
              Cancel
            </button>
          </div>
        </Modal>
        <Modal isOpen={modalInsert}>
          <ModalHeader className="text-center bg-slate-700">
            <h3 className="font-bold text-center text-2xl py-2 text-slate-200">
              Insert Item
            </h3>
          </ModalHeader>
          <div className="bg-slate-200 pr-10 pl-10">
            <ModalBody>
              <FormGroup>
                <label className="font-bold mr-4">Name: </label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  name="name"
                  type="text"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label className="font-bold mr-4">Brand: </label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  name="brand"
                  type="text"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label className="font-bold mr-4">Acquisition date: </label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  name="acquisition_date"
                  type="date"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label className="font-bold mr-4">Value: </label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  name="value"
                  type="numbe"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label className="font-bold mr-4">Supplier: </label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  name="supplier"
                  type="text"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label className="font-bold mr-4">Status: </label>
                <select
                  class="select outline-blue-500 w-full max-w-xs border-2 p-1 border-slate-400 rounded-md"
                  name="statusD"
                  onChange={handleChange}
                >
                  <option disabled selected>
                    Select state
                  </option>
                  <option value="0">Discarded</option>
                  <option value="1">Using</option>
                </select>
              </FormGroup>
              <FormGroup>
                <label className="font-bold mr-4">Responsible: </label>
                <select
                  class="select outline-blue-500 w-full file:border-2 p-1 border-slate-400 rounded-md"
                  name="responsible"
                  onChange={handleChange}
                >
                  <option disabled selected>
                    Select responsible
                  </option>
                  {datas.map((datou) => (
                    <option key={datou.id} value={datou.name}>
                      {datou.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup>
                <label className="font-bold mr-4">Observation: </label>
                <textarea
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none resize-none"
                  name="observation"
                  type="text"
                  onChange={handleChange}
                />
              </FormGroup>
            </ModalBody>
          </div>
          <div className="flex justify-evenly">
            <button
              className="text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-500 hover:bg-slate-800"
              onClick={() => insert()}
            >
              {' '}
              Insert{' '}
            </button>
            <button
              className="text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-600 hover:bg-slate-800"
              color="danger"
              onClick={() => closeModalInsert()}
            >
              {' '}
              Cancel{' '}
            </button>
          </div>
        </Modal>
      </div>
    </>
  )
}
export default Expenses
