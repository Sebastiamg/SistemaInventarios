import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './WindowExport.css'
import './Container1Data'

class WindowExport extends React.Component{
  state={
    open: false,
  }

  abrirModal=()=>{
    this.setState({open: !this.state.open});
  }

  render(){

    // const modalStyles={
    //   position: "absolute",
    //   top: '240px',
    //   left: '705px',
	  //   width: '90%',
    //   transform: 'translate(-50%, -50%)'
	  
    // }
    return(
      <>
      <div className="principal">
        <div className="secundario">
      <Button color="success" className='' id='export' onClick={this.abrirModal}>Export</Button>

      </div></div>

      <Modal isOpen={this.state.open}>
        <ModalHeader>
        Select data to export
        </ModalHeader>
        <ModalBody>
          <FormGroup className="group1">
            <Input type="checkbox"/> 
            <Label for="user">&nbsp;&nbsp;Item&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="user">&nbsp;&nbsp;Mark&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="user">&nbsp;&nbsp;Name&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="user">&nbsp;&nbsp;Acquisition date&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="user">&nbsp;&nbsp;Value&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="user">&nbsp;&nbsp;Supplier&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="user">&nbsp;&nbsp;Code&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="user">&nbsp;&nbsp;Model/Serial&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="user">&nbsp;&nbsp;Inches&nbsp;&nbsp;</Label><br/>
          </FormGroup>

          <FormGroup className="group2">
            <Input type="checkbox"/> 
            <Label for="user">&nbsp;&nbsp;Processor&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="user">&nbsp;&nbsp;Speed&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="user">&nbsp;&nbsp;Location&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="user">&nbsp;&nbsp;Responsable&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="user">&nbsp;&nbsp;State&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="user">&nbsp;&nbsp;Amount&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="user">&nbsp;&nbsp;Invoice number&nbsp;&nbsp;</Label><br/>
            <Input type="checkbox"/> 
            <Label for="user">&nbsp;&nbsp;Observation&nbsp;&nbsp;</Label><br/>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={this.abrirModal}>Export</Button>
          <Button color="secundary" onClick={this.abrirModal}>Close</Button>
        </ModalFooter>
      </Modal>
      </>
    )
  }
}
export default WindowExport;
