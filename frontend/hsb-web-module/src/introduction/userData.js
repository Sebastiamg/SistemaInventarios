import  "./userData.css";
import NavBar from './component/navBar/navBar'
import { useState,useEffect } from 'react';
import Api from "../services";
import Loading from "../introduction/component/loading"



function UserData(props) {
    const [token, settoken] = useState(0)
    const [id, setid] = useState('');
    const [username, setUsername] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');






    const user = {
        'id' : id,
        'name' : username,
        'lastname' : lastname,
        'phone' : phoneNumber,
        'email' : email,
        'password' : password
    }



    useEffect(() => {
        Api.apiTokenAccesId(sessionStorage.getItem("tokenHsb")).then((res)=>{ settoken(res.data.data.id)})
        //console.log(token)
     
     //console.log("pagian de prueba con token de verificacion    " +token)
   if (token === 0) {
   sessionStorage.removeItem("")
   }
 
   },[token])






    return (
        (token === 0) ? <Loading/>:
  
      <div className="root">
        <NavBar/>
        <div>
            <h1 translate="yes">User Profile</h1>
            <div>

                    <label translate="yes">Names</label>

                    <label translate="yes">Last Names</label>

                    <label translate="yes">Number id/Pastport</label>

                    <label translate="yes">Phone Number</label>

                    <label translate="yes">Email</label>

                    <label translate="yes">Password</label>

            </div>
            <div>

                    <label >{user.name}</label>

                    <label >{user.lastname} </label>

                    <label >{user.id}</label>

                    <label >{user.phone}</label>

                    <label >{user.email}</label>

                    <label >***********</label>

            </div>
            <p><button className="button" translate="yes">Data Update</button></p>

        </div>
      </div>
    );
}

export default UserData;