
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


export default class AddBannerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

          contacts : [
              {name:'',title:'',email:'',phone:''}
          ],
          banner : {
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
        this.setState(currentState => ({banner: {...currentState.banner, [event.target.name]: value}}));
	}
    
    handleUpload = (e) =>{
      this.setState(currentState => ({banner: {...currentState.banner, ['image']: e.target.files[0]}}));
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
        var formData = new FormData();
        formData.append('title', this.state.banner.title);
        formData.append('image', this.state.banner.image, this.state.banner.image.name);
              if(this.state.banner.id){
                  this.props.updateBanners(formData, event);
              } else{
                  this.props.saveBanners(formData, event);
              }
        
        } else {
        this.validator.showMessages();
        this.forceUpdate();
        }
  
    }
    fillForm(passedvalue) {
        this.setState({ task: passedvalue });

    }
    
    
    render() {


      return (
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} backdrop={'static'} keyboard={this.state.keyboard} size={'xl'}>
        <ModalHeader toggle={this.props.toggle}>Add Banner</ModalHeader>
        <ModalBody>
        <Form enctype="multipart/form-data">
          <Row>
            <Col xs="6" md="6" sm="12">
              <FormGroup>
                <Label for="exampleEmail">title</Label>
                <Input 
                  name="title" 
                  onChange={this.handleChange}
                  value={this.state.banner.title} />
                  {this.validator.message(' banners name in english', this.state.banner.title, 'required', { className: 'text-danger' })}
              </FormGroup>
            </Col>
            <Col xs="6"  md="6" sm="12">
              <FormGroup className="position-relative">
                <Label for="exampleEmail">Image</Label>
                <Input type="file" name="file" id="exampleFile" onChange={this.handleUpload}/>
                {this.validator.message('image', this.state.banner.image, 'required', { className: 'text-danger' })}
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