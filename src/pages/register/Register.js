import React from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { connect } from "react-redux";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input,
  Spinner,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import Footer from "../../components/Footer/Footer.js";
import env from "react-dotenv";
import Login from "../login/Login.js";
import "./reg.scss";
import loginImage from "../../assets/registerImage.svg";
import SofiaLogo from "../../components/Icons/SidebarIcons/SofiaLogo.js";
import GoogleIcon from "../../components/Icons/AuthIcons/GoogleIcon.js";
import TwitterIcon from "../../components/Icons/AuthIcons/TwitterIcon.js";
import FacebookIcon from "../../components/Icons/AuthIcons/FacebookIcon.js";
import GithubIcon from "../../components/Icons/AuthIcons/GithubIcon.js";
import LinkedinIcon from "../../components/Icons/AuthIcons/LinkedinIcon.js";
import { registerUser } from "../../actions/register.js";
var app_mode = env.MODE ? env.MODE: 'development'
var default_url = app_mode == 'production'? "https://api.mistershoppie.com/" : "https://api.keralashoppie.com/";
const api_url =env.API_URL?env.API_URL: default_url;
// env.API_URL? env.API_URL : 'http://localhost:8000/api/v1/'
// const api_url = 'http://localhost:5002/';

const btn = document.querySelector(".place-order");

class Register extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      email: "",
      password: "",
      register_flag: false,
      formFlag: false,
      hasError: false,
    };

    this.validator = new SimpleReactValidator();
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState((currentState) => ({
      user: { ...currentState.user, [event.target.name]: value },
    }));
  };

  handleUpload = (e) => {
    this.setState((currentState) => ({
      user: { ...currentState.user, ["image"]: e.target.files[0] },
    }));
    const file = URL.createObjectURL(e.target.files[0]);
    // document.getElementById("preview-img").src = file;
  };
  handleAdhaarUpload = (e) => {
    this.setState((currentState) => ({
      user: { ...currentState.user, ["adhaar_card"]: e.target.files[0] },
    }));
    const file = URL.createObjectURL(e.target.files[0]);
    // document.getElementById("preview-img").src = file;
  };
  handlePancardUpload = (e) => {
    this.setState((currentState) => ({
      user: { ...currentState.user, ["pancard"]: e.target.files[0] },
    }));
    const file = URL.createObjectURL(e.target.files[0]);
    // document.getElementById("preview-img").src = file;
  };
  mySubmitHandler = async (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      this.setState({ formFlag: true });

      var formData = new FormData();
      formData.append("name", this.state.user.name);
      formData.append("address", this.state.user.address);
      formData.append("user_phone", this.state.user.phone);
      formData.append(
        "adhaar_card",
        this.state.user.adhaar_card,
        this.state.user.adhaar_card.name
      );
      formData.append(
        "pan_card",
        this.state.user.pancard,
        this.state.user.pancard.name
      );
      formData.append(
        "image",
        this.state.user.image,
        this.state.user.image.name
      );
      axios
        .post(api_url + "api/v1/franchise/register", formData)
        .then((result) => {
          this.setState({ formFlag: false });

          this.showSuccess();
          // toast(<Notification type={'success'} message="successfully saved"/>, options)
          console.log("from api client", result.data);
        })
        .catch((e) => {
          this.setState({ hasError: true });
          this.setState({ formFlag: false });
          // toast(<Notification type={'error'} message="error saved"/>, options)
          console.log("error", e);
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  showSuccess = () => {
    this.setState({ register_flag: true });
    setTimeout(() => {
      var btn = document.querySelector(".place-order");
      btn.classList.remove("place-order--default");
      btn.classList.add("place-order--placing");
      setTimeout(() => {
        btn.classList.remove("place-order--placing");
        btn.classList.add("place-order--done");
      }, 4000);
    }, 10);
  };
  componentDidMount() {}
  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/app" },
    };

    if (
      Login.isAuthenticated(JSON.parse(localStorage.getItem("authenticated")))
    ) {
      return <Redirect to={from} />;
    }

    return (
      <div className="auth-page">
          <Row className="d-flex align-items-center">
            <Col xs={12} lg={6} className="left-column">
              <Widget className="widget-auth widget-p-lg">
                <div className="d-flex align-items-center justify-content-between py-3">
                  <p className="auth-header mb-0">Register </p>
                  <div className="logo-block">
                    <SofiaLogo />
                    <p className="mb-0">Mistershoppie</p>
                  </div>
                </div>
                <div className="auth-info my-2">
                  <p>
                    To become a member of emerging delivery network app,
                    register here. Our representative will be in touch with you
                    soon
                  </p>
                </div>
                <FormGroup className="my-3">
                  <FormText>FullName</FormText>
                  <Input
                    id="name"
                    className="input-transparent pl-3"
                    value={this.state.user.name}
                    type="text"
                    required
                    name="name"
                    placeholder="My name"
                    onChange={this.handleChange}
                  />
                  {this.validator.message(
                    "name",
                    this.state.user.name,
                    "required",
                    { className: "text-danger" }
                  )}
                </FormGroup>
                <FormGroup className="my-3">
                  <FormText>Mobile No</FormText>
                  <Input
                    id="phone"
                    className="input-transparent pl-3"
                    value={this.state.user.phone}
                    onChange={this.handleChange}
                    type="phone"
                    required
                    name="phone"
                  />
                  {this.validator.message(
                    "phone",
                    this.state.user.phone,
                    "required",
                    { className: "text-danger" }
                  )}
                </FormGroup>
                <FormGroup className="my-3">
                  <FormText>Address</FormText>
                  <Input
                    id="phone"
                    className="input-transparent pl-3"
                    value={this.state.user.address}
                    onChange={this.handleChange}
                    type="textarea"
                    required
                    name="address"
                  />
                  {this.validator.message(
                    "address",
                    this.state.user.address,
                    "required",
                    { className: "text-danger" }
                  )}
                </FormGroup>
                <FormGroup className="my-3">
                  <FormText>Location</FormText>
                  <Input
                    id="email"
                    className="input-transparent pl-3"
                    disabled
                    type="text"
                    required
                    name="location"
                    placeholder="Location will be assigned from our team"
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <FormText>
                    Your Image upload here (allowed file :png/jpg/jpeg, below 1
                    MB)
                  </FormText>
                  <Input
                    type="file"
                    name="image"
                    id="exampleFile"
                    onChange={this.handleUpload}
                  />
                  {this.validator.message(
                    "image",
                    this.state.user.image,
                    "required",
                    { className: "text-danger" }
                  )}
                </FormGroup>
                <FormGroup className="my-3">
                  <FormText>
                    Adhaar card upload here (allowed file :png/jpg/jpeg, below 1
                    MB)
                  </FormText>
                  <Input
                    type="file"
                    name="adhaar_card"
                    id="exampleFile"
                    onChange={this.handleAdhaarUpload}
                  />
                  {this.validator.message(
                    "adhaar_card",
                    this.state.user.adhaar_card,
                    "required",
                    { className: "text-danger" }
                  )}
                </FormGroup>
                <FormGroup className="my-3">
                  <FormText>
                    Pancard upload here (allowed file :png/jpg/jpeg, below 1 MB)
                  </FormText>
                  <Input
                    type="file"
                    name="pancard"
                    id="exampleFile"
                    onChange={this.handlePancardUpload}
                  />
                  {this.validator.message(
                    "pancard",
                    this.state.user.pancard,
                    "required",
                    { className: "text-danger" }
                  )}
                </FormGroup>

                {!this.state.register_flag ? (
                  <div className="bg-widget d-flex justify-content-center">
                    <Button
                      className="rounded-pill my-3"
                      type="submit"
                      color="secondary-yellow"
                      onClick={this.mySubmitHandler}
                    >
                      Sign Up
                    </Button>
                  </div>
                ) : (
                  <button class="place-order place-order--default">
                    <div class="forklift">
                      <div class="upper"></div>
                      <div class="lower"></div>
                    </div>
                    <div class="box animation"></div>
                    <div class="done text">Successfully Registered</div>
                  </button>
                )}
                {this.state.hasError ? (
                  <div class="text-danger">
                    Allowed file :png/jpg/jpeg, and file size hould be below 1
                    MB.
                  </div>
                ) : (
                  ""
                )}

                {this.state.formFlag ? (
                  <div className="bg-widget d-flex justify-content-center">
                    <Spinner type="grow" color="dark" />
                    <Spinner type="grow" color="warning" />
                    <Spinner type="grow" color="dark" />
                  </div>
                ) : (
                  ""
                )}
                <p className="dividing-line my-3">&#8195;Or&#8195;</p>
                {/* <div className="d-flex align-items-center my-3">
                    <p className="social-label mb-0">Login with</p>
                    <div className="socials">
                      <a href="https://flatlogic.com/"><GoogleIcon /></a>
                      <a href="https://flatlogic.com/"><TwitterIcon /></a>
                      <a href="https://flatlogic.com/"><FacebookIcon /></a>
                      <a href="https://flatlogic.com/"><GithubIcon /></a>
                      <a href="https://flatlogic.com/"><LinkedinIcon /></a>
                    </div>
                  </div> */}
                <Link to="/login">login to dashboard</Link>
              </Widget>
            </Col>
            <Col xs={0} lg={6} className="right-column">
              <div>
                <img src={loginImage} alt="Error page" />
              </div>
            </Col>
          </Row>
      </div>
    );
  }
}

export default Register;
