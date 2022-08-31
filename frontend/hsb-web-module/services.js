import axios from "axios"

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
    

//pruebas-------------

// Create items
function apiCreate (props) {   
    // console.log(props);
 
    const item = {"item": props["item"], "name": props["name"], "value": props["value"], "acquisition_date": props["acquisition_date"], "statusD": props["statusD"]};

    console.log(item)
    axios.post('http://localhost/rest-api/api/create_item.php', item )
    .then((res) => console.log(res.data))
    .catch(function (error) {console.log(error);})
}

// get Items
const fun1 = async () => { 
  async function getItems () {   
    try {
        const res = await axios.get('http://localhost/rest-api/api/get_item.php');
        const items = await res.data;
        return items;

    } catch (error) {console.log(error)}
  }
  
  return getItems();
}

//update items

function apiUpdate(props) {   
    // console.log(props);
 
    const item = {"item": props["item"], "name": props["name"], "value": props["value"], "acquisition_date": props["acquisition_date"], "statusD": props["statusD"]};
    console.log(item)
    axios.post('http://localhost/rest-api/api/update_item.php', item)
    .then((res) => console.log(res.data))
    .catch(function (error) {console.log(error);})
}

const api = {apiTokenAcces,apiTokenAccesId,apiSigiUp,apiSigiIn, apiCreate, fun1, apiUpdate};
export default api ;