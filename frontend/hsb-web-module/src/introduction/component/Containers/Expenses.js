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
  const [form, setForm] = useState({item: "" ,name: "" ,brand: "" ,acquisition_date: "" ,statusD: "" ,value: "" ,supplier: "" ,observation: ""})


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

  const getExport = async () => {
    const exports = await Api.funExport();
    };
  getExport();


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
  console.log("hgola")
  let newValue = form
        newValue.item = parseInt(newValue.item + newValue.brand.length + newValue.value.length + Math.floor(Math.random()*1000));
        
        url.includes("/expenses/") ? 
        newValue["itemType"] = "expenses" : console.log("...")

        console.log(newValue);

        Api.apiCreate(newValue);
        setData([...dataExpenses, newValue]);
        setModalInsert(false)
}


const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
};

    return(<>
        <NavBar/>
        <div className='border-3 border-slate-500 rounded-xl mx-5 my-4 shadow-md shadow-slate-600'>
        <h1 className='text-3xl font-bold py-3 bg-slate-300 rounded-t-xl border-b-4 border-slate-400 text-center'>Expenses</h1>

            <div id='containerBotones'>
                <Button color='success' id='add' onClick={() => showModalInsert()}>Add
                    {/* <svg  id="Layer_1" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1">
                        <path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm0 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1 -10 10zm5-10a1 1 0 0 1 -1 1h-3v3a1 1 0 0 1 -2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 1 1z"/>
                    </svg> */}
                </Button>
                {/* <Button color='success' id='add' onClick={() => getExport()}>Export
                </Button> */}
            </div>
            <Container className='text-xl table-responsive'>
                <Table className='table-auto w-full mb-4'>
                    <thead className='border-b-2 border-slate-500'>
                        <tr className='h-16'>
                            <th></th>
                            <th>Item</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Adquisition Date</th>
                            <th>Value</th>
                            <th>Supplier</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map( (dato, index) => ( 
                        <tr key={dato.item}>
                            <th><Button class="bg-slate-500 hover:bg-slate-600 transition-all w-3/5 border-2 font-semibold py-1 border-slate-600 text-slate-100 rounded-md details" onClick={() => showModalUpdate(dato)}>Details</Button></th>
                            <td>{index + 1}</td>
                            <td>{dato.name}</td>
                            <td>{dato.brand}</td>
                            <td>{dato.acquisition_date}</td>
                            <td>{dato.value}</td>
                            <td>{dato.supplier}</td>
                            <td>{dato.statusD}</td>
                        </tr>)
                    )}
                    <div></div>
                    </tbody>
                </Table>
            </Container>


{/* --------------------MODALS------------------- */}
{/* edit modal */}
<Modal isOpen={modalUpdate}>
          <ModalHeader className='text-center bg-slate-700'>
            <h3 className='font-bold text-center text-2xl py-2 text-slate-200'>Edit User</h3>
          </ModalHeader>

          <ModalBody>
            <FormGroup className='w-2/5 flex flex-col px-2 '>
              <label className='font-bold mr-4'>Name: </label>
              <input  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none'  name="name" type="text" onChange={handleChange} value={form.name} />
            </FormGroup>

            <FormGroup>
              <label className='font-bold mr-4'> Brand: </label>
              <input  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none'  name="brand" type="text" onChange={handleChange} value={form.brand} />
            </FormGroup>
            
            <FormGroup>
              <label className='font-bold mr-4'>Acquisition date: </label>
              <input  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="acquisition_date" type="date" onChange={handleChange} value={form.acquisition_date}/>
            </FormGroup>

            <FormGroup>
              <label className='font-bold mr-4'>Value: </label>
              <input  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="value" type="text" onChange={handleChange} value={form.value}/>
            </FormGroup>

            <FormGroup>
              <label className='font-bold mr-4'>Supplier: </label>
              <input  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none'  name="supplier" type="text" onChange={handleChange} value={form.supplier}/>
            </FormGroup>

            <FormGroup>
              <label className='font-bold mr-4'>Status: </label>
              <input  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="statusD" type="text" onChange={handleChange} value={form.statusD}/>
            </FormGroup>  

            <FormGroup>
              <label className='font-bold mr-4'>Observation: </label>
              <input  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="observation" type="text" onChange={handleChange} value={form.observation}/>
            </FormGroup>          
          </ModalBody>

          <ModalFooter className='flex justify-evenly'>
            <Button className='text-2xl font-bold text-slate-300 py-1 bg-slate-500 hover:bg-slate-800' onClick={() => edit(form)}>Edit</Button>
            <Button className='text-2xl font-bold text-slate-300 py-1 bg-slate-600 hover:bg-slate-800' color="danger" onClick={() => closeModalUpdate()}>Cancel</Button>
          </ModalFooter>
        </Modal>

{/* add item Modal */}
        <Modal isOpen={modalInsert}>
          <ModalHeader>
           <div><h3>Insert Item</h3></div>
          </ModalHeader>

          <ModalBody>

            <FormGroup>
              <label className='font-bold mr-4'> Item: </label> 
            <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' readOnly type="text"/> 
            </FormGroup>
            
            <FormGroup>
              <label className='font-bold mr-4'>Name: </label>
              <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="name" type="text" onChange={handleChange}/>
            </FormGroup>

            <FormGroup>
              <label className='font-bold mr-4'>Brand: </label>
              <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="brand" type="text" onChange={handleChange}/>
            </FormGroup>
            
            <FormGroup>
              <label className='font-bold mr-4'>Acquisition date: </label>
              <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="acquisition_date" type="date" onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <label className='font-bold mr-4'>Value: </label>
              <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="value" type="text" onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <label className='font-bold mr-4'>Supplier: </label>
              <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="supplier" type="text" onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <label className='font-bold mr-4'>Observation: </label>
              <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="observation" type="text" onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <label className='font-bold mr-4'>Status: </label>
              <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="statusD" type="text" onChange={handleChange} />
            </FormGroup>            
          </ModalBody>

          <ModalFooter>
            <Button className='text-2xl font-bold text-slate-300 py-1 bg-slate-600 hover:bg-slate-800' onClick={() => insert()} > Insert </Button>
            <Button className='text-2xl font-bold text-slate-300 py-1 bg-slate-600 hover:bg-slate-800' onClick={() => closeModalInsert()} > Cancel </Button>
          </ModalFooter>
        </Modal>


        </div>
    </>
    )
  } 

  export default Expenses;