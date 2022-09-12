import './Container1Data.css';
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter} from "reactstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ContainerDepre from './ContainerDepre'
import WindowExport from './WindowExport';
import WindowFilter from './WindowFilter';
import NavBar from '../navBar/navBar';
import Api from "../../../services"

const Container1Data = () => {
  // Array Items
  let dataItems = []; 
  // Data Hooks
  const [data, setData] = useState(dataItems)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [modalInsert, setModalInsert] = useState(false)
  const [form, setForm] = useState({item: "" ,brand: "" ,name: "" ,acquisition_date: "" ,statusD: "" ,value: "" ,supplier: "" ,annual_de: "" ,montly_de: "" ,observation: "" ,insured: ""})

  const getData = async () => {
    const items = await Api.fun2();
    if(typeof(items) == "undefined"){
      // console.log("sin datos disponibles")
      return null;
    } else {
        const url = window.location.href;
        const electronicEquipment = "/fixedAssets/electronicEquipment/";
        const furniture = "/fixedAssets/furnitures/"

        const allItems = items.map( elm => {
          const details = JSON.parse(elm["assetDetails"].replace(/&quot;/g, '"'));
          const item =  {
                item: Number(parseInt(elm.id)),
                name: elm.assetName,
                acquisition_date: elm.assetPurchaseDate,
                statusD: elm.assetActive,
                // details
                brand: details.brand,
                value: details.value,
                supplier: details.supplier,
                annual_de: details.annual_de,
                montly_de: details.montly_de,
                observation: details.observation,
                insured: details.insured,
                itemType: details.itemType
              }
              // console.log(item)
              // dataItems.push(item)
              return item;
        })
        if (url.includes(electronicEquipment)) {
          const electronicItems = allItems.filter(x => x.itemType === "electronicEquipment");
          electronicItems.forEach( x => dataItems.push(x))
        } else if(url.includes(furniture)) {
          const furnitureItems = allItems.filter(x => x.itemType === "furniture");
          furnitureItems.forEach( x => dataItems.push(x))
        };
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
        if (dato.item === items.item) {
          array[counter].brand = dato.brand;
          array[counter].name = dato.name;
          array[counter].acquisition_date = dato.acquisition_date;
          array[counter].value = dato.value;
          array[counter].supplier = dato.supplier;
          array[counter].annual_de = dato.annual_de;
          array[counter].montly_de = dato.montly_de;
          array[counter].statusD = dato.statusD;
          array[counter].observation = dato.observation;
          array[counter].insured = dato.insured; 

          // url.includes("/fixedAssets/electronicEquipment/") ? 
          // array[counter]["itemType"] = "electronicEquipment" : 
          // url.includes("/fixedAssets/furnitures/") ? 
          // array[counter]["itemType"] = "furniture" : console.log(null) 
        // console.log(array[counter])
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

    // Insert
      const insert = () => {
        let newValue = form
        // id        
        // data.length <= 0 ? 
        // newValue.item = data.length + 1: 
        // newValue.item = parseInt(data.pop().item) + 1;
        newValue.item = parseInt(newValue.item + newValue.brand.length + newValue.value.length + Math.floor(Math.random()*1000));
        
        url.includes("/fixedAssets/electronicEquipment/") ? 
        newValue["itemType"] = "electronicEquipment" : 
        url.includes("/fixedAssets/furnitures/") ? 
        newValue["itemType"] = "furniture" : console.log("caca")

        console.log(newValue);

        Api.apiCreate(newValue);
        setData([...dataItems, newValue]);
        setModalInsert(false)
      }
      // validacion
      console.log(url.includes("/fixedAssets/electronicEquipment/"))  

    // handleChange
      const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
      };


    return(<>
        <NavBar/>       {/* NavBar 2*/}
        <div id='main-container1'>
        <h1><font size="6">Inventary</font></h1>

        <div id='containerBotones'>
          <Button color="success" id='add' onClick={() => showModalInsert()}>Add</Button>
          <WindowExport />
          <WindowFilter />
        </div>
        <div className="table-responsive">
        
        </div>
          <Container id='tableDad' className='table-responsive'>
            <Table id='table' className='table table-hover table-sm'> {/*Bootstrap*/}
              <thead>
                <tr>
                <th></th>
                <th>Item</th><th>Brand</th><th>Name</th><th>Acquisition Date</th><th>Value</th><th>Supplier</th>
                <th>Annual Depreciation</th><th>Montly Depreciation</th><th>Status</th><th>Observation</th><th>Insured</th>
                </tr>
              </thead>
              <tbody>
                {data.map( (dato, index) => ( 
                  <tr key={dato.item}>
                    <th><Button color="primary" onClick={() => showModalUpdate(dato)}>🖊</Button></th>
                    <td>{index + 1}</td>
                    <td>{dato.brand}</td>
                    <td>{dato.name}</td>
                    <td>{dato.acquisition_date}</td>
                    <td>{dato.value}</td>
                    <td>{dato.supplier}</td>
                    <td>{dato.annual_de}</td>
                    <td>{dato.montly_de}</td>
                    <td>{dato.statusD}</td>
                    <td>{dato.observation}</td>
                    <td>{dato.insured}</td>
                  </tr>)
                  )}
              </tbody>
            </Table>
          </Container>

          <ContainerDepre/> {/*Container depreciation*/}

{/* --------------------MODALS------------------- */}
{/* edit modal */}
        <Modal isOpen={modalUpdate}>
          <ModalHeader>
           <div><h3>Edit Registration</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label> Item: </label>
              <input className="form-control" readOnly type="text" value={form.item} />
            </FormGroup>

            <FormGroup>
              <label>Brand: </label>
              <input className="form-control" name="brand" type="text" onChange={handleChange} value={form.brand}/>
            </FormGroup>

            <FormGroup>
              <label> Name: </label>
              <input className="form-control" name="name" type="text" onChange={handleChange} value={form.name} />
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
              <label>Annual_de: </label>
              <input className="form-control" name="annual_de" type="text" onChange={handleChange} value={form.annual_de}/>
            </FormGroup>

            <FormGroup>
              <label>Montly_de: </label>
              <input className="form-control" name="montly_de" type="text" onChange={handleChange} value={form.montly_de}/>
            </FormGroup>

            <FormGroup>
              <label>Status: </label>
              <input className="form-control" name="statusD" type="text" onChange={handleChange} value={form.statusD}/>
            </FormGroup>

            <FormGroup>
              <label>Observation: </label>
              <input className="form-control" name="observation" type="text" onChange={handleChange} value={form.observation}/>
            </FormGroup>

            <FormGroup>
              <label>Insured: </label>
              <input className="form-control" name="insured" type="text" onChange={handleChange} value={form.insured}/>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => edit(form)}>Edit</Button>
            <Button color="danger" onClick={() => closeModalUpdate()}>Cancel</Button>
          </ModalFooter>
        </Modal>

{/* add item Modal */}
        <Modal isOpen={modalInsert}>
          <ModalHeader>
           <div><h3>Insert Item</h3></div>
          </ModalHeader>

          <ModalBody>
            {/* <FormGroup> */}
              {/* <label> Item: </label> */}
              {/* <input className="form-control" readOnly type="text" value={state.data.length+1}/> ---------- */}
            {/* </FormGroup> */}
            
            <FormGroup>
              <label>Brand: </label>
              <input className="form-control" name="brand" type="text" onChange={handleChange}/>
            </FormGroup>

            <FormGroup>
              <label>Name: </label>
              <input className="form-control" name="name" type="text" onChange={handleChange}/>
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
              <label>Annual_de: </label>
              <input className="form-control" name="annual_de" type="text" onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Montly_de: </label>
              <input className="form-control" name="montly_de" type="text" onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Status: </label>
              <input className="form-control" name="statusD" type="text" onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Observation: </label>
              <input className="form-control" name="observation" type="text" onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Insured: </label>
              <input className="form-control" name="insured" type="text" onChange={handleChange} />
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

  export default Container1Data;