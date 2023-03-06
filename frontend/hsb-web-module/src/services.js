import axios from "axios"
//USERS
//registro 
async function apiSigiUp(props) {
    const req = await axios.post('http://localhost/rest-api/api/create_user.php', props);
    return new Promise((res, rej) => {
        if (req.status === 200) {
            return res(req.data.message)
        } else {
            return rej(`Error: ${res.statusText}, Status: ${res.status}`);
        }
    })
}

//login
async function apiSigiIn(props) {
    console.log(props);
    await axios.post('http://localhost/rest-api/api/login.php', props)
        .then((res) => {
            sessionStorage.setItem("tokenHsb", res.data.jwt);
            window.location.href = "./activities"
            console.log(res.data.jwt);
        })
}

function apiTokenAcces() {
    axios.get('https://jsonplaceholder.typicode.com/todos/1').then((res) => console.log(res.data));
}

async function apiTokenAccesId(props) {
    return await axios.post('http://localhost/rest-api/api/validate_token.php', { "jwt": props });
}

// GET USER
async function getUsers() {
    const res = await axios.get('http://localhost/rest-api/api/get_user.php');
    if (typeof (res.data) == "string") {
        return console.log("No hay usuarios en la bd");
    } else {
        return {
            data: res.data,
            activeUsers: res.data.filter(user => user.active === "1"),
            inactiveUsers: res.data.filter(user => user.active === "0")
        }
    }
}

//UPDATE USER
async function apiUpdateUser(props) {
    const updatedUser = props
    const res = await axios.post('http://localhost/rest-api/api/update_user2.php', updatedUser)
    if (res.status === 200) {
        return res.data.message;
    } else {
        return `Error: ${res.statusText}, Status: ${res.status}`;
    }
}


//---------------------------------------- ITEMS

// Create items
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
        observation: props["observation"], 
        insured: props["insured"],
        itemType: props["itemType"]
    })

    const item = { "item": props["item"], "name": props["name"], "acquisition_date": props["acquisition_date"], "statusD": props["statusD"], "details": `${details}` }

    axios.post('http://localhost/rest-api/api/create_item.php', item)
        .then((res) => console.log(res.data))
        .catch(function (error) { console.log(error); })
}

// GET ITEMS
const fun2 = async () => {
    async function getItems() {
        const res = await axios.get('http://localhost/rest-api/api/get_item.php')
        if (typeof (res.data) == "string") {
            return console.log("No hay nada en la base de datos");
        } else {
            let items = res.data
            return items
        }
    }

    return getItems();
}

const funExport = async () => {
    async function getExport() {
        const res = await axios.get('http://localhost/rest-api/api/export_excel.php');
    }

    return getExport();
}


//UPDATE ITEMS
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


// -----------------------------------------------------------------
// Liquidacion de compra
function apiLiquidacionCompra(props) {
    const formatoJson = JSON.stringify(props)
    // console.log(formatoJson)
    console.log(props)

    axios.post('http://localhost/rest-api/api/xml/create_xml.php', formatoJson)
        .then((res) => console.log(res.data))
        .catch(function (error) { console.log(error); })
}


const api = { apiTokenAcces, apiTokenAccesId, apiSigiUp, apiSigiIn, apiCreate, apiUpdate, fun2, funExport, getUsers, apiUpdateUser, apiLiquidacionCompra };
export default api;