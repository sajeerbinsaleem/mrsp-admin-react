
import React from "react";
import { Link, NavLink } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import {
    Col,
    Row,
    Button,
     Modal, ModalHeader, ModalBody, ModalFooter,
     Form, FormGroup, Label, Input, FormFeedback,
     Spinner
  } from "reactstrap";
// import GeoCode from "./GeoCode"


export default class AddLocationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          resp: 0,
          artworks : [],
          translations : [],
          translation : {},
          docTitle : '',
          likeCounts :[],
          modalFlag : '',
          contacts : [
              {name:'',title:'',email:'',phone:''}
          ],
          location : {
            type : "single",
          },
           options : [
            { value: 'a', label: 'John' },
            { value: 'b', label: 'Mike' },
            { value: 'c', label: 'steve' }, 
          ],
          formFlag : false,
          
        };
		  this.validator = new SimpleReactValidator();



    }
    
    handleChange = (event) => {
		const value = event.target.value;
        this.setState(currentState => ({location: {...currentState.location, [event.target.name]: value}}));
	}
    addRow = () => {
        let obj = {name:'',title:'',email:'',phone:''};
        this.setState({ contacts: [...this.state.contacts, obj ] });
    }
     removeRow = (ind) => {
        var contacts_new = this.state.contacts;
        var abc = contacts_new.splice(ind, 1);
        console.log(abc,ind,contacts_new)
        this.setState({ contacts: contacts_new });
    }
    handleCellChange = (event, position) =>{
        var contacts_state = this.state.contacts;
        var contacts_parsed =  JSON.parse(JSON.stringify(contacts_state)) 
        contacts_parsed[position][event.target.name] = event.target.value;
        this.setState({ contacts: contacts_parsed });

    }
    handleUpload = (e) =>{
      this.setState(currentState => ({location: {...currentState.location, ['image']: e.target.files[0]}}));
      const file = URL.createObjectURL(e.target.files[0])
      // document.getElementById("preview-img").src = file;
    }
    resetForm = () =>{
      var obj = {type : "single",};
      this.setState({ leave:  obj});
    }
    fillForm(passedvalue) {
      this.setState({ leave: passedvalue });
    }
    mySubmitHandler = async (event) => {
      event.preventDefault();
  
      if (this.validator.allValid()) {
              if(this.state.location.id){
                  this.props.updateLocation(this.state.location, event);
              } else{
                  this.props.saveLocation(this.state.location, event);
              }
        
        } else {
        this.validator.showMessages();
        this.forceUpdate();
        }
  
    }
    fillForm(passedvalue) {
        this.setState({ task: passedvalue });

    }
    componentDidMount(){
      // GeoCode();
      var vm = this;
      navigator.geolocation.getCurrentPosition(function(position) {
        vm.setState(currentState => ({location: {...currentState.location, ['lat']: position.coords.latitude}}));
        vm.setState(currentState => ({location: {...currentState.location, ['lng']: position.coords.longitude}}));
        // console.log("Latitude is :", position.coords.latitude);
        // console.log("Longitude is :", position.coords.longitude);
      });
    }
    
    render() {


      return (
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} backdrop={'static'} keyboard={this.state.keyboard} size={'md'}>
        <ModalHeader toggle={this.props.toggle}>Add location</ModalHeader>
        <ModalBody>
        <Form enctype="multipart/form-data">
          <Row>
            <Col xs="12" md="12" sm="12">
              <FormGroup>
                <Label for="exampleEmail">location </Label>
                <Input 
                  name="location" 
                  onChange={this.handleChange}
                  value={this.state.location.location} />
                  {this.validator.message(' location name ', this.state.location.location, 'required', { className: 'text-danger' })}
              </FormGroup>
              
              <FormGroup>
                <Label for="exampleEmail">District</Label>
                <Input 
                  name="district" 
                  onChange={this.handleChange}
                  value={this.state.location.district} />
                  {this.validator.message('district', this.state.location.district, 'required', { className: 'text-danger' })}
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">State</Label>
                <Input 
                  name="state" 
                  onChange={this.handleChange}
                  value={this.state.location.state}/>
                  {this.validator.message('State', this.state.location.state, 'required', { className: 'text-danger' })}
              </FormGroup>
            </Col>
          </Row>
    </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={this.mySubmitHandler}>Save</Button>{' '}
          <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
        {this.props.formFlag? <div className="bg-widget d-flex justify-content-center">
                      <Spinner type="grow" color="dark" />
                      <Spinner type="grow" color="warning" />
                      <Spinner type="grow" color="dark" />
                  </div>:''}
      </Modal>
      );
    }
}