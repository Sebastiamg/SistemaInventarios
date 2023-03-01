import './Container1Data.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter} from "reactstrap";
import NavBar from '../navBar/navBar';
import Api from "../../../services"

const Expenses = () => {
  let dataExpenses = []; 
  const [data, setData] = useState(dataExpenses);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalInsert, setModalInsert] = useState(false);
  const [form, setForm] = useState({item: "" ,name: "" ,brand: "" ,acquisition_date: "" ,statusD: "" ,value: "" ,supplier: "" ,observation: "" ,insured: ""})


  const getData = async () => {
    const items = await Api.fun2();
    if(typeof(items) == "undefined"){
      return null;
    } else {
        const url = window.location.href;
        const expenses = "/expenses/";

        const allItems = items.map( elm => {
          const details = JSON.parse(elm["assetDetails"].replace(/&quot;/g, '"'));
          const item =  {
                item: Number(parseInt(elm.id)),
                name: elm.assetName,
                acquisition_date: elm.assetPurchaseDate,
                statusD: elm.assetActive,
                brand: details.brand,
                value: details.value,
                supplier: details.supplier,
                observation: details.observation,
                insured: details.insured,
                itemType: details.itemType
              }
              return item;
        })
        if (url.includes(expenses)) {
          const expenses = allItems.filter(x => x.itemType === "expenses");
          expenses.forEach( x => dataExpenses.push(x))
        }
      };
    };
  getData();



  //UPDATE MODAL
  const showModalUpdate = (dato) => {
    setForm(dato);
    setModalUpdate(true);
};
const closeModalUpdate = () => setModalUpdate(false);

//ADD MODAL
const showModalInsert = () => setModalInsert(true);
const closeModalInsert = () => setModalInsert(false);

//UPDATE
const edit = (dato) => {
  
  var counter = 0;
  var array = data;
  
  array.map( items => {
    if (dato.item === items.item) {
      array[counter].brand = dato.brand;
      array[counter].name = dato.name;
      array[counter].acquisition_date = dato.acquisition_date;
      array[counter].value = dato.value;
      array[counter].supplier = dato.supplier;
      array[counter].statusD = dato.statusD;
      array[counter].observation = dato.observation;
      array[counter].insured = dato.insured; 

    //console.log(array[counter])
    Api.apiUpdate(array[counter]);
    }
    counter++;
    return null
  });
  setData(array);
  setModalUpdate(false)
};

  // URL/Location
const url = window.location.href.toString();

const insert = () => {
  let newValue = form
        newValue.item = parseInt(newValue.item + newValue.brand.length + newValue.value.length + Math.floor(Math.random()*1000));
        
        url.includes("/expenses/") ? 
        newValue["itemType"] = "expenses" : console.log("...")

        console.log(newValue);

        Api.apiCreate(newValue);
        setData([...dataExpenses, newValue]);
        setModalInsert(false)
}
console.log(url.includes("/expenses/"))  


const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
};

    return(<>
        <NavBar/>
        <div id='main-container1'>
        <h1><font size="6">Expenses</font></h1>

            <div id='containerBotones'>
                <Button color='success' id='add' onClick={() => showModalInsert()}>Add
                    <svg  id="Layer_1" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1">
                        {/* <path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm0 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1 -10 10zm5-10a1 1 0 0 1 -1 1h-3v3a1 1 0 0 1 -2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 1 1z"/> */}
                    </svg>
                </Button>
            </div>
            <Container id='tableDad' className='table-responsive'>
                <Table id='table' className='table table-hover table-sm'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Item</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Adquisition Date</th>
                            <th>Value</th>
                            <th>Supplier</th>
                            <th>Insured</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map( (dato, index) => ( 
                        <tr key={dato.item}>
                            <th><Button color="primary" onClick={() => showModalUpdate()}>Details</Button></th>
                            <td>{index + 1}</td>
                            <td>{dato.name}</td>
                            <td>{dato.brand}</td>
                            <td>{dato.acquisition_date}</td>
                            <td>{dato.value}</td>
                            <td>{dato.supplier}</td>
                            <td>{dato.statusD}</td>
                            <td>{dato.insured}</td>
                        </tr>)
                    )}
                    </tbody>
                </Table>
            </Container>


{/* --------------------MODALS------------------- */}
{/* edit modal */}
<Modal isOpen={modalUpdate}>
          <ModalHeader>
           <div><h3>Edit Registration</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label> Item: </label>
              <input className="form-control" readOnly type="text" value={form.item}  />
            </FormGroup>

            <FormGroup>
              <label>Name: </label>
              <input className="form-control" name="name" type="text" onChange={handleChange} value={form.name} />
            </FormGroup>

            <FormGroup>
              <label> Brand: </label>
              <input className="form-control" name="brand" type="text" onChange={handleChange} value={form.brnad} />
            </FormGroup>
            
            <FormGroup>
              <label>Acquisition date: </label>
              <input className="form-control" name="acquisition_date" type="date" onChange={handleChange} value={form.acquisition_date}/>
            </FormGroup>

            <FormGroup>
              <label>Value: </label>
              <input className="form-control" name="value" type="text" onChange={handleChange} value={form.value}/>
            </FormGroup>

            <FormGroup>
              <label>Supplier: </label>
              <input className="form-control" name="supplier" type="text" onChange={handleChange} value={form.supplier}/>
            </FormGroup>

            <FormGroup>
              <label>Insured: </label>
              <input className="form-control" name="insured" type="text" onChange={handleChange} value={form.insured}/>
            </FormGroup>

            <FormGroup>
              <label>Status: </label>
              <input className="form-control" name="statusD" type="text" onChange={handleChange} value={form.statusD}/>
            </FormGroup>  

            <FormGroup>
              <label>Observation: </label>
              <input className="form-control" name="observation" type="text" onChange={handleChange} value={form.observation}/>
            </FormGroup>          
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => edit()}>Edit</Button>
            <Button color="danger" onClick={() => closeModalUpdate()}>Cancel</Button>
          </ModalFooter>
        </Modal>

{/* add item Modal */}
        <Modal isOpen={modalInsert}>
          <ModalHeader>
           <div><h3>Insert Item</h3></div>
          </ModalHeader>

          <ModalBody>

            <FormGroup>
              <label> Item: </label> 
            <input className="form-control" readOnly type="text"/> 
            </FormGroup>
            
            <FormGroup>
              <label>Name: </label>
              <input className="form-control" name="name" type="text" onChange={handleChange}/>
            </FormGroup>

            <FormGroup>
              <label>Brand: </label>
              <input className="form-control" name="brand" type="text" onChange={handleChange}/>
            </FormGroup>
            
            <FormGroup>
              <label>Acquisition date: </label>
              <input className="form-control" name="acquisition_date" type="date" onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Value: </label>
              <input className="form-control" name="value" type="text" onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Supplier: </label>
              <input className="form-control" name="supplier" type="text" onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Insured: </label>
              <input className="form-control" name="insured" type="text" onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Observation: </label>
              <input className="form-control" name="observation" type="text" onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Status: </label>
              <input className="form-control" name="statusD" type="text" onChange={handleChange} />
            </FormGroup>            
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => insert()} > Insert </Button>
            <Button className="btn btn-danger" onClick={() => closeModalInsert()} > Cancel </Button>
          </ModalFooter>
        </Modal>

        </div>
    </>
    )
  } 

  export default Expenses;