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

 
      

    const submitValue = () => {
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
      

      if (firstName.value.length < 4) {
        error += `The name is not valid <br>`
        warn = true;
        firstName.value = "";
        firstName.required = true;
      }

      if (lastName.value.length < 4) {
        error += `The last name is not valid <br>`
        warn = true;
        lastName.value = "";
        lastName.required = true
      }

      // console.log(invalidEmail.test(userEmail.value))
      if (!invalidEmail.test(userEmail.value)) {
        error += `The email is not valid <br>` 
        warn = true;
        userEmail.value = "";
        userEmail.required = true;
      }

      if (userPassword.value.length < 6) {
        error += `The password is not valid <br>`  
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
        return <div>
                    <h1 translate="yes">Sign Up</h1>

                    <form id='form'>
                      <label translate="yes">First Name</label>
                      <input type="text" id="firstName" placeholder="First Name" onChange={e => setUsername(e.target.value)} />

                      <label translate="yes">Last Name</label>
                      <input type="text" id="lastName" placeholder="Last Name" onChange={e => setLastname(e.target.value)} />

                      <label translate="yes">Number id/Pastport</label>
                      <input type="number" id="numberId" placeholder=" Number id/pastport" onChange={e => setid(e.target.value)} />

                      <label translate="yes">Phone Number</label>
                      <input type="number" id="phone" placeholder="Phone" onChange={e => setPhoneNumber(e.target.value)} required />

                      <label translate="yes">Email</label>
                      <input type="email" id="userEmail" placeholder="Email" onChange={e => setEmail(e.target.value)} />

                      <label translate="yes">Password</label>
                      <input type="password" id="userPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                      
                      <p className='warnings' id='warnings'></p>

                      <br/><br/>
                      
                      
                      <input type="submit" id="submit" className="button" onClick={submitValue} translate="yes" value="Sign Up" />
                    </form>
              </div>
      }else{return null }
}




 function SiginIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitValue = () => {
      const user = {

          'email' : email,
          'password' : password
      }

      Api.apiSigiIn(user);
    }


    if (props.state ) {
      return <div>

                  <h1 translate="yes">Welcome</h1>
                  <br/>
                  <label translate="yes">Email</label>
                  <br/>
                  <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                  <br/> 
                  <label translate="yes">Password</label>
                  <br/>
                  <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                  
                  <p><button className="button" onClick={submitValue} translate="yes">SiginIn</button></p>

            </div>
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
      return <div>
                  <h1 translate="yes">Recover password</h1>
                  <label translate="yes">Please enter the email of your previously registered account</label>
                  
                  <label translate="yes">Email</label>
                  <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />

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
            
              <button onClick={()=>{setshow([true, false, false])}} translate="yes"><h3>Sigin Up</h3></button>
              <button onClick={()=>{setshow([false, true, false])}} translate="yes"><h3>SiginIn</h3></button>
              <button onClick={()=>{setshow([false, false, true])}} translate="yes"><h3>Recover Password</h3></button>

            </div>
        </div>
      </div>
      
  );
}



export default Root;
