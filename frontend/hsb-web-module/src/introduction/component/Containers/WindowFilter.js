import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './WindowExport.css'

class WindowFilter extends React.Component{
  state={
    abierto: false,
  }

  abrirModal=()=>{
    this.setState({abierto: !this.state.abierto});
  }

  render(){

    const modalStyles={
      position: "absolute",
      top: '240px',
      left: '705px',
	  width: '90%',
      transform: 'translate(-50%, -50%)'
	  
    }
    return(
      <>
      <div className="principal">
        <div className="secundario">
      <Button color="success" id='export' onClick={this.abrirModal}>Filter</Button>

      </div></div>  

      <Modal isOpen={this.state.abierto}>
        <ModalHeader>
        Select data to filter
        </ModalHeader>
        <ModalBody>
          <FormGroup className="group1">
            <Input type="checkbox"/> 
            <Label for="usuario">&nbsp;&nbsp;Item&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="usuario">&nbsp;&nbsp;Mark&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="usuario">&nbsp;&nbsp;Name&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="usuario">&nbsp;&nbsp;Acquisition date&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="usuario">&nbsp;&nbsp;Value&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="usuario">&nbsp;&nbsp;Supplier&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="usuario">&nbsp;&nbsp;Code&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="usuario">&nbsp;&nbsp;Model/Serial&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="usuario">&nbsp;&nbsp;Inches&nbsp;&nbsp;</Label><br/>
          </FormGroup>

          <FormGroup className="group2">
            <Input type="checkbox"/> 
            <Label for="usuario">&nbsp;&nbsp;Processor&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="usuario">&nbsp;&nbsp;Speed&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="usuario">&nbsp;&nbsp;Location&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="usuario">&nbsp;&nbsp;Responsable&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="usuario">&nbsp;&nbsp;State&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="usuario">&nbsp;&nbsp;Amount&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="usuario">&nbsp;&nbsp;Invoice number&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="usuario">&nbsp;&nbsp;Observation&nbsp;&nbsp;</Label><br/>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={this.abrirModal}>Filter</Button>
          <Button color="secundary" onClick={this.abrirModal}>Close</Button>
        </ModalFooter>


      </Modal>
      </>
    )
  }
}

export default WindowFilter;
