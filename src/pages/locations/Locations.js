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
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import ApexActivityChart from "./components/ActivityChart.js";
import env from "react-dotenv";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import AddLocationModal from "../../components/AddLocationModal";
// import s from "./Dashboard.module.scss";
import s from "./Tables.module.scss";
const api_url = "https://api.keralashoppie.com/";
// env.API_URL? env.API_URL : 'http://localhost:8000/api/v1/'
const options = {
  autoClose: 4000,
  closeButton: false,
  hideProgressBar: true,
  position: toast.POSITION.TOP_RIGHT,
};

class Locations extends React.Component {
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
      locations: [],
      secondTable: [],
      formFlag: false,
      modal: false,
      backdrop: true,
      keyboard: true,
      show: false,
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
  storeName = (name) => {
    try {
      let nm = {};
      if ((nm = JSON.parse(name))) {
        return nm[this.state.language];
      } else {
        return name;
      }
    } catch (error) {
      console.log(name, error);
      return name;
    }
  };
  saveLocation = (e) => {
    this.setState({ formFlag: true });
    console.log(e);
    axios
      .post(
        "http://localhost:5002/" + "api/v1/location",
        e,
        store.getState().user.requestHeader
      )
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
    this.getLocations();
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
                    <div className="headline-2">locations</div>

                    <Button onClick={this.toggle} color="warning">
                      Add Location
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
                          <th>Location</th>
                          <th>District</th>
                          <th>State</th>
                          <th>#</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.locations.map((item) => (
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
                              <span className="ml-3">{item.location}</span>
                            </td>
                            {/* <td>{item.name}</td> */}
                            <td>{item.district}</td>
                            <td>{item.state}</td>
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
                  </div>
                </Widget>
              </Col>
            </Row>
          </Col>
        </Row>
        <AddLocationModal
          toggle={this.toggle}
          modal={this.state.modal}
          saveLocation={this.saveLocation}
          formFlag={this.state.formFlag}
        />
      </div>
    );
  }
}

export default Locations;
