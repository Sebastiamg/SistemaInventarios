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
  const [form, setForm] = useState({item: "" ,name: "" ,brand: "" ,acquisition_date: "" ,statusD: "" ,value: "" ,supplier: "" , responsible: "", observation: ""})
  const [search, setSearch] = useState("")


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
                  responsible: details.responsible,
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
    // const exports = await Api.funExport();
    };
  getExport();

  let result=[]
  const searcher = (e) =>{
    //setSearch({...form, [e.target.name]: e.target.value})

    setSearch(e.target.value)
    console.log(e.target.value)
  }

  if(!search){
    result=data
  }else{
    result=data.filter((datos) =>
    datos.name.toLowerCase().includes(search.toLocaleLowerCase())

    )
  }

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
      if (array[counter].statusD = dato.statusD === "1"){
        //console.log("esto será activo o en uso")
        array[counter].brand = dato.brand;
        array[counter].name = dato.name;
      array[counter].acquisition_date = dato.acquisition_date;
      array[counter].value = dato.value;
      array[counter].supplier = dato.supplier;
      //array[counter].statusD = dato.statusD;
      /*
      if (array[counter].statusD = dato.statusD === "1"){
        //console.log("esto será activo o en uso")
        dato.statusD = "En uso";
        console.log(dato.statusD)
      } else if (array[counter].statusD = dato.statusD === "0"){
        //console.log("esto será inactivo o desechado")
        dato.statusD = "Desechado";
      } */
      array[counter].responsible = dato.responsible;
      array[counter].observation = dato.observation;
        console.log(dato.statusD)
      }
      

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


const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
};

    return(<>
        <NavBar/>
        <div className='border-3 border-slate-500 rounded-xl mx-5 my-4 shadow-md shadow-slate-600'>
          <h1 className='text-3xl font-bold py-3 bg-slate-300 rounded-t-xl border-b-4 border-slate-400 text-center'>Expenses</h1>
            
          <div id='containerBotones'>

            <form class="flex items-center">   
              <label for="simple-search" class="sr-only">Search</label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input className="border border-gray-700 rounded-md outline-none block w-full pl-10 p-2.5  " onChange={searcher} value={search} type="text" id="simple-search" placeholder="Search"/>
              </div>
            </form>
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
                            <th>Responsible</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>
                    {result.map( (dato, index) => ( 
                        <tr key={dato.item}>
                            <th><Button class="bg-slate-500 hover:bg-slate-600 transition-all w-3/5 border-2 font-semibold py-1 border-slate-600 text-slate-100 rounded-md details" onClick={() => showModalUpdate(dato)}>Details</Button></th>
                            <td>{index + 1}</td>
                            <td>{dato.name}</td>
                            <td>{dato.brand}</td>
                            <td>{dato.acquisition_date}</td>
                            <td>{dato.value}</td>
                            <td>{dato.supplier}</td>
                            <td>{dato.responsible}</td>
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
            <FormGroup className='font-bold mr-4'>
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
              {/* <input  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="statusD" type="text" onChange={handleChange} value={form.statusD}/> */}
              <select class="select outline-blue-500 w-full max-w-xs w-full border-2 p-1 border-slate-400 rounded-md" name="statusD" onChange={handleChange} value={form.statusD}>
                <option value="0">Discarded</option>
                <option value="1">Using</option>
              </select>
            </FormGroup>  

            <FormGroup>
              <label className='font-bold mr-4'>Responsible: </label>
              <input  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none'  name="responsible" type="text" onChange={handleChange} value={form.responsible}/>
            </FormGroup>

            <FormGroup>
              <label className='font-bold mr-4'>Observation: </label>
              <textarea  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none resize-none' name="observation" type="text" onChange={handleChange} value={form.observation}/>
            </FormGroup>          
          </ModalBody>

          <ModalFooter className='flex justify-evenly'>
            <Button className='text-2xl font-bold text-slate-300 py-1 bg-slate-500 hover:bg-slate-800' onClick={() => edit(form)}>Edit</Button>
            <Button className='text-2xl font-bold text-slate-300 py-1 bg-slate-600 hover:bg-slate-800' color="danger" onClick={() => closeModalUpdate()}>Cancel</Button>
          </ModalFooter>
        </Modal>

{/* add item Modal */}
        <Modal isOpen={modalInsert}>
          <ModalHeader className='text-center bg-slate-700'>
           <h3 className='font-bold text-center text-2xl py-2 text-slate-200'>Insert Item</h3>
          </ModalHeader>

          <ModalBody>
            
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
              <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="value" type="numbe" onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <label className='font-bold mr-4'>Supplier: </label>
              <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="supplier" type="text" onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <label className='font-bold mr-4'>Status: </label>
              {/* <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="statusD" type="text" onChange={handleChange} /> */}
              <select class="select outline-blue-500 w-full max-w-xs w-full border-2 p-1 border-slate-400 rounded-md" name="statusD" onChange={handleChange}>
                <option disabled selected>Select state</option>
                <option value="0">Discarded</option>
                <option value="1">Using</option>
              </select>
            </FormGroup> 

            <FormGroup>
              <label className='font-bold mr-4'>Responsible: </label>
              <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="responsible" type="text" onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <label className='font-bold mr-4'>Observation: </label>
              <textarea  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none resize-none' name="observation" type="text" onChange={handleChange}/>
            </FormGroup>
                       
          </ModalBody>

          <ModalFooter  className='flex justify-evenly'>
            <Button className='text-2xl font-bold text-slate-300 py-1 bg-slate-500 hover:bg-slate-800' onClick={() => insert()} > Insert </Button>
            <Button className='text-2xl font-bold text-slate-300 py-1 bg-slate-600 hover:bg-slate-800' color="danger" onClick={() => closeModalInsert()} > Cancel </Button>
          </ModalFooter>
        </Modal>


        </div>
    </>
    )
  } 

  export default Expenses;