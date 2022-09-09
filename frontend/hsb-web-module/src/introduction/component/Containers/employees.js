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
  const [form, setForm] = useState({id: "",name: "" , email: "" , active: "" ,fechaIngreso: "" ,fechaVacaciones: "", diasVacacionesRestantes: "" , fechaPermisos: ""})

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
          array[counter].fechaIngreso = dato.fechaIngreso;
          array[counter].fechaVacaciones = dato.fechaVacaciones;
          array[counter].diasVacacionesRestantes = dato.diasVacacionesRestantes;
          array[counter].fechaPermisos = dato.fechaPermisos;  
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
        setForm({...form, [e.target.name]: e.target.value})
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

          <ModalBody>
            <FormGroup>
              <label>Id</label>
              <input className="form-control" name="id" type="number" onChange={handleChange} value={form.id} />
            </FormGroup>

            <FormGroup>
              <label>Name:</label>
              <input className="form-control" name="name" type="text" onChange={handleChange} value={form.name}/>
            </FormGroup>

            <FormGroup>
              <label>Email:</label>
              <input className="form-control" name="email" type="email" onChange={handleChange} value={form.email} />
            </FormGroup>
            
            <FormGroup>
              <label>Active:</label>
              <input className="form-control" name="active" type="text" onChange={handleChange} value={form.active}/>
            </FormGroup>

            <FormGroup>
              <label>Fecha Ingreso:</label>
              <input className="form-control" name="fechaIngreso" type="date" onChange={handleChange} value={form.fechaIngreso}/>
            </FormGroup>

            <FormGroup>
              <label>Fechas Vacaciones:</label>
              <input className="form-control" name="fechaVacaciones" type="date" onChange={handleChange} value={form.fechaVacaciones}/>
            </FormGroup>
            
            {/* <FormGroup>
              <label>Numero de Días:</label>
              <input className="form-control" name="fechaVacaciones" type="number" onChange={handleChange} value={form.numeroDías}/>
            </FormGroup> */}

            <FormGroup>
              <label>Días de Vacaciones restantes:</label>
              <input className="form-control" name="diasVacacionesRestantes" type="text" onChange={handleChange} value={form.diasVacacionesRestantes}/>
            </FormGroup>
            
            <FormGroup>
              <label>Fechas de Permisos:</label>
              <input className="form-control" name="fechaPermisos" type="date" onChange={handleChange} value={form.fechaPermisos}/>
            </FormGroup>
            
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => edit(form)}>Edit</Button>
            <Button color="danger" onClick={() => closeModalUpdate()}>Cancel</Button>
          </ModalFooter>
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