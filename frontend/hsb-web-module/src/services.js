import axios from "axios"
//USERS
//registro 
function apiSigiUp (props) {   
    console.log(props);
    axios.post('http://localhost/rest-api/api/create_user.php',props)
    .then((res)=>console.log(res.data))
    .catch(function (error) {console.log(error);})
}

//login
async function apiSigiIn (props) {   
    console.log(props);
    await axios.post('http://localhost/rest-api/api/login.php',props)
                .then((res)=> {
                    sessionStorage.setItem("tokenHsb",res.data.jwt);
                    window.location.href="./activities"
                    console.log(res.data.jwt);
                })
}

function apiTokenAcces () {
    axios.get('https://jsonplaceholder.typicode.com/todos/1').then((res)=>console.log(res.data));
}

async function apiTokenAccesId(props) {
    return await axios.post('http://localhost/rest-api/api/validate_token.php',{"jwt":props});
}

// GET USER
const fun3 = async () => { 
    async function getUser () {   
          const res = await axios.get('http://localhost/rest-api/api/get_user.php')
            if(typeof(res.data) == "string" ) {
                return console.log("No hay usuarios en la bd");
            } else {
                let user = res.data
                return await user
            }
    }    
    return getUser();
}

// console.log(fun3())

//UPDATE USER
function apiUpdateUser(props) { 
    const details = JSON.stringify({
        fechaIngreso: props["fechaIngreso"], 
        fechaVacaciones: props["fechaVacaciones"],
        diasVacacionesRestantes: props["diasVacacionesRestantes"], 
        fechaPermisos: props["fechaPermisos"]
    })

    const item = {"id": props["id"], "name": props["name"], "email": props["email"], "active": props["active"], "details": `${details}`}
    axios.post('http://localhost/rest-api/api/update_user2.php', item)
    .then((res) => console.log(res.data))
    .catch(function (error) {console.log(error);})
}
    

//---------------------------------------- ITEMS

// Create items
function apiCreate (props) {   
    const details = JSON.stringify({
        brand: props["brand"], 
        value: props["value"], 
        supplier: props["supplier"], 
        annual_de: props["annual_de"], 
        montly_de: props["montly_de"], 
        observation: props["observation"], 
        insured: props["insured"],
        itemType: props["itemType"]
    })

    const item = {"item": props["item"], "name": props["name"], "acquisition_date": props["acquisition_date"], "statusD": props["statusD"], "details": `${details}`}

    axios.post('http://localhost/rest-api/api/create_item.php', item )
    .then((res) => console.log(res.data))
    .catch(function (error) {console.log(error);})
}

// GET ITEMS
const fun2 = async () => { 
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

//UPDATE ITEMS
function apiUpdate(props) {    
    const details = JSON.stringify({
        brand: props["brand"], 
        value: props["value"], 
        supplier: props["supplier"], 
        annual_de: props["annual_de"], 
        montly_de: props["montly_de"], 
        observation: props["observation"], 
        insured: props["insured"],
        itemType: props["itemType"]
    })
    // console.log(details)
    const item = {"item": props["item"], "name": props["name"], "acquisition_date": props["acquisition_date"], "statusD": props["statusD"], "details": `${details}`}
    axios.post('http://localhost/rest-api/api/update_item.php', item)
    .then((res) => console.log(res.data))
    .catch(function (error) {console.log(error);})
}


const api = {apiTokenAcces,apiTokenAccesId,apiSigiUp,apiSigiIn, apiCreate, apiUpdate, fun2, fun3, apiUpdateUser};
export default api ;