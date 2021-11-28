import React from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
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
import * as Api from "../../modules/ApiClient";
import * as LocalCache from "../../modules/LocalCache";
import SimpleReactValidator from "simple-react-validator";

import loginImage from '../../assets/logo.png';
import SofiaLogo from "../../components/Icons/SidebarIcons/SofiaLogo.js";
import GoogleIcon from "../../components/Icons/AuthIcons/GoogleIcon.js";
import TwitterIcon from "../../components/Icons/AuthIcons/TwitterIcon.js";
import FacebookIcon from "../../components/Icons/AuthIcons/FacebookIcon.js";
import GithubIcon from "../../components/Icons/AuthIcons/GithubIcon.js";
import LinkedinIcon from "../../components/Icons/AuthIcons/LinkedinIcon.js";
import store from "../../store";

class Login extends React.Component {
  static isAuthenticated(token) {
    if (LocalCache.getToken()) return true;
  }

  constructor(props) {
    super(props);

    this.state = {
      phone: "",
      password: "",
      loginFlag: false,
    };
    this.validator = new SimpleReactValidator();
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  };

  mySubmitHandler = (event, type) => {
    this.props.history.push("/app/dashboard");
    event.preventDefault();
    this.setState({ loginFlag: true });
    if (this.validator.allValid()) {
      var obj = {
        device_id: "web",
        phone: this.state.phone,
        password: this.state.password,
      };
      return Api.login(obj, type)
        .then((result) => {
          this.setState({ loginFlag: false });
          store.dispatch({ type: "loggedIn", payload: result.access_token });
          store.dispatch({ type: "setRole", payload: result.role });
          //add franchise id
          LocalCache.setToken(result.access_token);
          LocalCache.setRole(result.role);

          if (result.status == true) {
            switch (result.role) {
              case "admin":
                // code block
                this.props.history.push("/app/orders");
                break;
              case "franchise":
                this.props.history.push("/app/orders");
                break;
              case "vendor":
                // code block
                break;
              default:
              // code block
            }
            // this.props.history.push("/home")
          } else {
            console.log("errorssssdd", result);
          }
        })
        .catch((e) => {
          console.log("errorssss", e);
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/template" },
    };

    // if (Login.isAuthenticated(JSON.parse(localStorage.getItem('authenticated')))) {
    //   return (
    //     <Redirect to={from} />
    //   );
    // }

    return (
      <div className="auth-page">
        <Container className="col-12">
          <Row className="d-flex align-items-center">
            <Col xs={12} lg={6} className="left-column">
              <Widget className="widget-auth widget-p-lg">
                <div className="d-flex align-items-center justify-content-between py-3">
                  <p className="auth-header mb-0">Login</p>
                  <div className="logo-block">
                    {/* <SofiaLogo /> */}
                    <p className="mb-0">MisterShoopie</p>
                  </div>
                </div>

                <form autoComplete={false}>
                  <FormGroup className="my-3">
                    <FormText>Phone</FormText>
                    <Input
                      autoComplete={false}
                      id="phone"
                      className="input-transparent pl-3"
                      value={this.state.phone}
                      onChange={this.handleChange}
                      type="text"
                      required
                      name="phone"
                      placeholder="phone"
                    />
                    {this.validator.message(
                      "phone",
                      this.state.phone,
                      "required|phone",
                      { className: "text-danger" }
                    )}
                  </FormGroup>
                  <FormGroup className="my-3">
                    <div className="d-flex justify-content-between">
                      <FormText>Password</FormText>
                      <Link to="/error">Forgot password?</Link>
                    </div>
                    <Input
                      autoComplete={false}
                      id="password"
                      className="input-transparent pl-3"
                      value={this.state.password}
                      onChange={this.handleChange}
                      type="password"
                      required
                      name="password"
                      placeholder="Password"
                    />
                    {this.validator.message(
                      "password",
                      this.state.password,
                      "required",
                      { className: "text-danger" }
                    )}
                  </FormGroup>
                  <div className="bg-widget d-flex justify-content-center">
                    <Button
                      className="rounded-pill my-3 mr-1"
                      type="button"
                      color="secondary-red"
                      onClick={(e) => this.mySubmitHandler(e, "franchise")}
                    >
                      Farnchise Login
                    </Button>
                    <Button
                      className="rounded-pill my-3"
                      type="button"
                      color="secondary-red"
                      onClick={(e) => this.mySubmitHandler(e, "admin")}
                    >
                      Admin Login
                    </Button>
                  </div>
                  {this.state.loginFlag ? (
                    <div className="bg-widget d-flex justify-content-center">
                      <Spinner type="grow" color="dark" />
                      <Spinner type="grow" color="warning" />
                      <Spinner type="grow" color="dark" />
                    </div>
                  ) : (
                    ""
                  )}

                  <p className="dividing-line my-3">&#8195;Or&#8195;</p>
                  <div className="d-flex align-items-center my-3">
                    <p className="social-label mb-0">Login with</p>
                    <div className="socials">
                      <a href="https://flatlogic.com/">
                        <GoogleIcon />
                      </a>
                      <a href="https://flatlogic.com/">
                        <TwitterIcon />
                      </a>
                      <a href="https://flatlogic.com/">
                        <FacebookIcon />
                      </a>
                      <a href="https://flatlogic.com/">
                        <GithubIcon />
                      </a>
                      <a href="https://flatlogic.com/">
                        <LinkedinIcon />
                      </a>
                    </div>
                  </div>
                  <Link to="/register">
                    Don’t have an account? Sign Up here
                  </Link>
                </form>
              </Widget>
            </Col>
            <Col xs={0} lg={6} className="right-column">
              <div>
                <img src={loginImage} alt="Error page" />
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default Login;
