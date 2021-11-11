import React from "react";
import { Link, NavLink } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import {
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Spinner,
} from "reactstrap";
// import GeoCode from "./GeoCode"
import store from "../store";
import axios from "axios";
import Map from "./Map/Map";

export default class AddFranchiseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFinalPage: false,
      resp: 0,
      locations: [0, 1],
      translations: [],
      translation: {},
      docTitle: "",
      likeCounts: [],
      modalFlag: "",
      contacts: [{ name: "", title: "", email: "", phone: "" }],
      franchise: {
        type: "single",
      },
      options: [
        { value: "a", label: "John" },
        { value: "b", label: "Mike" },
        { value: "c", label: "steve" },
      ],
      formFlag: false,
    };
    this.validator = new SimpleReactValidator();
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState((currentState) => ({
      franchise: { ...currentState.franchise, [event.target.name]: value },
    }));
  };
  addRow = () => {
    let obj = { name: "", title: "", email: "", phone: "" };
    this.setState({ contacts: [...this.state.contacts, obj] });
  };
  removeRow = (ind) => {
    var contacts_new = this.state.contacts;
    var abc = contacts_new.splice(ind, 1);
    console.log(abc, ind, contacts_new);
    this.setState({ contacts: contacts_new });
  };
  handleCellChange = (event, position) => {
    var contacts_state = this.state.contacts;
    var contacts_parsed = JSON.parse(JSON.stringify(contacts_state));
    contacts_parsed[position][event.target.name] = event.target.value;
    this.setState({ contacts: contacts_parsed });
  };
  handleUpload = (e) => {
    this.setState((currentState) => ({
      franchise: { ...currentState.franchise, ["image"]: e.target.files[0] },
    }));
    const file = URL.createObjectURL(e.target.files[0]);
    // document.getElementById("preview-img").src = file;
  };

  handleDrop = (lat, lng) => {
    this.setState((state) => {
      state.franchise.lat = lat;
      state.franchise.lng = lng;
    });
    console.log("lng: " + lng + " lat: " + lat);
  };

  paginationHandler = () => {
    this.setState({
      isFinalPage: !this.state.isFinalPage,
    });
  };

  resetForm = () => {
    var obj = { type: "single" };
    this.setState({ leave: obj });
  };
  fillForm(passedvalue) {
    this.setState({ leave: passedvalue });
  }
  getLocations = () => {
    console.log(store.getState().user.requestHeader);
    axios
      .get(
        "http://localhost:5002/" + "api/v1/location",
        store.getState().user.requestHeader
      )
      .then((result) => {
        console.log("from api client", result.data);
        this.setState({ locations: result.data.data });
      })
      .catch((e) => {
        console.log("error");
      });
  };
  mySubmitHandler = async (event) => {
    event.preventDefault();

    if (this.validator.allValid()) {
      var formData = new FormData();
      formData.append("franchise_name", this.state.franchise.franchise_name);
      formData.append("address", this.state.franchise.address);
      formData.append("francise_rate", this.state.franchise.francise_rate);
      formData.append("del_range", this.state.franchise.del_range);
      formData.append("email", this.state.franchise.email);
      formData.append("location_id", 0);
      // formData.append("location_id", this.state.franchise.location_id);
      formData.append("password", this.state.franchise.password);
      formData.append("phone", this.state.franchise.phone);
      formData.append("lat", this.state.franchise.lat);
      formData.append("lng", this.state.franchise.lng);
      formData.append(
        "image",
        this.state.franchise.image,
        this.state.franchise.image.name
      );
      if (this.state.franchise.id) {
        this.props.updateFranchise(formData, event);
      } else {
        this.props.saveFranchise(formData, event);
      }
    } else {
      this.validator.showMessages();
      this.paginationHandler();
      this.forceUpdate();
    }
  };
  fillForm(passedvalue) {
    this.setState({ task: passedvalue });
  }
  componentDidMount() {
    // GeoCode();
    this.getLocations();
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modal}
        toggle={this.props.toggle}
        className={this.props.className}
        backdrop={"static"}
        keyboard={this.state.keyboard}
        size={"xl"}
      >
        <ModalHeader toggle={this.props.toggle}>Add franchise</ModalHeader>
        <ModalBody>
          <Form enctype="multipart/form-data">
            {!this.state.isFinalPage ? (
              <Row>
                <Col xs="6" md="6" sm="12">
                  <FormGroup>
                    <Label for="exampleEmail">franchise name </Label>
                    <Input
                      name="franchise_name"
                      onChange={this.handleChange}
                      value={this.state.franchise.franchise_name}
                    />
                    {this.validator.message(
                      " franchise name ",
                      this.state.franchise.franchise_name,
                      "required",
                      { className: "text-danger" }
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label for="exampleEmail">Franchise rate</Label>
                    <Input
                      name="francise_rate"
                      onChange={this.handleChange}
                      value={this.state.franchise.francise_rate}
                    />
                    {this.validator.message(
                      "francise_rate",
                      this.state.franchise.francise_rate,
                      "required|numeric",
                      { className: "text-danger" }
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label for="examplePassword">Phone number</Label>
                    <Input
                      name="phone"
                      onChange={this.handleChange}
                      value={this.state.franchise.phone}
                    />
                    {this.validator.message(
                      "phone",
                      this.state.franchise.phone,
                      "required",
                      { className: "text-danger" }
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                      name="password"
                      onChange={this.handleChange}
                      value={this.state.franchise.password}
                    />
                    {this.validator.message(
                      "password",
                      this.state.franchise.password,
                      "required",
                      { className: "text-danger" }
                    )}
                  </FormGroup>
                </Col>
                <Col xs="6" md="6" sm="12">
                  <FormGroup className="position-relative">
                    <Label for="exampleEmail">Email</Label>
                    <Input
                      name="email"
                      onChange={this.handleChange}
                      value={this.state.franchise.email}
                    />
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label for="exampleEmail">Location</Label>
                    <Input
                      type="select"
                      name="location_id"
                      onChange={this.handleChange}
                      value={this.state.franchise.location_id}
                    >
                      {this.state.locations.map((loc) => (
                        <option value={loc.id} key={loc.id}>
                          {loc.location}
                        </option>
                      ))}
                    </Input>
                    {/* {this.validator.message(
                      "location_id",
                      this.state.franchise.location_id,
                      "required|numeric",
                      { className: "text-danger" }
                    )} */}
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label for="exampleEmail">Delivery Range</Label>
                    <Input
                      name="del_range"
                      onChange={this.handleChange}
                      value={this.state.franchise.del_range}
                    />
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label for="exampleEmail">Address</Label>
                    <Input
                      type="textarea"
                      id="exampleText"
                      name="address"
                      onChange={this.handleChange}
                      value={this.state.franchise.address}
                    />
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label for="exampleEmail">Image</Label>
                    <Input
                      type="file"
                      name="file"
                      id="exampleFile"
                      onChange={this.handleUpload}
                    />
                    {this.validator.message(
                      "image",
                      this.state.franchise.image,
                      "required",
                      { className: "text-danger" }
                    )}
                  </FormGroup>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col sm="12">
                  <Map changable={true} handleDrop={this.handleDrop} />
                </Col>
              </Row>
            )}
          </Form>
        </ModalBody>
        <ModalFooter>
          {!this.state.isFinalPage ? (
            <Button color="warning" onClick={this.paginationHandler}>
              Next
            </Button>
          ) : (
            <>
              <Button color="warning" onClick={this.paginationHandler}>
                Back
              </Button>
              <Button color="warning" onClick={this.mySubmitHandler}>
                Save
              </Button>
              {""}
              <Button color="secondary" onClick={this.props.toggle}>
                Cancel
              </Button>
            </>
          )}
        </ModalFooter>
        {this.props.formFlag ? (
          <div className="bg-widget d-flex justify-content-center">
            <Spinner type="grow" color="dark" />
            <Spinner type="grow" color="warning" />
            <Spinner type="grow" color="dark" />
          </div>
        ) : (
          ""
        )}
      </Modal>
    );
  }
}
