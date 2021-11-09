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
import AddFranchiseModal from "../../components/AddFranchiseModal";
import Gmap from "../../components/Gmap";
// import s from "./Dashboard.module.scss";
import s from "./Tables.module.scss";
const api_url = "https://api.keralashoppie.com/";
// env.API_URL? env.API_URL : 'http://localhost:8000/api/v1/'
// const api_url = 'http://localhost:5002/';

class Franchise extends React.Component {
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
      franchises: [],
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

  getFranchise = () => {
    axios
      .get(
        api_url + "api/v1/franchise/list",
        store.getState().user.requestHeader
      )
      .then((result) => {
        console.log("from api client", result.data);
        this.setState({ franchises: result.data.data });
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
        return name[this.state.language];
      }
    } catch (error) {
      console.log(name, error);
      return name[this.state.language];
    }
  };
  saveFranchise = (e) => {
    this.setState({ formFlag: true });
    console.log(e);
    axios
      .post(
        api_url + "api/v1/franchise/store/",
        e,
        store.getState().user.requestHeader
      )
      .then((result) => {
        this.setState({ formFlag: false });

        console.log("from api client", result.data);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  componentDidMount() {
    this.getFranchise();
  }
  render() {
    return (
      <div>
        {/* <Gmap/> */}
        <Row>
          <Col>
            <Row className="mb-4">
              <Col>
                <Widget>
                  <div className={s.tableTitle}>
                    <div className="headline-2">Franchises</div>

                    <Button onClick={this.toggle} color="warning">
                      Add franchise
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
                          <th>LOCATION</th>
                          <th>RATE</th>
                          <th>STATUS</th>
                          <th>#</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.franchises.map((item) => (
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
                              <span className="ml-3">
                                {item.franchise_name}
                              </span>
                            </td>
                            {/* <td>{item.name}</td> */}
                            <td>{item.phone}</td>
                            <td>{item.location_id}</td>
                            <td>{item.francise_rate}</td>
                            <td>
                              {item.franchise_status ? (
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
                  </div>
                </Widget>
              </Col>
            </Row>
          </Col>
        </Row>
        <AddFranchiseModal
          toggle={this.toggle}
          modal={this.state.modal}
          saveFranchise={this.saveFranchise}
          formFlag={this.state.formFlag}
        />
      </div>
    );
  }
}

export default Franchise;
