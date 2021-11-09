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
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import ApexActivityChart from "./components/ActivityChart.js";

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
import * as Icons from "@material-ui/icons";
import s from "./Dashboard.module.scss";

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
      checkboxes: [false, true],
    };
  }

  meals = [meal1, meal2, meal3];

  toggleOne() {
    this.setState({
      dropdownOpenOne: !this.state.dropdownOpenOne,
    });
  }

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

  render() {
    return (
      <div>
        <Row>
          <Col className="pr-grid-col" xs={12} lg={8}>
            <Row className="gutter mb-4">
              <Col className="mb-4 mb-md-0" xs={12} md={6}>
                <Widget className="">
                  <div className="d-flex justify-content-between widget-p-md">
                    <div className="headline-3 d-flex align-items-center">Your activity</div>
                    <ButtonDropdown
                      isOpen={this.state.dropdownOpenOne} toggle={this.toggleOne}
                      className=""
                    >
                      <DropdownToggle caret>
                        &nbsp; Weekly &nbsp;
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Daily</DropdownItem>
                        <DropdownItem>Weekly</DropdownItem>
                        <DropdownItem>Monthly</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </div>
                  <ApexActivityChart className="pb-4"/>
                </Widget>
              </Col>
              <Col xs={12} md={6}>
                <Widget className="widget-p-md">
                  <div className="d-flex justify-content-between">
                    <div className="headline-3 d-flex align-items-center">new orders</div>
                    <ButtonDropdown
                      isOpen={this.state.dropdownOpenTwo} toggle={this.toggleTwo}
                      className=""
                    >
                      <DropdownToggle >
                        &nbsp; See all &nbsp;
                      </DropdownToggle>
                      
                    </ButtonDropdown>
                  </div>
                  {this.meals.map((meal) =>
                    <div key={uuidv4()} className={`mt-4 ${s.widgetBlock}`}>
                      <div className={s.widgetBody}>
                        <div className="d-flex">
                          <img className="img-fluid mr-2" src={meal} alt="..." />
                          <div className="d-flex flex-column">
                            <p className="body-2">Salmon salad</p>
                            <p className="body-3 muted">300 g</p>
                          </div>
                        </div>
                        <div className="body-3 muted">
                          175 cal
                        </div>
                      </div>
                    </div>
                  )}
                </Widget>
              </Col>
            </Row>
            
            <Row className="gutter">
              {/*ОТРЕФАКТОРИТЬ И СОКРАТИТЬ КОД !!!!!!!!!!!*/}
              <Col className="mb-4 mb-xl-0" xs={6} sm={6} xl={4}>
                <Widget className="widget-p-sm">
                  <div className={s.smallWidget}>
                    <div className="d-flex mb-4">
                    
                    <div className="py-1 mr-2 img-fluid"> <Icons.DirectionsBike /></div>
                      <div className="d-flex flex-column">
                        <p className="headline-3">Delivery boyds</p>
                        <p className="body-2"><span className="body-3 muted">100</span></p>
                      </div>
                    </div>
                    <div>
                      <Progress color="secondary-red" className={`progress-xs ${s.mutedPink}`} value="75" />
                    </div>
                  </div>
                </Widget>
              </Col>
              <Col className="mb-4 mb-xl-0" xs={6} sm={6} xl={4}>
                <Widget className="widget-p-sm">
                  <div className={s.smallWidget}>
                    <div className="d-flex mb-4">
                    <div className="py-1 mr-2 img-fluid"> <Icons.Apartment /></div>
                      <div className="d-flex flex-column">
                        <p className="headline-3">Vendors</p>
                        <p className="body-2"><span className="body-3 muted">100</span></p>
                      </div>
                    </div>
                    <div>
                      <Progress color="secondary-yellow" className={`progress-xs ${s.mutedYellow}`} value="75" />
                    </div>
                  </div>
                </Widget>
              </Col>
              <Col xs={6} sm={6} xl={4}>
                <Widget className="widget-p-sm">
                  <div className={s.smallWidget}>
                    <div className="d-flex mb-4">
                    <div className="py-1 mr-2 img-fluid"> <Icons.NaturePeople /></div>
                      <div className="d-flex flex-column">
                        <p className="headline-3">App users</p>
                        <p className="body-2"><span className="body-3 muted">500</span></p>
                      </div>
                    </div>
                    <div>
                      <Progress color="violet" className={`progress-xs ${s.mutedViolet}`} value="75" />
                    </div>
                  </div>
                </Widget>
              </Col>
            </Row>
          </Col>
          <Col className="mt-4 mt-lg-0 pl-grid-col" xs={12} lg={4}>
            <Widget className="widget-p-lg">
              <div className="d-flex">
                <img className={s.image} src={user} alt="..." />
                <div className={s.userInfo}>
                  <p className="headline-3">Hashim KB</p>
                  <p className="body-3 muted">Thalappuzha</p>
                </div>
              </div>
              <div className={s.userParams}>
                <div className="d-flex flex-column">
                  <p className="headline-3">63 </p>
                  <p className="body-3 muted">delivered</p>
                </div>
                <div className="d-flex flex-column">
                  <p className="headline-3">175 </p>
                  <p className="body-3 muted">Orders</p>
                </div>
                <div className="d-flex flex-column">
                  <p className="headline-3">28 </p>
                  <p className="body-3 muted">Delivery boys</p>
                </div>
              </div>
              <div className={s.goals}>
                <div className={s.goalsTitle}>
                  <p className="headline-3">Your Goals</p>
                  <ButtonDropdown
                    isOpen={this.state.dropdownOpenThree} toggle={this.toggleThree}
                    className=""
                  >
                    <DropdownToggle caret>
                      &nbsp; Weekly &nbsp;
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Daily</DropdownItem>
                      <DropdownItem>Weekly</DropdownItem>
                      <DropdownItem>Monthly</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>
                <div className="d-flex flex-column mt-3">
                  <div className={s.activity}>
                    <p className="body-2">customers</p>
                    <p className="body-2">92<span className="body-3 muted"> / 160</span></p>
                  </div>
                  <Progress color="secondary-red" className="progress-xs" value={60} />
                </div>
                <div className="d-flex flex-column mt-3">
                  <div className={s.activity}>
                    <p className="body-2">Delivery boys</p>
                    <p className="body-2">40<span className="body-3 muted"> / 50</span></p>
                  </div>
                  <Progress color="secondary-yellow" className="progress-xs" value={80} />
                </div>
                <div className="d-flex flex-column mt-3">
                  <div className={s.activity}>
                    <p className="body-2">Vendors</p>
                    <p className="body-2">25<span className="body-3 muted"> / 40</span></p>
                  </div>
                  <Progress color="secondary-cyan" className="progress-xs" value={40} />
                </div>
              </div>
              
            </Widget>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard;
