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
                  // details: details,
                    //Details
                  fechaIngreso: details.fechaIngreso, //Arr ingreso/salida
                  fechaVacaciones: details.fechaVacaciones,//Arr
                  diasVacacionesRestantes: details.diasVacacionesRestantes, //num
                  fechaPermisos: details.fechaPermisos, //Arr
              }
              console.log(item)
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
          array[counter].diasVacacionesRestantes = dato.diasVacacionesRestantes;
          
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
          console.log(form)
        }
      };

    return(<>
        <NavBar/>       {/* NavBar 2*/}
        <div id='main-container1'>
        <h1><font size="6">Inventary</font></h1>

        <div id='containerBotones'>
          <Button color="success" id='add' onClick={() => showModalInsert()}>Bug</Button>
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
            {/* <div className='col'>
            <p>Active:</p>
                  <input className="form-check-input me-2" name="active" type="checkbox" id='true' onChange={handleChange} autocomplete="off" value={form.active} />
                  <label className='form-check-label me-4' for="true">Active</label>
            </div> */}
            <label>Active:</label>
              <input className="form-control" name="active" type="text" onChange={handleChange} value={form.active}/>
            </FormGroup>


            <FormGroup>
              <label>Fecha Ingreso:</label>
              <input className="form-control" name="fechaIngreso" type="date" onChange={handleChange} value={form.fechaIngreso}/>
            </FormGroup>
                  {/* Fechas Grid */}
            <div className='row'>
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
                <input className="form-control" name="diasVacacionesRestantes" type="text" readOnly value={form.diasVacacionesRestantes - form.fechaVacaciones.map(x => parseInt(x.NumeroDias)).reduce((total, vActual) => total + vActual, 0)}/> {/*Dias Restantes de acuerdo a las fechas de V*/}
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