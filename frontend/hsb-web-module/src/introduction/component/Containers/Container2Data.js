import './Container2Data.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter,} from "reactstrap";

//Datos
const data = [
    { item: 1, brand: "Vista2", name: "Data", acquisition_date: "Data", value: "Data", supplier: "Data",
    annual_de: "Data", montly_de: "Data", statusD: "Data", observation: "Data", insured: "Data"},
    { item: 2, brand: "Data", name: "Data", acquisition_date: "Data", value: "Data", supplier: "Data",
    annual_de: "Data", montly_de: "Data", statusD: "Data", observation: "Data", insured: "Data"},
    { item: 3, brand: "Data", name: "Data", acquisition_date: "Data", value: "Data", supplier: "Data",
    annual_de: "Data", montly_de: "Data", statusD: "Data", observation: "Data", insured: "Data"},
    { item: 4, brand: "Data", name: "Data", acquisition_date: "Data", value: "Data", supplier: "Data",
    annual_de: "Data", montly_de: "Data", statusD: "Data", observation: "Data", insured: "Data"}
];

class Container2Data extends React.Component {
    //list of characteristics
      state = {
      data: data,
      modalActualizar: false,
      modalInsertar: false,
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
      mostrarModalActualizar = (dato) => {
        this.setState({
          form: dato,
          modalActualizar: true,
        });
      };
    
      cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
      };
    
      //ADD
      mostrarModalInsertar = () => {
        this.setState({
          modalInsertar: true,
        });
      };
    
      cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
      };
    
      editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
          if (dato.item == registro.item) {
            arreglo[contador].brand = dato.brand;
            arreglo[contador].name = dato.name;
            arreglo[contador].acquisition_date = dato.acquisition_date;
            arreglo[contador].value = dato.value;
            arreglo[contador].supplier = dato.supplier;
            arreglo[contador].annual_de = dato.annual_de;
            arreglo[contador].montly_de = dato.montly_de;
            arreglo[contador].statusD = dato.statusD;
            arreglo[contador].observation = dato.observation;
            arreglo[contador].insured = dato.insured;
          }
          contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
      };
    
      insertar= ()=>{
        var valorNuevo= {...this.state.form};
        valorNuevo.id=this.state.data.length+1;
        var lista= this.state.data;
        lista.push(valorNuevo);
        this.setState({ modalInsertar: false, data: lista });
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
      
      return (
        <>
        <h1><font size="6">Inventary</font></h1>
        <Button color="success" id='add' onClick={()=>this.mostrarModalInsertar()}>Add</Button>
        
          <Container>
            <Table>
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
                    <th><Button color="primary" onClick={() => this.mostrarModalActualizar(dato)}>✎</Button></th>
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

{/* --------------------MODALS------------------- */}

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
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
              <label>annual_de: </label>
              <input className="form-control" name="annual_de" type="text" onChange={this.handleChange} value={this.state.form.annual_de}/>
            </FormGroup>

            <FormGroup>
              <label>montly_de: </label>
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
            <Button color="primary" onClick={() => this.editar(this.state.form)}>Editar</Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar articulo</h3></div>
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
              <label>annual_de: </label>
              <input className="form-control" name="annual_de" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>montly_de: </label>
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
            <Button color="primary" onClick={() => this.insertar()} > Insertar </Button>
            <Button className="btn btn-danger" onClick={() => this.cerrarModalInsertar()} > Cancelar </Button>
          </ModalFooter>
        </Modal>

        </>
      );
    }
  }
export default Container2Data;