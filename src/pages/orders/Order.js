import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Col,
  Row,
  Progress,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Table,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Widget from "../../components/Widget/Widget.js";
import ApexActivityChart from "./components/ActivityChart.js";
import env from "react-dotenv";
import axios from "axios";
import Notification from "../../components/Notification/Notification.js";

import meal1 from "../../assets/dashboard/meal-1.svg";
import meal2 from "../../assets/dashboard/meal-2.svg";
import meal3 from "../../assets/dashboard/meal-3.svg";
import upgradeImage from "../../assets/dashboard/upgradeImage.svg";
import heartRed from "../../assets/dashboard/heartRed.svg";
import heartTeal from "../../assets/dashboard/heartTeal.svg";
import heartViolet from "../../assets/dashboard/heartViolet.svg";
import heartYellow from "../../assets/dashboard/heartYellow.svg";
import gymIcon from "../../assets/dashboard/gymIcon.svg";
import therapyIcon from "../../assets/dashboard/therapyIcon.svg";
import user from "../../assets/user.svg";
import statsPie from "../../assets/dashboard/statsPie.svg";
import moreIcon from "../../assets/tables/moreIcon.svg";
import * as Icons from "@material-ui/icons";
import ellieSmithImg from "../../assets/tables/ellieSmithImg.png";
import floydMilesImg from "../../assets/tables/floydMilesImg.png";
import rosaFloresImg from "../../assets/tables/rosaFloresImg.png";
import janeCooperImg from "../../assets/tables/janeCooper.png";
import bagIcon from "../../assets/tables/bagIcon.svg";
import folderIcon from "../../assets/tables/folderIcon.svg";
import joystickIcon from "../../assets/tables/joystickIcon.svg";
import basketIcon from "../../assets/tables/basketIcon.svg";
import store from "../../store/index.js";
import AddShopModal from "../../components/AddShopModal";

import Model from "../Store/components/Modal";

// import s from "./Dashboard.module.scss";
import s from "./Tables.module.scss";
var app_mode = env.MODE ? env.MODE: 'development'
var default_url = app_mode == 'production'? "https://api.mistershoppie.com/" : "https://api.keralashoppie.com/";
console.log('env.MODE',env.MODE, default_url)

const api_url =env.API_URL?env.API_URL: default_url;

// env.API_URL? env.API_URL : 'http://localhost:8000/api/v1/'
const options = {
  autoClose: 4000,
  closeButton: false,
  hideProgressBar: true,
  position: toast.POSITION.TOP_RIGHT,
};

class Order extends React.Component {
  constructor(props) {
    super(props);

    this.toggleOne = this.toggleOne.bind(this);
    this.toggleTwo = this.toggleTwo.bind(this);
    this.toggleThree = this.toggleThree.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
    this.onUpdateSubmit = this.onUpdateSubmit.bind(this);

    this.state = {
      dropdownOpenOne: false,
      dropdownOpenTwo: false,
      dropdownOpenThree: false,
      tableDropdownOpen: false,
      checkboxes: [false, true],
      secondTableCurrentPage: 1,
      orders: [],
      secondTable: [],
      formFlag: false,
      modal: false,
      backdrop: true,
      keyboard: true,
      show: false,
      language: store.getState().user.language,
      current_page: 1,
      editShow: false,
      status: null,
      id: null,
    };
    store.subscribe(this.handleStoreUpdate);
  }
  handleStoreUpdate = () => {
    this.setState({ language: store.getState().user.language });
  };
  meals = [meal1, meal2, meal3];

  toggleOne() {
    this.setState({
      dropdownOpenOne: !this.state.dropdownOpenOne,
    });
  }
  tableMenuOpen = () => {
    this.setState({
      tableDropdownOpen: !this.state.tableDropdownOpen,
    });
  };

  toggleTwo() {
    this.setState({
      dropdownOpenTwo: !this.state.dropdownOpenTwo,
    });
  }

  toggleThree() {
    this.setState({
      dropdownOpenThree: !this.state.dropdownOpenThree,
    });
  }

  changeCheck(event, checkbox, id) {
    this.state[checkbox][id] = event.target.checked;

    if (!event.target.checked) {
      this.state[checkbox][id] = false;
    }
    this.setState({
      [checkbox]: this.state[checkbox],
    });
  }
  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleEditShow = () => {
    this.setState({ editShow: !this.state.editShow });
  };

  getStores = (page) => {
    axios
      .get(
        api_url +
          "api/v1/dashboard-orders?franchise_id=1&limit=10&page=" +
          page,
        store.getState().user.requestHeader
      )
      .then((result) => {
        console.log("from api client", result.data);
        this.setState({ orders: result.data.data });
      })
      .catch((e) => {
        console.log("error");
      });
  };
  storeName = (name) => {
    try {
      return name[this.state.language];
    } catch (error) {
      console.log(name, error);
      return name;
    }
  };
  saveShop = (e) => {
    this.setState({ formFlag: true });
    console.log(e);
    axios
      .post(api_url + "api/v1/vendor/store", e)
      .then((result) => {
        this.setState({ formFlag: false });
        toast(
          <Notification type={"success"} message="successfully saved" />,
          options
        );
        console.log("from api client", result.data);
      })
      .catch((e) => {
        toast(<Notification type={"error"} message="error saved" />, options);
        console.log("error", e);
      });
  };
  paginate = (e, type) => {
    e.preventDefault();
    var page = this.state.current_page;

    if (type == "minus") {
      page = page == 1 ? 1 : page - 1;
    } else {
      page = page + 1;
    }
    this.setState({ current_page: page });
    this.getStores(page);
  };
  componentDidMount() {
    this.getStores(1);
  }

  updateHandler(id) {
    this.setState({
      status: this.state.orders.find((order) => order.order_id === id).status,
    });
    this.setState({ id });
    this.handleEditShow();
  }

  onStatusChange(event) {
    event.preventDefault();
    this.setState({ status: event.target.value });
  }

  async onUpdateSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.put(
        api_url + `api/v1/dashboard-orders/${this.state.id}`,
        { status: this.state.status },
        store.getState().user.requestHeader
      );
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <Model
          show={this.state.editShow}
          modalHandler={this.handleEditShow}
          title="Update Order"
          submitHandler={this.onUpdateSubmit}
        >
          <Row>
            <Col md="12">
              <FormGroup check>
                <legend className="col-form-label col-sm-2">Status</legend>
                <Col>
                  <Label check>accepted : </Label>
                  <Input
                    name="status"
                    className="ml-2"
                    value="accepted"
                    type="radio"
                    checked={this.state.status === "accepted"}
                    onChange={this.onStatusChange}
                  />
                </Col>
                <Col>
                  <Label check>pending : </Label>
                  <Input
                    name="status"
                    className="ml-2"
                    value="pending"
                    type="radio"
                    checked={this.state.status === "pending"}
                    onChange={this.onStatusChange}
                  />
                </Col>
                <Col>
                  <Label check>delivered : </Label>
                  <Input
                    name="status"
                    className="ml-2"
                    value="delivered"
                    type="radio"
                    checked={this.state.status === "delivered"}
                    onChange={this.onStatusChange}
                  />
                </Col>
              </FormGroup>
            </Col>
          </Row>
        </Model>
        <Row>
          <Col>
            <Row className="mb-4">
              <Col>
                <Widget>
                  <div className={s.tableTitle}>
                    <div className="headline-2">Orders</div>

                    {/* <Button onClick={this.toggle} color="warning">Add New Order</Button> */}
                  </div>
                  <div className="widget-table-overflow">
                    <Table
                      className="table-striped table-borderless "
                      responsive
                    >
                      <thead>
                        <tr>
                          <th className={s.nameCol}>OrderID</th>
                          <th>Address</th>
                          <th>Phone</th>
                          <th>Need by date</th>
                          <th>Status</th>

                          <th>#</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.orders.map((item) => (
                          <tr key={uuidv4()}>
                            <td className="d-flex align-items-center">
                              <span className="ml-3">#00{item.order_id}</span>
                            </td>
                            {/* <td>{item.name}</td> */}
                            <td>
                              {item.type == "default"
                                ? item.adress
                                : item.custom_delivery_address}
                            </td>
                            <td>
                              {item.type == "default"
                                ? item.phone
                                : item.delivery_phone}
                            </td>
                            <td>{item.need_by_date}</td>
                            <td>
                              {item.status == "delivered" ? (
                                <Badge color="success">{item.status}</Badge>
                              ) : (
                                <Badge color="warning">{item.status}</Badge>
                              )}
                            </td>
                            <td>
                              <a style={{ padding: "3px" }}>
                                <Button
                                  color={"secondary-cyan"}
                                  onClick={() => {
                                    this.updateHandler(item.order_id);
                                  }}
                                >
                                  {" "}
                                  <Icons.Edit />
                                </Button>
                              </a>
                              <a style={{ padding: "3px" }}>
                                {/* <Button color={"secondary-red"}>
                                  {" "}
                                  <Icons.Delete />
                                </Button> */}
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Pagination className="pagination-with-border">
                      <PaginationItem>
                        <PaginationLink
                          previous
                          href="#top"
                          onClick={(e) => this.paginate(e, "minus")}
                        />
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationLink
                          next
                          href="#top"
                          onClick={(e) => this.paginate(e, "plus")}
                        />
                      </PaginationItem>
                    </Pagination>
                  </div>
                </Widget>
              </Col>
            </Row>
          </Col>
        </Row>
        <AddShopModal
          toggle={this.toggle}
          modal={this.state.modal}
          saveShop={this.saveShop}
          formFlag={this.state.formFlag}
        />
      </div>
    );
  }
}

export default Order;
