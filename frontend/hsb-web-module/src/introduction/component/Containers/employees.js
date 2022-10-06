import './Container1Data.css';
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter} from "reactstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import NavBar from '../navBar/navBar';
import Api from "../../../services"

const Employees = () => {
  // Array Items
  let dataUsers = []; 
  // Data Hooks
  const [data, setData] = useState(dataUsers)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [modalInsert, setModalInsert] = useState(false)
  const [form, setForm] = useState({id: "",name: "" , email: "" , active: "" ,fechaIngreso: "" ,fechaVacaciones: [], diasVacacionesRestantes: "" , fechaPermisos: []})

  const getData = async () => {
    const items = await Api.fun3();
    if(typeof(items) == "undefined"){
      // console.log("sin datos disponibles")
      return null;
    } else {

        items.map( elm => {
          const details = JSON.parse(elm["details"].replace(/&quot;/g, '"'));
          const item =  {
                  id: elm.id,
                  name: elm.name,
                  email: elm.email,
                  active: elm.active,
                  //Details
                  fechaIngreso: details.fechaIngreso,
                  fechaVacaciones: details.fechaVacaciones,
                  diasVacacionesRestantes: details.diasVacacionesRestantes,
                  fechaPermisos: details.fechaPermisos,
              }
              return dataUsers.push(item)
        })
      };
    };
  getData();

    //Methods and actions
    //UPDATE MODAL
    const showModalUpdate = (dato) => {
          setForm(dato);
          setModalUpdate(true);
      };
    const closeModalUpdate = () => setModalUpdate(false);
    
    //ADD MODAL
    const showModalInsert = () => setModalInsert(true);
    const closeModalInsert = () => setModalInsert(false);

    // UPDATE
    const edit = (dato) => {
      // console.log(dato); //dato = item editado
      var counter = 0;
      var array = data;
      // console.log(array) //array = todos los items
      array.map( items => {
        if (dato.id === items.id) {
          array[counter].id = dato.id;
          array[counter].name = dato.name;
          array[counter].email = dato.email;
          array[counter].active = dato.active;
          //------------------------details-----------------------//
          array[counter].fechaIngreso = dato.fechaIngreso; ////////fecha ingreso
          //dias restantes
          array[counter].diasVacacionesRestantes = dato.diasVacacionesRestantes + Number(document.querySelector("#diasVacacionesAdicionales").value);
          
          // Fecha Vacaciones
          array[counter].fechaVacaciones[array[counter].fechaVacaciones.length] = {"Fecha": dato.fechaVacaciones.toString(), NumeroDias: dato.numeroDias};
            //Fecha Vac no modificado
          let ultimaFecha = array[counter].fechaVacaciones[array[counter].fechaVacaciones.length-1]["Fecha"];
          ultimaFecha.includes("[object Object]") || ultimaFecha === "" ?
          array[counter].fechaVacaciones.pop() : console.log(null)

          //fechaPermisos
          array[counter].fechaPermisos[array[counter].fechaPermisos.length] = {"Fecha": dato.fechaPermisos.toString(), NumeroDias: dato.numeroDiasP}; 
            // Fecha Perm no modificado
          let ultimaFechaP = array[counter].fechaPermisos[array[counter].fechaPermisos.length-1]["Fecha"];
          ultimaFechaP.includes("[object Object]") || ultimaFechaP === "" ?
          array[counter].fechaPermisos.pop() : console.log(null)

          console.log(array[counter])
          Api.apiUpdateUser(array[counter]);
        }
        counter++;
        return null
      });
      setData(array);
      setModalUpdate(false)
    };

    // handleChange
      const handleChange = (e) => {
        if (e.target.name === "fechaVacaciones" || e.target.name === "fechaPermisos") {
          setForm({...form, [e.target.name]: [e.target.value]}) //Fechas V array
        }   else { 
          setForm({...form, [e.target.name]: e.target.value})
        }
      };

    return(<>
        <NavBar/>       {/* NavBar 2*/}
        <div id='main-container1'>
        <h1><font size="6">Inventary</font></h1>

        <div id='containerBotones'>
          <Button color="success" id='add' onClick={() => showModalInsert()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bug-fill" viewBox="0 0 16 16">
  <path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A4.985 4.985 0 0 0 3 6h10a4.985 4.985 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A4.978 4.978 0 0 0 8 1a4.979 4.979 0 0 0-2.731.811l-.29-.956z"/>
  <path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5H13zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975z"/>
</svg></Button>
        </div>
        <div className="table-responsive">
        
        </div>
          <Container id='tableDad' className='table-responsive'>
            <Table id='table' className='table table-hover table-sm'> {/*Bootstrap*/}
              <thead>
                <tr>
                <th></th>
                <th>Id</th><th>Name</th><th>Email</th><th>Active</th>
                </tr>
              </thead>
              <tbody>
                {data.map( (dato) => ( 
                  <tr key={dato.id}>
                    <th><Button color="primary" onClick={() => showModalUpdate(dato)}>Details</Button></th>
                    <td>{dato.id}</td>
                    <td>{dato.name}</td>
                    <td>{dato.email}</td>
                    <td>{dato.active}</td>
                  </tr>)
                  )}
              </tbody>
            </Table>
          </Container>

{/* --------------------MODALS------------------- */}
{/* edit modal */}
        <Modal isOpen={modalUpdate}>
          <ModalHeader>
           <div><h3>Edit User</h3></div>
          </ModalHeader>
<div className='container'>
          <ModalBody>
            <div className='row'>
              <FormGroup className='col'>
                <label>Identification:</label>
                <input className="form-control" name="id" type="number" onChange={handleChange} value={form.id} />
              </FormGroup>

              <FormGroup className='col'> 
                <label>Name:</label>
                <input className="form-control" name="name" type="text" onChange={handleChange} value={form.name}/>
              </FormGroup>
            </div>
            <FormGroup>
              <label>Email:</label>
              <input className="form-control" name="email" type="email" onChange={handleChange} value={form.email} />
            </FormGroup>

            {/* Active Checkbox */}

            <FormGroup>
            <label>Active:</label>
              <input className="form-control" name="active" type="text" onChange={handleChange} value={form.active}/>
            </FormGroup>


            <FormGroup>
              <label>Fecha Ingreso:</label>
              <input className="form-control" name="fechaIngreso" type="date" onChange={handleChange} value={form.fechaIngreso}/>
            </FormGroup>
                  {/* Fechas Grid */}
            <div className='row vacasiones'>
              <FormGroup className='col'>
                <label>Fechas Vacaciones:</label>
                <input className="form-control" name="fechaVacaciones" type="date" onChange={handleChange} value={form.fechaVacaciones}/>
              </FormGroup>
              <FormGroup className='col'>
                <label>Número de Días:</label>
                <input className="form-control" name="numeroDias" type="number" onChange={handleChange}/>
              </FormGroup>
              <FormGroup className='col'>
                <label>Días restantes:</label>
                <input className="form-control" name="diasVacacionesRestantes" type="number" readOnly value={form.diasVacacionesRestantes - form.fechaVacaciones.map(x => parseInt(x.NumeroDias)).reduce((total, vActual) => total + vActual, 0)}/> {/*Dias Restantes de acuerdo a las fechas de V*/}
              </FormGroup>
              <FormGroup className='col'> {/*ADICIONALESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS */}
                <label>Días adicionales:</label>
                <input className="form-control" name="diasVacacionesAdicionales" type="number" id="diasVacacionesAdicionales"/>
              </FormGroup>
            </div>
            {/* tabla Vacaciones */}
            <table class="table mb-5">
              <thead class="table-dark">
                <tr>
                  <th scope="col">Fecha Inicio</th>
                  <th scope="col">Días</th>
                </tr>
              </thead>
              <tbody>
                  {(form.fechaVacaciones.map( x => (
                  <tr key={x["Fecha"]}>  
                    <td>{x["Fecha"]}</td>
                    <td>{x["NumeroDias"]}</td>
                  </tr>
                    )))}
              </tbody>
            </table>

            <div className='row'>
              <FormGroup className='col'>
                <label>Fechas de Permisos:</label>
                <input className="form-control" name="fechaPermisos" type="date" onChange={handleChange} value={form.fechaPermisos}/>
              </FormGroup>
              <FormGroup className='col'>
                <label>Número de Días:</label>
                <input className="form-control" name="numeroDiasP" type="number" onChange={handleChange}/>
              </FormGroup>
            </div>
                        {/* tabla Permisos */}
            <table class="table mb-5">
              <thead class="table-dark">
                <tr>
                  <th scope="col">Fecha de Permiso</th>
                  <th scope="col">Días</th>
                </tr>
              </thead>
              <tbody>
                  {(form.fechaPermisos.map( x => (
                  <tr key={x["Fecha"]}>                            
                    <td>{x["Fecha"]}</td>
                    <td>{x["NumeroDias"]}</td>
                  </tr>
                    )))}
              </tbody>
            </table>
            
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => edit(form)}>Edit</Button>
            <Button color="danger" onClick={() => closeModalUpdate()}>Cancel</Button>
          </ModalFooter>
    </div>
        </Modal>

{/* add item Modal */}
        <Modal isOpen={modalInsert}>
            <Button className="btn btn-danger" onClick={() => closeModalInsert()} > Cancel </Button>
        </Modal>    
        </div>
      </>
    )
  } 

  export default Employees;