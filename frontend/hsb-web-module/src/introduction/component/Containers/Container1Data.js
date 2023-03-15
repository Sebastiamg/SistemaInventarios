import React, { useState, useEffect } from 'react'
import { Container, Modal, ModalBody, FormGroup, Form } from 'reactstrap'
import NavBar from '../navBar/navBar'
import api from '../../../services'
import FAExport from '../exports/FAExport'


const Container1Data = () => {
  const [ocModalAdd, setOcModalAdd] = useState(false)
  const [ocModalUpdate, setOcModalUpdate] = useState(false)
  const [itemObj, setItemObj] = useState({})
  const [itemsLenght, setItemsLenght] = useState(0)
  const [activeUserName, setActiveUserName] = useState([])
  const [ocModalWarning, setOcModalWarning] = useState(false)

  const [newItemObj, setNewItemObj] = useState({
    acquisition_date: '',
    name: '',
    brand: '',
    supplier: '',
    value: 0,
    months_de: 0,
    re_value: 0,
    annual_de: 0,
    montlhy_de: 0,
    value_books: 0,
    observation: '',
    insured: 0,
    status: 1,
    responsible: '',
  })

  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    getAllItems(false)
  }, [])

  useEffect(() => {
    allDepre(newItemObj.months_de, true)
  }, [newItemObj.value])

  useEffect(() => {
    allDepre(itemObj.months_de, false)
  }, [itemObj.value])

  useEffect(() => {
    calcValueBooks(true)
  }, [newItemObj.months_de, newItemObj.value, newItemObj.acquisition_date])

  useEffect(() => {
    calcValueBooks(false)
  }, [itemObj.months_de, itemObj.value, itemObj.assetPurchaseDate])

  //Get Items
  const getAllItems = () => {
    api
      .getItems()
      .then((res) => {
        let activeItems = []
        let activeDepreItems = []

        let allInfoItems = []
        let allInfoDepreItems = []

        let inactiveItems = []

        let electronicItems = [];
        let furnitureAndFixtures = []

        if (res !== null) {
          res.items.map((item) => {
            const itemDetails = item.assetDetails.replace(/&quot;/g, '"')
            const fixedItemDetails = JSON.parse(itemDetails)
            const allInfoItem = {
              ...item,
              ...fixedItemDetails,
              assetDetails: '',
            }

            const fixedItem = {
              id: item.id,
              name: item.assetName,
              acquisition_date: item.assetPurchaseDate,
              brand: fixedItemDetails.brand,
              montlhy_de: fixedItemDetails.montlhy_de,
              value_books: fixedItemDetails.value_books,
              insured: fixedItemDetails.insured,
              responsible: fixedItemDetails.responsible,
            }


            const itemType = allInfoItem.itemType.toLowerCase()

            if (itemType === "electronicequipment") {
              electronicItems.push(allInfoItem)
            } else if(itemType === "furnitureandfixtures") {
              furnitureAndFixtures.push(allInfoItem)
            }
            setAllItems([...electronicItems])

            const checkDepreItem = filterDepre(allInfoItem)

            // console.log(fixedItem)
            setItemsLenght(res.items.length || 0)
            return item.assetActive === '1'
              ? checkDepreItem.nexToDepre === true
                ? (activeDepreItems.push(fixedItem),
                  allInfoDepreItems.push(checkDepreItem))
                : (activeItems.push(fixedItem),
                  allInfoItems.push(checkDepreItem))
              : inactiveItems.push(fixedItem)
          })

          getActiveUsers()

          return fillTable(
            activeDepreItems.concat(activeItems),
            allInfoDepreItems.concat(allInfoItems),
          )
        }

        //  get active users
        getActiveUsers()
      })
      .catch((err) => console.log(err))
  }

  function filterDepre(item) {
    const acItemDate = item.assetPurchaseDate

    const acDate = new Date(acItemDate)
    const today = new Date()

    const dateBefDepre = acDate.setMonth(acDate.getMonth() + 58)

    if (today >= dateBefDepre) {
      return { ...item, nexToDepre: true }
    } else {
      return { ...item }
    }
  }

  function getActiveUsers() {
    api.getUsers().then((res) => {
      let activeUsers = []
      res.activeUsers.forEach((user) => activeUsers.push(user.name))
      setActiveUserName(activeUsers)
    })
  }

  //fillTable
  const fillTable = (items, allInfoItems) => {
    document.querySelector('#tableItems').innerHTML = ''

    // for each items
    items.forEach((item, index) => {
      //creation of TR and update BTN
      const TR = document.createElement('TR')
      TR.classList.add('h-16', 'border-b-2', 'border-zinc-400', 'text-center')

      if (allInfoItems[index].nexToDepre) {
        TR.classList.add('bg-red-300')
      }

      const btn = document.createElement('BUTTON')
      btn.addEventListener('click', () => openUpdateModal(allInfoItems[index]))
      btn.classList.add(
        'bg-slate-500',
        'hover:bg-slate-600',
        'transition-all',
        'w-3/5',
        'border-2',
        'font-semibold',
        'py-1',
        'border-slate-600',
        'text-slate-100',
        'rounded-md',
        'details',
      )
      btn.textContent = 'Edit'

      for (let i = 0; i < Object.values(item).length + 1; i++) {
        const TD = document.createElement('TD')

        TD.textContent = Object.values(item)[i]

        TR.appendChild(TD)

        if (i === Object.values(item).length) {
          // insert button into TD and insert TD to first element into TR
          TD.appendChild(btn)
          TR.insertAdjacentElement('afterbegin', TD)
          continue
        }
      }
      document.querySelector('#tableItems').appendChild(TR)
    })
  }

  // Open Update Modal
  function openUpdateModal(item) {
    setItemObj((currentvalues) => ({
      ...currentvalues,
      ...item,
    }))

    setOcModalUpdate(true)
  }

  function handleUpdatechange(e, operation) {
    switch (operation) {
      case 'residualValue':
        residualValue(e.target.value, false)
        break
      case 'depreciation':
        setNewValues(e.target.value, false)
        break
      case 'active':
        setActiveItem(e)
        break
      default:
        setItemObj((currentValues) => ({
          ...currentValues,
          [e.target.name]: e.target.value,
        }))
        break
    }
  }

  function setActiveItem(e) {
    const itemActive = Number(itemObj.assetActive) === 1 ? 0 : 1
    setItemObj((currentValues) => ({
      ...currentValues,
      assetActive: itemActive,
    }))
  }

  const openModal = () => {
    setOcModalAdd(true)
    getAllItems(true)
  }

  const closeModal = () => {
    setOcModalAdd(false)
  }

  // handle change to add new Item
  const handleNewItem = (e, operationType) => {
    switch (operationType) {
      case 'depreciation':
        setNewValues(e.target.value, true)
        break
      case 'residualValue':
        residualValue(e.target.value, true)
        break
      default:
        setNewItemObj((currentvalues) => ({
          ...currentvalues,
          [e.target.name]: e.target.value,
        }))
        break
    }
  }

  // set new values
  function setNewValues(monthsDe, isNew) {
    allDepre(monthsDe, isNew)
    calcValueBooks(isNew)

    if (isNew) {
      setNewItemObj((currentvalues) => ({
        ...currentvalues,
        months_de: monthsDe,
      }))
    } else if (!isNew) {
      setItemObj((currentvalues) => ({
        ...currentvalues,
        months_de: monthsDe,
      }))
    }
  }

  function calcValueBooks(isNew) {
    let mainObject = isNew ? newItemObj : itemObj

    let feAdq = isNew
      ? new Date(mainObject.acquisition_date.replace('-', '/'))
      : new Date(mainObject.assetPurchaseDate)
    let feAdqDays = feAdq.getDate()
    let feAdqMonths = feAdq.getMonth()
    let feAdqYears = feAdq.getFullYear()

    let now = new Date()
    let nowDays = now.getDate()
    let nowMonths = now.getMonth()
    let nowYears = now.getFullYear()

    let days = nowDays - feAdqDays
    let years = (nowYears - feAdqYears) * 12
    let months = parseInt(nowMonths - feAdqMonths + years)

    if (isNew) {
      if (days <= 0) {
        let newValueInBooks = mainObject.value - months * mainObject.montlhy_de
        if (months > 60) {
          newValueInBooks = mainObject.re_value
        }
        setNewItemObj((currentValues) => ({
          ...currentValues,
          value_books: newValueInBooks,
        }))
      } else {
        months += 1
        let newValueInBooks = mainObject.value - months * mainObject.montlhy_de
        if (months > 60) {
          newValueInBooks = mainObject.re_value
        }
        setNewItemObj((currentValues) => ({
          ...currentValues,
          value_books: newValueInBooks,
        }))
      }
    } else if (!isNew) {
      if (days <= 0) {
        let newValueInBooks = mainObject.value - months * itemObj.montlhy_de
        if (months > 60) {
          newValueInBooks = mainObject.re_value
        }
        setItemObj((currentValues) => ({
          ...currentValues,
          value_books: newValueInBooks,
        }))
      } else {
        months += 1
        let newValueInBooks = mainObject.value - months * itemObj.montlhy_de
        if (months > 60) {
          newValueInBooks = mainObject.re_value
        }
        setItemObj((currentValues) => ({
          ...currentValues,
          value_books: newValueInBooks,
        }))
      }
    }
  }

  function residualValue(itemValue, isNew) {
    const value = itemValue
    const residualValue = (value * 10) / 100

    if (isNew) {
      setNewItemObj((currentvalues) => ({
        ...currentvalues,
        value: value,
        re_value: residualValue,
      }))
    } else if (!isNew) {
      setItemObj((currentValues) => ({
        ...currentValues,
        value: value,
        re_value: residualValue,
      }))
    }
  }

  function allDepre(monthsDe, isNew) {
    let mainObject = isNew ? newItemObj : itemObj
    // values
    let value = mainObject.value
    let revalue = mainObject.re_value
    let months = monthsDe

    let anualDepreciation = (value - revalue) / (months / 12)
    let monthsDepreciation = (value - revalue) / months

    if (isNew) {
      if (
        !isFinite(anualDepreciation) ||
        !isFinite(monthsDepreciation) ||
        isNaN(anualDepreciation) ||
        isNaN(monthsDepreciation)
      ) {
        setNewItemObj((currentvalues) => ({
          ...currentvalues,
          annual_de: 0,
          montlhy_de: 0,
        }))
      } else {
        setNewItemObj((currentvalues) => ({
          ...currentvalues,
          annual_de: anualDepreciation.toFixed(2),
          montlhy_de: monthsDepreciation.toFixed(2),
        }))
      }
    } else if (!isNew) {
      if (
        !isFinite(anualDepreciation) ||
        !isFinite(monthsDepreciation) ||
        isNaN(anualDepreciation) ||
        isNaN(monthsDepreciation)
      ) {
        setItemObj((currentvalues) => ({
          ...currentvalues,
          annual_de: 0,
          montlhy_de: 0,
        }))
      } else {
        setItemObj((currentvalues) => ({
          ...currentvalues,
          annual_de: anualDepreciation.toFixed(2),
          montlhy_de: monthsDepreciation.toFixed(2),
        }))
      }
    }
  }

  const addNewItem = (e) => {
    e.preventDefault()

    const itemDetails = JSON.stringify({
      brand: newItemObj.brand,
      supplier: newItemObj.supplier,
      value: newItemObj.value,
      months_de: newItemObj.months_de,
      re_value: newItemObj.re_value,
      annual_de: newItemObj.annual_de,
      montlhy_de: newItemObj.montlhy_de,
      value_books: newItemObj.value_books,
      observation: newItemObj.observation,
      insured: newItemObj.insured,
      itemType: 'ElectronicEquipment',
      responsible: newItemObj.responsible,
    })

    const newItem = {
      item: itemsLenght + 1,
      acquisition_date: newItemObj.acquisition_date,
      name: newItemObj.name,
      statusD: 1,
      details: itemDetails,
    }

    api
      .createItem(newItem)
      .then((res) => {
        console.log(res)
        setOcModalAdd(false)
        getAllItems()
      })
      .catch((err) => console.error(err))

    // console.log(newItem)
  }

  function editItem(e) {
    e.preventDefault()
    const itemDetails = JSON.stringify({
      brand: itemObj.brand,
      value: itemObj.value,
      months_de: itemObj.months_de,
      supplier: itemObj.supplier,
      re_value: itemObj.re_value,
      annual_de: itemObj.annual_de,
      montlhy_de: itemObj.montlhy_de,
      value_books: itemObj.value_books,
      observation: itemObj.observation,
      insured: itemObj.insured,
      itemType: 'ElectronicEquipment',
      responsible: itemObj.responsible,
    })

    const updatedItem = {
      item: itemObj.id,
      name: itemObj.assetName,
      acquisition_date: itemObj.assetPurchaseDate,
      statusD: Number(itemObj.assetActive),
      details: itemDetails,
    }

    api
      .updateItem(updatedItem)
      .then((res) => {
        console.log(res)
        setOcModalUpdate(false)
        getAllItems()
      })
      .catch((err) => console.log(err))
  }

  // open modal warning (copy items)
    function openModalWarning() {
      let copiedItem = itemObj
      setOcModalWarning(true)
      return copiedItem
    }
    function closeModalWarning() {
      setOcModalWarning(false)
    }

    function createItemCopied(e) {
      e.preventDefault()
      let copiedItem = openModalWarning()
      const itemDetails = JSON.stringify({
        brand: copiedItem.brand,
        value: copiedItem.value,
        months_de: copiedItem.months_de,
        supplier: copiedItem.supplier,
        re_value: copiedItem.re_value,
        annual_de: copiedItem.annual_de,
        montlhy_de: copiedItem.montlhy_de,
        value_books: copiedItem.value_books,
        observation: copiedItem.observation,
        insured: copiedItem.insured,
        itemType: 'ElectronicEquipment',
        responsible: copiedItem.responsible,
      })
  
      const newCopiedItem = {
        item: itemsLenght + 1 ,
        name: copiedItem.assetName,
        acquisition_date: copiedItem.assetPurchaseDate,
        statusD: 1,
        details: itemDetails,
      }
      const oldItemDetails = JSON.stringify({
        brand: copiedItem.brand,
        value: copiedItem.value,
        months_de: copiedItem.months_de,
        supplier: copiedItem.supplier,
        re_value: copiedItem.re_value,
        annual_de: copiedItem.annual_de,
        montlhy_de: copiedItem.montlhy_de,
        value_books: copiedItem.value_books,
        observation: copiedItem.observation,
        insured: copiedItem.insured,
        itemType: 'ElectronicEquipment',
        responsible: copiedItem.responsible,
      })
  
      const oldCopiedItem = {
        item: itemsLenght,
        name: copiedItem.assetName,
        acquisition_date: copiedItem.assetPurchaseDate,
        statusD: 0,
        details: oldItemDetails,
      }

      api.createItem(newCopiedItem)
        api.updateItem(oldCopiedItem)
        .then(res=>{
          console.log(res)
        }).catch((err)=> console.log(err))
      .then((res => {
        console.log(res)
        setOcModalWarning(false)
        setOcModalUpdate(false)
        getAllItems()
      }))
      .catch((err)=> console.log(err))
    }

    

  return (
    <>
      <NavBar />
      <div className="border-3 border-slate-500 rounded-xl mx-5 my-4 shadow-md shadow-slate-600">
        <div>
          {/*search and add item*/}
          <h1 className="text-4xl font-bold py-3 bg-slate-300 rounded-t-xl border-b-4 border-slate-400 text-center">
            Inventary
          </h1>
          <div className="w-full flex justify-end font-semibold">
            <div className="w-fit border-2 border-slate-400 rounded-md px-1 mx-3 flex items-center text-slate-700">
              <input
                type="search"
                className="rounded-md outline-none"
                id="search"
                placeholder="search item"
              />
              <i className="border-l-2 px-2 fa-solid fa-magnifying-glass"></i>
            </div>
            <FAExport 
                allItems = {allItems}
            />
            <button
              className="mx-3 border-2 border-slate-600 p-1 rounded-md bg-slate-500 hover:bg-slate-600 text-slate-50 px-3 py-2"
              onClick={openModal}
            >
              Add
            </button>
          </div>
          <Container className="text-md">
            <table className="w-full mb-4 text-start">
              <thead className="w-full border-b-2 border-slate-500 text-center">
                <tr className="h-16 w-full">
                  <th className="w-10">▼</th>
                  <th className="w-10">id</th>
                  <th className="w-10">Name</th>
                  <th className="w-10">Acq. date</th>
                  <th className="w-10">Brand</th>
                  {/* <th className="w-10">supplier</th> */}
                  {/* <th className="w-10">Value</th> */}
                  {/* <th className="w-10">Dep. time</th> */}
                  {/* <th className="w-10">Res. Value</th> */}
                  {/* <th className="w-10">Annual dep.</th> */}
                  <th className="w-10">Monthly dep.</th>
                  <th className="w-10">Val. books</th>
                  {/* <th className="w-10">Obs</th> */}
                  <th className="w-10">Insured</th>
                  {/* <th className="w-10">status</th> */}
                  <th className="w-10">Responsible</th>
                </tr>
              </thead>
              <tbody id="tableItems"></tbody>
            </table>
          </Container>
        </div>
      </div>

      {/* Update Modal */}
      <Modal isOpen={ocModalUpdate}>
        <div className="text-center bg-slate-700">
          <h3 className="font-bold text-center text-2xl py-2 text-slate-200">
            Update item
          </h3>
        </div>
        {/* form */}
        <div className="bg-slate-200">
          <ModalBody>
            <Form>
              <FormGroup>
                <label className="font-semibold mr-4">Acquisition date</label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  type="date"
                  name="assetPurchaseDate"
                  value={itemObj.assetPurchaseDate}
                  onChange={handleUpdatechange}
                />
              </FormGroup>
              <FormGroup>
                <label className="font-semibold mr-4">Name</label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  type="text"
                  name="assetName"
                  value={itemObj.assetName}
                  onChange={handleUpdatechange}
                />
              </FormGroup>
              <FormGroup>
                <label className="font-semibold mr-4">Brand</label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  type="text"
                  name="brand"
                  value={itemObj.brand}
                  onChange={handleUpdatechange}
                />
              </FormGroup>
              <FormGroup>
                <label className="font-semibold mr-4">supplier</label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  type="text"
                  name="supplier"
                  value={itemObj.supplier}
                  onChange={handleUpdatechange}
                />
              </FormGroup>
              <FormGroup>
                <label className="font-semibold mr-4">Value</label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  type="number"
                  name="value"
                  onChange={(e) => handleUpdatechange(e, 'residualValue')}
                  value={itemObj.value}
                />
              </FormGroup>
              <FormGroup>
                <label className="font-semibold mr-4">Depreciation Time</label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  type="number"
                  name="months_de"
                  onChange={(e) => handleUpdatechange(e, 'depreciation')}
                  value={itemObj.months_de}
                />
              </FormGroup>
              <FormGroup>
                <label className="font-semibold mr-4">Residual value</label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none bg-slate-300"
                  type="number"
                  value={isNaN(itemObj.re_value) ? 0 : itemObj.re_value}
                  name="re_value"
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <label className="font-semibold mr-4">
                  Annual depreciation
                </label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none bg-slate-300"
                  type="number"
                  name="annual_de"
                  value={isNaN(itemObj.annual_de) ? 0 : itemObj.annual_de}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <label className="font-semibold mr-4">
                  Monthly depreciation
                </label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none bg-slate-300"
                  type="number"
                  name="monthly_de"
                  value={isNaN(itemObj.montlhy_de) ? 0 : itemObj.montlhy_de}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <label className="font-semibold mr-4">Value in books</label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none bg-slate-300"
                  type="number"
                  name="value_books"
                  value={isNaN(itemObj.value_books) ? 0 : itemObj.value_books}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <label className="font-semibold mr-4">Observation</label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  type="text"
                  name="observation"
                  onChange={handleUpdatechange}
                  value={itemObj.observation}
                />
              </FormGroup>
              <FormGroup>
                <label className="font-semibold mr-4">Insured</label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-"
                  type="number"
                  name="insured"
                  onChange={handleUpdatechange}
                  value={itemObj.insured}
                />
              </FormGroup>
              <FormGroup className="flex items-center w-1/5 justify-between">
                <label className="font-semibold mr-4">Status</label>
                <input
                  className="w-10 h-10 p-1 rounded-md bg-red-500"
                  type="checkbox"
                  name="assetActive"
                  onChange={(e) => handleUpdatechange(e, 'active')}
                  // value={itemObj.assetActive}
                  defaultChecked={itemObj.assetActive === '1' ? true : false}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <div className='flex justify-evenly'>
          <button className='mb-4 w-25 py-2 font-semibold bg-slate-500 text-slate-300 text-md rounded-md hover:bg-slate-700' onClick={openModalWarning}>Copy Item</button>
          </div>
        </div>
        <div className="flex justify-evenly">
          <button
            className="text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-500 hover:bg-slate-800"
            onClick={editItem}
          >
            Edit
          </button>
          <button
            className="text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-600 hover:bg-slate-800"
            onClick={() => setOcModalUpdate(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Add User modal*/}
      <Modal isOpen={ocModalAdd}>
        <div className="text-center bg-slate-700">
          <h3 className="font-bold text-center text-2xl py-2 text-slate-200">
            Add Item
          </h3>
        </div>
        {/* form */}
        <div className="bg-slate-200">
          <ModalBody>
            <Form>
              {/* <FormGroup>
            <label className="className='font-bold mr-4'">Id</label>
            <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' id="id" name='id' type="number" defaultValue={getAllItems(true)}  readOnly/>
          </FormGroup> */}
              <FormGroup>
                <label className="className='font-bold mr-4'">
                  Acquisition date
                </label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  name="acquisition_date"
                  type="date"
                  onChange={handleNewItem}
                />
              </FormGroup>
              <FormGroup>
                <label className="className='font-bold mr-4'">Name</label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  name="name"
                  type="text"
                  onChange={handleNewItem}
                />
              </FormGroup>
              <FormGroup>
                <label className="className='font-bold mr-4'">Brand</label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  name="brand"
                  type="text"
                  onChange={handleNewItem}
                />
              </FormGroup>
              <FormGroup>
                <label className="className='font-bold mr-4'">
                  Responsible
                </label>
                <select
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  name="responsible"
                  onChange={handleNewItem}
                  type="text"
                  defaultValue=""
                >
                  <option value=""></option>
                  {activeUserName.map((user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup>
                <label className="className='font-bold mr-4'">supplier</label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  name="supplier"
                  type="text"
                  onChange={handleNewItem}
                />
              </FormGroup>
              <FormGroup>
                <label className="className='font-bold mr-4'">Value</label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  name="value"
                  type="number"
                  onChange={(e) => handleNewItem(e, 'residualValue')}
                />
              </FormGroup>
              <FormGroup>
                <label className="className='font-bold mr-4'">
                  Depreciation Time
                </label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  name="months_de"
                  id="months_de"
                  type="number"
                  onChange={(e) => handleNewItem(e, 'depreciation')}
                />
              </FormGroup>
              <FormGroup>
                <label className="className='font-bold mr-4'">
                  Residual value
                </label>
                <input
                  className="w-full border-2 p-1 border-slate-400 bg-slate-300 rounded-md outline-none"
                  name="re_value"
                  type="number"
                  value={isNaN(newItemObj.re_value) ? 0 : newItemObj.re_value}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <label className="className='font-bold mr-4'">
                  Annual depreciation
                </label>
                <input
                  className="w-full border-2 p-1 border-slate-400 bg-slate-300 rounded-md outline-none"
                  name="annual_de"
                  type="number"
                  value={isNaN(newItemObj.annual_de) ? 0 : newItemObj.annual_de}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <label className="className='font-bold mr-4'">
                  Monthly depreciation
                </label>
                <input
                  className="w-full border-2 p-1 border-slate-400 bg-slate-300 rounded-md outline-none"
                  name="montlhy_de"
                  type="number"
                  value={
                    isNaN(newItemObj.montlhy_de) ? 0 : newItemObj.montlhy_de
                  }
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <label className="className='font-bold mr-4'">
                  Value in books
                </label>
                <input
                  className="w-full border-2 p-1 border-slate-400 bg-slate-300 rounded-md outline-none"
                  name="value_books"
                  type="number"
                  value={
                    isNaN(newItemObj.value_books) ? 0 : newItemObj.value_books
                  }
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <label className="className='font-bold mr-4'">
                  Observation
                </label>
                <textarea
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none resize-none"
                  name="observation"
                  onChange={handleNewItem}
                ></textarea>
              </FormGroup>
              <FormGroup>
                <label className="className='font-bold mr-4'">Insured</label>
                <input
                  className="w-full border-2 p-1 border-slate-400 rounded-md outline-none"
                  name="insured"
                  type="number"
                  onChange={handleNewItem}
                />
              </FormGroup>
            </Form>
          </ModalBody>
        </div>
        <div className="flex justify-evenly">
          <button
            className="text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-500 hover:bg-slate-800"
            onClick={addNewItem}
          >
            Create
          </button>
          <button
            className="text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-600 hover:bg-slate-800"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Modal Warning */}
      <Modal isOpen = {ocModalWarning}>
        <div className='bg-slate-200'>
         <h1 className='text-center w-full font-semibold my-2 text-red-600'>⚠️Warning⚠️</h1>
        <ModalBody>
          <h3 className='text-lg text-center font-semibold'>ARE YOU SURE YOU WANT TO COPY THIS DATA?</h3>
        </ModalBody>
        <div className='flex justify-evenly'>
          <button className='text-2xl text-slate-300 w-1/2 bg-slate-500 py-1 font-bold' onClick={createItemCopied} >Accept</button> 
          <button className='text-2xl text-slate-300 w-1/2 bg-slate-600 py-1 font-bold hover:bg-slate-800'  onClick={closeModalWarning}>Cancel</button> 
        </div>           
      </div>    
      </Modal>
    </>
  )
}
export default Container1Data
