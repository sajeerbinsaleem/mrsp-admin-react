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
import * as Icons from "@material-ui/icons";

import store from "../../store/index.js";
import AddShopModal from "../../components/AddShopModal";
// import s from "./Dashboard.module.scss";
import s from "./Tables.module.scss";
import { Link } from "react-router-dom";
const api_url = env.API_URLs || "https://api.keralashoppie.com/api/v1/";
// const api_url = "http://localhost:3001/api/v1/";
// env.API_URL ? env.API_URL :
const options = {
  autoClose: 4000,
  closeButton: false,
  hideProgressBar: true,
  position: toast.POSITION.TOP_RIGHT,
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.toggleOne = this.toggleOne.bind(this);
    this.toggleTwo = this.toggleTwo.bind(this);
    this.toggleThree = this.toggleThree.bind(this);

    this.state = {
      dropdownOpenOne: false,
      dropdownOpenTwo: false,
      dropdownOpenThree: false,
      tableDropdownOpen: false,
      checkboxes: [false, true],
      secondTableCurrentPage: 1,
      shops: [],
      secondTable: [],
      formFlag: false,
      modal: false,
      backdrop: true,
      keyboard: true,
      show: false,
      current_page: 1,
      language: store.getState().user.language,
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

  getStores = (page) => {
    axios
      .get(
        api_url + "dashboard-shops?franchise_id=1&limit=10&page=" + page,
        store.getState().user.requestHeader
      )
      .then((result) => {
        console.log("from api client", result.data);
        this.setState({ shops: result.data.data });
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
  saveShop = (e) => {
    this.setState({ formFlag: true });
    console.log(e);
    axios
      .post(api_url + "vendor/store", e)
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
  componentDidMount() {
    this.getStores(1);
  }
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Row className="mb-4">
              <Col>
                <Widget>
                  <div className={s.tableTitle}>
                    <div className="headline-2">Shops</div>

                    <Button onClick={this.toggle} color="warning">
                      Add shop
                    </Button>
                  </div>
                  <div className="widget-table-overflow">
                    <Table
                      className="table-striped table-borderless "
                      responsive
                    >
                      <thead>
                        <tr>
                          <th>
                            <div className="checkbox checkbox-primary">
                              <input
                                id="checkbox200"
                                className="styled"
                                type="checkbox"
                              />
                              <label for="checkbox200" />
                            </div>
                          </th>
                          <th className={s.nameCol}>NAME</th>
                          <th>PHONE</th>
                          <th>CITY</th>
                          <th>DELIVERY RANGE</th>
                          <th>STATUS</th>
                          <th>#</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.shops.map((item) => (
                          <tr key={uuidv4()}>
                            <td>
                              <div className="checkbox checkbox-primary">
                                <input
                                  id={item.id}
                                  className="styled"
                                  type="checkbox"
                                />
                                <label for={item.id} />
                              </div>
                            </td>
                            <td className="d-flex align-items-center">
                              <img
                                className={s.image}
                                src={item.image_url}
                                alt="User"
                              />
                              <Link
                                className="ml-3"
                                to={`/app/stores/${item.id}`}
                              >
                                {this.storeName(item.store_name)}
                              </Link>
                            </td>
                            {/* <td>{item.name}</td> */}
                            <td>{item.phone_number}</td>
                            <td>{item.city}</td>
                            <td>{item.del_range}</td>
                            <td>
                              {item.admin_approval ? (
                                <Badge color="success">Approved</Badge>
                              ) : (
                                <Badge color="warning">pending</Badge>
                              )}
                            </td>
                            <td>
                              <a style={{ padding: "3px" }}>
                                <Badge color={"secondary-cyan"}>
                                  {" "}
                                  <Icons.Edit />
                                </Badge>
                              </a>
                              <a style={{ padding: "3px" }}>
                                <Badge color={"secondary-red"}>
                                  {" "}
                                  <Icons.Delete />
                                </Badge>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    {/* <Pagination className="pagination-with-border">
                    <PaginationItem disabled={secondTableCurrentPage <= 0}>
                      <PaginationLink
                        onClick={e => setSecondTablePage(e, secondTableCurrentPage - 1)}
                        previous
                        href="#top"
                      />
                    </PaginationItem>
                    {[...Array(secondTablePagesCount)].map((page, i) =>
                      <PaginationItem active={i === secondTableCurrentPage} key={i}>
                        <PaginationLink onClick={e => setSecondTablePage(e, i)} href="#top">
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    <PaginationItem disabled={secondTableCurrentPage >= secondTablePagesCount - 1}>
                      <PaginationLink
                        onClick={e => setSecondTablePage(e, secondTableCurrentPage + 1)}
                        next
                        href="#top"
                      />
                    </PaginationItem>
                  </Pagination> */}
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

export default Dashboard;
