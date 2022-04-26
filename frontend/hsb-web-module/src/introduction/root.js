import './root.css';
import NavBarInto from '../introduction/component/navBar/navBarInto'
import { useState } from 'react';
import  Api  from "../services";


 

function SiginUp(props) {
    const [id, setid] = useState('');
    const [username, setUsername] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

 
      //Registro

    const submitValue = (evt) => {
              //Validaciones (Sebastian)//

      const firstName = document.querySelector("#firstName");
      const lastName = document.querySelector("#lastName");
      //  const numberId = document.getElementById("numberId");
      //  const phone = document.getElementById("phone");
      const userEmail = document.querySelector("#userEmail");
      const userPassword = document.getElementById("userPassword")
      const warnings = document.querySelector("#warnings")
      warnings.innerHTML = "";


      let error = "";
      let warn = false;
      let invalidEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      
      //nombre
      if (firstName.value.length < 4) {
        error += `❌ Name is not valid <br>`
        warn = true;
        firstName.value = "";
        userPassword.value = "";
        firstName.required = true;
      }
      //apellido
      if (lastName.value.length < 4) {
        error += `❌ Last name is not valid <br>`
        warn = true;
        lastName.value = "";
        userPassword.value = "";
        lastName.required = true
      }
      //email
      // console.log(invalidEmail.test(userEmail.value))
      if (!invalidEmail.test(userEmail.value)) {
        error += `❌ Email is not valid <br>` 
        warn = true;
        userEmail.value = "";
        userPassword.value = "";
        userEmail.required = true;
      }
      //contaseña
      if (userPassword.value.length < 6) {
        error += `❌ Password is not valid <br>`  
        warn = true
        userPassword.value = "";
        userPassword.required = true;
      }

      if (warn) {
        warnings.innerHTML = error
      }
     
      const user = {
          'id' : id,
          'name' : username,
          'lastname' : lastname,
          'phone' : phoneNumber,
          'email' : email,
          'password' : password
      }

      Api.apiSigiUp(user);
      //console.log(user);
    }


   

      if (props.state) {
        return <div id='registerContainer'>
          <h1 translate="yes">Sign Up</h1>

            <form id='formRegister'>
              <label translate="yes" className='registerLabel'>First Name</label>
              <input type="text" id="firstName" className='inputRegister' placeholder="First Name" onChange={e => setUsername(e.target.value)} />

              <label translate="yes" className='registerLabel'>Last Name</label>
              <input type="text" id="lastName" className='inputRegister' placeholder="Last Name" onChange={e => setLastname(e.target.value)} />

              <label translate="yes" className='registerLabel'>Number id/Pastport</label>
              <input type="number" id="numberId" className='inputRegister' placeholder=" Number id/pastport" onChange={e => setid(e.target.value)} />

              <label translate="yes" className='registerLabel'>Phone Number</label>
              <input type="number" id="phone" className='inputRegister' placeholder="Phone" onChange={e => setPhoneNumber(e.target.value)} required />

              <label translate="yes" className='registerLabel'>Email</label>
              <input type="email" id="userEmail" className='inputRegister' placeholder="Email" onChange={e => setEmail(e.target.value)} />

              <label translate="yes" className='registerLabel'>Password</label>
              <input type="password" id="userPassword" className='inputRegister' placeholder="Password" onChange={e => setPassword(e.target.value)} />
                      
              <p className='warnings' id='warnings'></p>
   
              <input type="submit" id="submit" className="button" onClick={submitValue} translate="yes" value="Sign Up" />
            </form>
              </div>
      }else{return null }
}


//Sign In

 function SiginIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitValue = evt => {
      evt.preventDefault(); //preventDefault

      const user = {
          'email' : email,
          'password' : password
      }

      Api.apiSigiIn(user);
    }
    
    if (props.state ) {
      return <>
                  
            <h1 translate="yes">Welcome</h1>

          <form className='flexForm'>

            <label translate="yes" className='loginLabel'>Email</label>
            <input className='inputLogin' type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />

            <label translate="yes" id='loginPassword' className='loginLabel'>Password</label>
            <input className='inputLogin' type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                  
            <button className="button" onClick={submitValue} translate="yes">Sign In</button>

          </form>

            </>

    }else{return null}
}
 



 function NewPassword(props) {
  const [email, setEmail] = useState('');


  const submitValue = () => {
    const frmdetails = {

        'Email' : email
    }
    console.log(frmdetails);
    }


    if (props.state ) {
      return <div id="recoverPassword">
                  <h1 translate="yes">Recover password</h1>
                  <label translate="yes" className='recoverLabel'>Please enter the email of your previously registered account</label>
                  
                  <input type="email" className='inputRecover' placeholder="Email" onChange={e => setEmail(e.target.value)} />

                  <p><button className="button" onClick={submitValue} translate="yes">Request</button></p>

              </div>
    }else{return null}
}

  
  



function Root() {
  const [show, setshow] = useState([false, true, false]);
 
  return (
      <div className="root">
        <NavBarInto/>

        <div className="container-body">
            <div className="content1">
              <SiginUp state={show[0]}/>
              <SiginIn state={show[1]}/>
              <NewPassword state={show[2]}/> 
            </div>

            <div className="content2">
            
              <button className='buttonOptions' onClick={()=>{setshow([true, false, false])}} translate="yes">Sign Up</button>

              <button className='buttonOptions' onClick={()=>{setshow([false, true, false])}} translate="yes">Sign In</button>

              <button className='buttonOptions' onClick={()=>{setshow([false, false, true])}} translate="yes">Recover Password</button>

            </div>
        </div>
      </div>
      
  );
}



export default Root;
