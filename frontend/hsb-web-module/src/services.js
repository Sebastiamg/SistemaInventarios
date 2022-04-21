import axios from "axios"


function apiSigiUp (props) {   
    console.log(props);
    axios.post('http://localhost/rest-api/api/create_user.php',props).then((res)=>console.log(res.data)).catch(function (error) {console.log(error);})
}




async function apiSigiIn (props) {   
    console.log(props);
    await axios.post('http://localhost/rest-api/api/login.php',props)
                .then((res)=>
                {
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
    
 const api = {apiTokenAcces,apiTokenAccesId,apiSigiUp,apiSigiIn};
export default api ;