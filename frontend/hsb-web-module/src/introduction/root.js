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
    const details = {"fechaIngreso": "","fechaVacaciones": [],"fechaProvisionVacaciones": "","diasVacacionesRestantes": 11,"fechaPermisos": []};


  //Register Button

  const Register = (evt) => {
    evt.preventDefault();

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");  
    const idNumber = document.getElementById("idNumber");  
    const phone = document.getElementById("phoneNumber"); 
    const userEmail = document.getElementById("userEmail");
    const userPassword = document.getElementById("userPassword");  
    const SignUpError = document.getElementById("SignUpError");
    const formRegister = document.getElementById("formRegister")


  //regular expressions
  const expressions = {
    firstName: /^[a-zA-ZÀ-ÿ\s]{3,10}$/, 
    lastName: /^[a-zA-ZÀ-ÿ\s]{3,10}$/,
    phoneNumber: /^\d{10}$/,
    idNumber: /^\d{7}$/,
    email: /^[-\w.%+]{3,25}@(?:[A-Z0-9-]{3,20}\.)[A-Z]{2,10}$/i, 
    password: /^.{5,15}$/,
  };
  
  const validInputs = { 
    validName: false,  
    validLName: false,
    validPNumber: false,
    validIdNumber: false,
    validEmail: false, 
    validPassword: false,
    }
  
        const okay = (inputItem, errorMessage) => {
          inputItem.classList.add("okay");
          inputItem.classList.replace("error", "okay");
          errorMessage = document.getElementById(errorMessage)
          errorMessage.textContent = "";
        }

        const error = (inputItem, errorMesage, a) => {
          inputItem.classList.add("error");
          inputItem.classList.replace("okay", "error");
          errorMesage = document.getElementById(errorMesage)
          errorMesage.textContent = `Enter a valid ${a}`
        }

          //Validations
          //first name
          if (expressions.firstName.test(firstName.value)) {
            okay(firstName, "firstNameError");
            validInputs.validName = true;
          } else {
            error(firstName, "firstNameError", "First Name");
            validInputs.validName = false;
          }
          //last name
          if (expressions.lastName.test(lastName.value)) {
            okay(lastName, "lastNameError")
            validInputs.validLName = true;
          } else {
            error(lastName, "lastNameError", "Last Name")
            validInputs.validLName = false;
          }
          //id number
          if (expressions.idNumber.test(idNumber.value)) {
            okay(idNumber, "idNumberError");
            validInputs.validIdNumber = true;
          } else {
            error(idNumber, "idNumberError", "ID Number / Passport");
            validInputs.validIdNumber = false;
          }
          //phone number
          if (expressions.phoneNumber.test(phone.value)) {
            okay(phone, "phoneNumberError");
            validInputs.validPNumber = true;
          } else {
            error(phone, "phoneNumberError", "Phone Number");
            validInputs.validPNumber = false;
          }
          //email
          if (expressions.email.test(userEmail.value)) {
            okay(userEmail, "userEmailError");
            validInputs.validEmail = true;
          } else {
            error(userEmail, "userEmailError", "Email");
            validInputs.validEmail = false; 
          }
          //password
          if (expressions.password.test(userPassword.value)) {
            okay(userPassword, "userPasswordError");
            validInputs.validPassword = true;
          } else { 
            error(userPassword,"userPasswordError", "Password");
            validInputs.validPassword = false;
          } 


  const submitValue = () => {
    const userDetails = JSON.stringify(details);
    const user = {
      'id' : id,
      'name' : username,
      'lastname' : lastname,
      'phone' : phoneNumber,
      'email' : email,
      'password' : password,
      'details': userDetails

    }
      Api.apiSigiUp(user);  //------------------------Le pasamos el usuario
    }


          if (validInputs.validName && validInputs.validLName && validInputs.validIdNumber && validInputs.validPNumber && validInputs.validEmail && validInputs.validPassword) {
            
            SignUpError.classList.add("successful");
            SignUpError.classList.replace("fail", "successful");
            SignUpError.innerHTML = "Successful registration"
            formRegister.reset();
            
            setTimeout(() => {

              submitValue();
              window.location.href="/"
              
            }, 1000);

          } else {
            SignUpError.classList.add("fail");
            SignUpError.innerHTML = "Error: Complete the form correctly"
          }
       }
     

      if (props.state) {
        return <div id='registerContainer'>
          <h1 translate="yes">Sign Up</h1>

            <form id="formRegister">
              <label translate="yes" className='registerLabel'>First Name</label>
              <input type="text" name="firstName" id="firstName" className='inputRegister' placeholder="First Name" onChange={e => setUsername(e.target.value)} />
              <p id='firstNameError' className='warnings'></p>

              <label translate="yes" className='registerLabel'>Last Name</label>
              <input type="text" name="lastName" id="lastName" className='inputRegister' placeholder="Last Name" onChange={e => setLastname(e.target.value)} />
              <p id='lastNameError' className='warnings'></p>

              <label translate="yes" className='registerLabel'>Id Number/Passport</label>
              <input type="number" name="idNumber" id="idNumber" className='inputRegister' placeholder="Id Number/Passport" onChange={e => setid(e.target.value)} />
              <p id='idNumberError' className='warnings'></p>

              <label translate="yes" className='registerLabel'>Phone Number</label>
              <input type="number" name="phoneNumber" id="phoneNumber" className='inputRegister' placeholder="Phone" onChange={e => setPhoneNumber(e.target.value)} />
              <p id='phoneNumberError' className='warnings'></p>

              <label translate="yes" className='registerLabel'>Email</label>
              <input type="email" name="email" id="userEmail" className='inputRegister' placeholder="Email" onChange={e => setEmail(e.target.value)} />
              <p id='userEmailError' className='warnings'></p>

              <label translate="yes" className='registerLabel'>Password</label>
              <input type="password" name="password" id="userPassword" className='inputRegister' placeholder="Password" onChange={e => setPassword(e.target.value)} />
              <p id='userPasswordError' className='warnings'></p>       
            <p id="SignUpError" className='warnings'></p>
              <button type="submit" id="submit" className="button" onClick={Register} translate="yes" >Sign Up</button>
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
    
    if (props.state) {
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
