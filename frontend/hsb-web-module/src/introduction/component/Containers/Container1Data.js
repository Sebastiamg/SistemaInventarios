import './Container1Data.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter,} from "reactstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ContainerDepre from './ContainerDepre'
import WindowExport from './WindowExport';
import WindowFilter from './WindowFilter';
import NavBar from '../navBar/navBar';

//Data
const data = [
    { item: 1, brand: "Data", name: "Data", acquisition_date: "Data", value: "Data", supplier: "Data",
    annual_de: "Data", montly_de: "Data", statusD: "Data", observation: "Data", insured: "Data"},
    { item: 2, brand: "Data", name: "Data", acquisition_date: "Data", value: "Data", supplier: "Data",
    annual_de: "Data", montly_de: "Data", statusD: "Data", observation: "Data", insured: "Data"},
    { item: 3, brand: "Data", name: "Data", acquisition_date: "Data", value: "Data", supplier: "Data",
    annual_de: "Data", montly_de: "Data", statusD: "Data", observation: "Data", insured: "Data"},
    { item: 4, brand: "Data", name: "Data", acquisition_date: "Data", value: "Data", supplier: "Data",
    annual_de: "Data", montly_de: "Data", statusD: "Data", observation: "Data", insured: "Data"}
];

class Container1Data extends React.Component {

    //list of characteristics
      state = {
      data: data,
      modalUpdate: false,
      modalInsert: false,
      form: {
        item: "",
        brand: "",
        name: "",
        acquisition_date: "",
        value: "",
        supplier: "",
        annual_de: "",
        montly_de: "",
        statusD: "",
        observation: "",
        insured: ""
      },
    };


      //Methods and actions
      //UPDATE
      showModalUpdate = (dato) => {
        this.setState({
          form: dato,
          modalUpdate: true,
        });
      };
    
      closeModalUpdate = () => {
        this.setState({ modalUpdate: false });
      };
    
      //ADD
      showModalInsert = () => {
        this.setState({
          modalInsert: true,
        });
      };
    
      closeModalInsert = () => {
        this.setState({ modalInsert: false });
      };
    
      edit = (dato) => {
        var counter = 0;
        var array = this.state.data;
        array.map(registration => {
          if (dato.item === registration.item) {
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
          }
          counter++;
        });
        this.setState({ data: array, modalUpdate: false });
      };
    
      insert= ()=>{
        var newValue= {...this.state.form};
        newValue.id=this.state.data.length+1;
        var list= this.state.data;
        list.push(newValue);
        this.setState({ modalInsert: false, data: list });
      }
    
      handleChange = (e) => {
        this.setState({
          form: {
            ...this.state.form,
            [e.target.name]: e.target.value,
          },
        });
      };
  
    render() {
      return (<>
        <NavBar/>       {/* NavBar 2*/}
        <div id='main-container1'>
        <h1><font size="6">Inventary</font></h1>

        <div id='containerBotones'>
          <Button color="success" id='add' onClick={()=>this.showModalInsert()}>Add</Button>
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
                {this.state.data.map((dato) => (
                  <tr key={dato.item}>
                    <th><Button color="primary" onClick={() => this.showModalUpdate(dato)}>🖍</Button></th>
                    <td>{dato.item}</td>
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
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>

          <ContainerDepre/> {/*Container depreciation*/}

{/* --------------------MODALS------------------- */}

        <Modal isOpen={this.state.modalUpdate}>
          <ModalHeader>
           <div><h3>Edit Registration</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label> Item: </label>
              <input className="form-control" readOnly type="text" value={this.state.form.item} />
            </FormGroup>
            
            <FormGroup>
              <label>Brand: </label>
              <input className="form-control" name="brand" type="text" onChange={this.handleChange} value={this.state.form.brand}/>
            </FormGroup>
            
            <FormGroup>
              <label>Acquisition date: </label>
              <input className="form-control" name="acquisition_date" type="text" onChange={this.handleChange} value={this.state.form.acquisition_date}/>
            </FormGroup>

            <FormGroup>
              <label>Value: </label>
              <input className="form-control" name="value" type="text" onChange={this.handleChange} value={this.state.form.value}/>
            </FormGroup>

            <FormGroup>
              <label>Supplier: </label>
              <input className="form-control" name="supplier" type="text" onChange={this.handleChange} value={this.state.form.supplier}/>
            </FormGroup>

            <FormGroup>
              <label>Annual_de: </label>
              <input className="form-control" name="annual_de" type="text" onChange={this.handleChange} value={this.state.form.annual_de}/>
            </FormGroup>

            <FormGroup>
              <label>Montly_de: </label>
              <input className="form-control" name="montly_de" type="text" onChange={this.handleChange} value={this.state.form.montly_de}/>
            </FormGroup>

            <FormGroup>
              <label>Status: </label>
              <input className="form-control" name="statusD" type="text" onChange={this.handleChange} value={this.state.form.statusD}/>
            </FormGroup>

            <FormGroup>
              <label>Observation: </label>
              <input className="form-control" name="observation" type="text" onChange={this.handleChange} value={this.state.form.observation}/>
            </FormGroup>

            <FormGroup>
              <label>Insured: </label>
              <input className="form-control" name="insured" type="text" onChange={this.handleChange} value={this.state.form.insured}/>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.edit(this.state.form)}>Edit</Button>
            <Button color="danger" onClick={() => this.closeModalUpdate()}>Cancel</Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsert}>
          <ModalHeader>
           <div><h3>Insert Item</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label> Item: </label>
              <input className="form-control" readOnly type="text" value={this.state.data.length+1}/>
            </FormGroup>
            
            <FormGroup>
              <label>Brand: </label>
              <input className="form-control" name="brand" type="text" onChange={this.handleChange}/>
            </FormGroup>

            <FormGroup>
              <label>Name: </label>
              <input className="form-control" name="name" type="text" onChange={this.handleChange}/>
            </FormGroup>
            
            <FormGroup>
              <label>Acquisition date: </label>
              <input className="form-control" name="acquisition_date" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Value: </label>
              <input className="form-control" name="value" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Supplier: </label>
              <input className="form-control" name="supplier" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Annual_de: </label>
              <input className="form-control" name="annual_de" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Montly_de: </label>
              <input className="form-control" name="montly_de" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Status: </label>
              <input className="form-control" name="statusD" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Observation: </label>
              <input className="form-control" name="observation" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Insured: </label>
              <input className="form-control" name="insured" type="text" onChange={this.handleChange} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insert()} > Insert </Button>
            <Button className="btn btn-danger" onClick={() => this.closeModalInsert()} > Cancel </Button>
          </ModalFooter>
        </Modal>

        </div>
        </>
      );
    }
  }
  export default Container1Data;
  