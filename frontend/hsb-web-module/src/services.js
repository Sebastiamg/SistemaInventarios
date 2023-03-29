import axios from 'axios'
//USERS
//registro
async function apiSigiUp(props) {
  const req = await axios.post(
    'http://localhost/rest-api/api/create_user.php',
    props,
  )
  return new Promise((res, rej) => {
    if (req.status === 200) {
      return res(req.data.message)
    } else {
      return rej(`Error: ${res.statusText}, Status: ${res.status}`)
    }
  })
}

//login
async function apiSigiIn(props) {
  console.log(props)
  await axios
    .post('http://localhost/rest-api/api/login.php', props)
    .then((res) => {
      sessionStorage.setItem('tokenHsb', res.data.jwt)
      window.location.href = './activities'
      console.log(res.data.jwt)
    })
}

function apiTokenAcces() {
  axios
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then((res) => console.log(res.data))
}

async function apiTokenAccesId(props) {
  return await axios.post('http://localhost/rest-api/api/validate_token.php', {
    jwt: props,
  })
}

// GET USER
async function getUsers() {
  const res = await axios.get('http://localhost/rest-api/api/get_user.php')
  if (typeof res.data == 'string') {
    return console.log('Empty BD')
  } else {
    return {
      data: res.data,
      activeUsers: res.data.filter((user) => user.active === '1'),
      inactiveUsers: res.data.filter((user) => user.active === '0'),
    }
  }
}

//UPDATE USER
async function apiUpdateUser(props) {
  const updatedUser = props
  const res = await axios.post(
    'http://localhost/rest-api/api/update_user2.php',
    updatedUser,
  )
  if (res.status === 200) {
    return res.data.message
  } else {
    return `Error: ${res.statusText}, Status: ${res.status}`
  }
}

// Create items
async function createItem(props) {
  const req = await axios.post(
    'http://localhost/rest-api/api/create_item.php',
    props,
  )
  return new Promise((res, rej) => {
    if (req.status === 200) {
      return res(req.data.message)
    } else {
      return rej(`Error: ${res.statusText}, Status: ${res.status}`)
    }
  })
}

// GET ITEMS
async function getItems() {
  const res = await axios.get('http://localhost/rest-api/api/get_item.php')
  if (typeof res.data == 'string') {
    return null
  } else {
    return {
      items: res.data || [],
      activeItems: res.data.filter((item) => item.active === '1'),
      inactiveItems: res.data.filter((item) => item.inactive === '0'),
    }
  }
}

//UPDATE ITEMS
async function updateItem(props) {
  const item = props
  const req = await axios.post(
    'http://localhost/rest-api/api/update_item.php',
    item,
  )
  return new Promise((res, rej) => {
    if (req.status === 200) {
      return res(req.data.message)
    } else {
      return rej(`Error: ${res.statusText}, Status: ${res.status}`)
    }
  })
}

//catolog
const apiGetCatalog = async () => { 
  async function getCatalog () {   
        const res = await axios.get('http://localhost/rest-api/api/get_catalog.php')
          if(typeof(res.data) == "string" ) {
              return console.log("Sin usuarios registrados");
          } else {
              let user = res.data
              return await user
          }
  }    
  return getCatalog();
}


// -----------------------------------------------------------------
// Liquidacion de compra
function apiLiquidacionCompra(props) {
  const formatoJson = JSON.stringify(props)
  // console.log(formatoJson)
  console.log(props)

  axios
    .post('http://localhost/rest-api/api/xml/create_xml.php', formatoJson)
    .then((res) => console.log(res.data))
    .catch(function (error) {
      console.log(error)
    })
}

// -----------------------------------------------------------------
function apiUpdate(props) {
  const details = JSON.stringify({
      brand: props["brand"], 
      value: props["value"],
      months_de:props["months_de"], 
      supplier: props["supplier"],
      re_value: props["re_value"], 
      annual_de: props["annual_de"], 
      montly_de: props["montly_de"],
      value_books:props["value_books"],
      responsible: props["responsible"], 
      description: props["description"], 
      observation: props["observation"], 
      insured: props["insured"],
      itemType: props["itemType"]
  })
  // console.log(details)
  const item = { "item": props["item"], "name": props["name"], "acquisition_date": props["acquisition_date"], "statusD": props["statusD"], "details": `${details}` }
  axios.post('http://localhost/rest-api/api/update_item.php', item)
      .then((res) => console.log(res.data))
      .catch(function (error) { console.log(error); })
}

function apiCreate(props) {
  const details = JSON.stringify({
      brand: props["brand"], 
      value: props["value"],
      months_de:props["months_de"], 
      supplier: props["supplier"],
      re_value: props["re_value"],
      annual_de: props["annual_de"], 
      montly_de: props["montly_de"],
      value_books:props["value_books"],
      description: props["description"], 
      observation: props["observation"], 
      responsible: props["responsible"], 
      insured: props["insured"],
      itemType: props["itemType"]
  })
  const item = { 
    "item": props["item"], 
    "name": props["name"], 
    "acquisition_date": props["acquisition_date"], 
    "statusD": props["statusD"], 
    "details": `${details}` 
  }
  axios.post('http://localhost/rest-api/api/create_item.php', item)
      .then((res) => console.log(res.data))
      .catch(function (error) { console.log(error); })
}

function apiCreateCatalog(props) {
  const item = { "id": props["id"], "idCatalog": props["idCatalog"], "catalogDetailName": props["catalogDetailName"]}
  axios.post('http://localhost/rest-api/api/create_catalog_op.php', item)
      .then((res) => console.log(res.data))
      .catch(function (error) { console.log(error); })
}

const apiGetItem = async () => { 
  async function getItems () {   
        const res = await axios.get('http://localhost/rest-api/api/get_item.php')
          if(typeof(res.data) == "string" ) {
              return console.log("No hay nada en la base de datos");
          } else {
              let items = res.data
              return items
          }
  }    
  return getItems();
}

const apiGetUser = async () => { 
  async function getUser () {   
        const res = await axios.get('http://localhost/rest-api/api/get_user.php')
          if(typeof(res.data) == "string" ) {
              return console.log("Sin usuarios registrados");
          } else {
              let user = res.data
              return await user
          }
  }    
  return getUser();
}
// -----------------------------------------------------------------
const api = {
  apiTokenAcces,
  apiTokenAccesId,
  apiSigiUp,
  apiSigiIn,
  createItem,
  updateItem,
  getItems,
  getUsers,
  apiUpdateUser,
  apiLiquidacionCompra,
  apiGetUser,
  apiGetItem,
  apiUpdate,
  apiCreate,
  apiCreateCatalog,
  apiGetCatalog
}
export default api
