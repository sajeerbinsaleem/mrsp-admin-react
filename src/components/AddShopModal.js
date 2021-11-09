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

import Map from "./Map/Map";

const DUMMY_LOCATIONS = [
  {
    id: 1,
    place: "MANANTHAVADY",
  },
  {
    id: 2,
    place: "BATHERY",
  },
  {
    id: 3,
    place: "KALPETTA",
  },
  {
    id: 4,
    place: "PULPALLY",
  },
  {
    id: 5,
    place: "PANAMARAM",
  },
];

export default class AddShopModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFinalPage: false,
      page: 1,
      resp: 0,
      artworks: [],
      translations: [],
      translation: {},
      docTitle: "",
      likeCounts: [],
      modalFlag: "",
      contacts: [{ name: "", title: "", email: "", phone: "" }],
      shop: {
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
      shop: { ...currentState.shop, [event.target.name]: value },
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
      shop: { ...currentState.shop, ["image"]: e.target.files[0] },
    }));
    const file = URL.createObjectURL(e.target.files[0]);
    // document.getElementById("preview-img").src = file;
  };

  handleDrop = (lat, lng) => {
    this.setState((state) => {
      state.shop.lat = lat;
      state.shop.lng = lng;
    });
  };

  resetForm = () => {
    var obj = { type: "single" };
    this.setState({ leave: obj });
  };
  fillForm(passedvalue) {
    this.setState({ leave: passedvalue });
  }
  mySubmitHandler = async (event) => {
    event.preventDefault();

    if (this.validator.allValid()) {
      var formData = new FormData();
      formData.append("store_name_en", this.state.shop.shop_name_en);
      formData.append("store_name_ml", this.state.shop.shop_name_ml);
      formData.append("address", this.state.shop.address);
      formData.append("admin_share", this.state.shop.admin_share);
      formData.append("del_range", this.state.shop.del_range);
      formData.append("email", this.state.shop.email);
      formData.append("employee_name", this.state.shop.employee_name);
      formData.append("password", this.state.shop.password);
      formData.append("phone", this.state.shop.phone);
      formData.append("store_no", this.state.shop.store_no);
      formData.append("lat", this.state.shop.lat);
      formData.append("lng", this.state.shop.lng);
      formData.append("city", this.state.shop.city);
      formData.append(
        "image",
        this.state.shop.image,
        this.state.shop.image.name
      );
      if (this.state.shop.id) {
        this.props.updateShop(formData, event);
      } else {
        this.props.saveShop(formData, event);
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  fillForm(passedvalue) {
    this.setState({ task: passedvalue });
  }

  paginationHandler = () => {
    this.setState({
      isFinalPage: !this.state.isFinalPage,
    });
  };

  componentDidMount() {
    // GeoCode();
    var vm = this;
    navigator.geolocation.getCurrentPosition(function (position) {
      vm.setState((currentState) => ({
        shop: { ...currentState.shop, ["lat"]: position.coords.latitude },
      }));
      vm.setState((currentState) => ({
        shop: { ...currentState.shop, ["lng"]: position.coords.longitude },
      }));
      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
    });
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
        <ModalHeader toggle={this.props.toggle}>Add shop</ModalHeader>

        <ModalBody>
          <Form enctype="multipart/form-data">
            {!this.state.isFinalPage ? (
              <div>
                <Row>
                  <Col xs="6" md="6" sm="12">
                    <FormGroup>
                      <Label for="exampleEmail">Shop name (English)</Label>
                      <Input
                        name="shop_name_en"
                        onChange={this.handleChange}
                        value={this.state.shop.shop_name_en}
                      />
                      {this.validator.message(
                        " shop name in english",
                        this.state.shop.shop_name_en,
                        "required",
                        { className: "text-danger" }
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label for="exampleEmail">Shop name (മലയാളം)</Label>
                      <Input
                        name="shop_name_ml"
                        onChange={this.handleChange}
                        value={this.state.shop.shop_name_ml}
                      />
                      {this.validator.message(
                        " മലയാളം ",
                        this.state.shop.shop_name_ml,
                        "required",
                        { className: "text-danger" }
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Employeename</Label>
                      <Input
                        name="employee_name"
                        onChange={this.handleChange}
                        value={this.state.shop.employee_name}
                      />
                      {this.validator.message(
                        "employee_name",
                        this.state.shop.employee_name,
                        "required",
                        { className: "text-danger" }
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Store no / GST no</Label>
                      <Input
                        name="store_no"
                        onChange={this.handleChange}
                        value={this.state.shop.store_no}
                      />
                      {this.validator.message(
                        "Liscence No",
                        this.state.shop.store_no,
                        "required",
                        { className: "text-danger" }
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label for="examplePassword">Phone number</Label>
                      <Input
                        name="phone"
                        onChange={this.handleChange}
                        value={this.state.shop.phone}
                      />
                      {this.validator.message(
                        "phone",
                        this.state.shop.phone,
                        "required",
                        { className: "text-danger" }
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.shop.password}
                      />
                      {this.validator.message(
                        "password",
                        this.state.shop.password,
                        "required",
                        { className: "text-danger" }
                      )}
                    </FormGroup>

                    <FormGroup className="position-relative">
                      <Label for="location">Location</Label>
                      <Input
                        type="select"
                        name="city"
                        id="exampleLocation"
                        onChange={this.handleChange}
                      >
                        {DUMMY_LOCATIONS.map((place) => (
                          <option value={place.id}>{place.place}</option>
                        ))}
                      </Input>
                      {this.validator.message(
                        "location",
                        this.state.shop.city,
                        "required",
                        { className: "text-danger" }
                      )}
                    </FormGroup>
                  </Col>
                  <Col xs="6" md="6" sm="12">
                    <FormGroup>
                      <Label for="exampleEmail">Admin share</Label>
                      <Input
                        name="admin_share"
                        onChange={this.handleChange}
                        value={this.state.shop.admin_share}
                      />
                    </FormGroup>
                    <FormGroup className="position-relative">
                      <Label for="exampleEmail">Email</Label>
                      <Input
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.shop.email}
                      />
                    </FormGroup>
                    <FormGroup className="position-relative">
                      <Label for="exampleEmail">place</Label>
                      <Input
                        name="city"
                        onChange={this.handleChange}
                        value={this.state.shop.city}
                      />
                    </FormGroup>
                    <FormGroup className="position-relative">
                      <Label for="exampleEmail">Delivery Range</Label>
                      <Input
                        name="del_range"
                        onChange={this.handleChange}
                        value={this.state.shop.del_range}
                      />
                    </FormGroup>
                    <FormGroup className="position-relative">
                      <Label for="exampleEmail">Address</Label>
                      <Input
                        type="textarea"
                        id="exampleText"
                        name="address"
                        onChange={this.handleChange}
                        value={this.state.shop.address}
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
                        this.state.shop.image,
                        "required",
                        { className: "text-danger" }
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              </div>
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
