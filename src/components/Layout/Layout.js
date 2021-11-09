import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";

import Header from "../Header/Header.js";
import Sidebar from "../Sidebar/Sidebar.js";
import Footer from "../Footer/Footer.js";
import Breadcrumbs from "../Breadbrumbs/Breadcrumbs.js";

import Dashboard from "../../pages/dashboard/Dashboard.js";
import FranchiseDashboard from "../../pages/FranchiseDashboard/Dashboard.js";
import Typography from "../../pages/typography/Typography.js";
import Notifications from "../../pages/notifications/Notifications.js";
import Tables from "../../pages/tables/Tables.js";
import Stores from "../../pages/stores/Stores.js";
import Banners from "../../pages/stores/Banners.js";
import Map from "../../pages/stores/Maps";
import NotificationComponent from "../../pages/stores/NotificationComponent";
import Order from "../../pages/orders/Order.js";
import Franchise from "../../pages/franchise/Franchise";
import Locations from "../../pages/locations/Locations";
import DelieveryBoys from "../../pages/deliveryboys/Delivery";
import Charts from "../../pages/uielements/charts/Charts.js";
import Icons from "../../pages/uielements/icons/IconsPage.js";
import Maps from "../../pages/uielements/maps/google/GoogleMapPage";
import Store from "../../pages/Store/Store.js";
import { io } from "socket.io-client";
// import io from "socket.io-client";

import Chat from "../../pages/chat/chat";

import s from "./Layout.module.scss";

// const AUTH_PARMS = {'id':16, token: 'PL8JtlGm6qNiyxaCdSdgtKbq4YR5C2cACjRkwmCfhdsDFxB8K5Ku9cfAXBCI', clientId: 'tutelle'};
// var socket = io('http://localhost:3001', { query: "id= " + JSON.stringify(AUTH_PARMS)});

// const socket = io("http://localhost:5002/sockets",
// {
//     transports: ['websocket', 'polling', 'flashsocket'],
//     path: "/pm-sockets/",
//     auth: {
//         token: "my-value"
//     },
//     query: {
//       "auth_token": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2FiNWQwMTllNjA1YTgyZWJkMjJlYmM4YjhlNzViNTVlZmE0MDEwOWQ5NmZkZGMxZDNjN2Q0N2Y2MjM5MmM4MzBhNzFlM2Q0YmQzMjYyMTUiLCJpYXQiOjE2MzI5ODI0ODMuNjMwMjg3LCJuYmYiOjE2MzI5ODI0ODMuNjMwMjkxLCJleHAiOjE2NjQ1MTg0ODMuNjIyNTQxLCJzdWIiOiIxNiIsInNjb3BlcyI6W119.brRDVvfM_X_mZRQNrqpCh_DzdtGSEJTXxwMZrjf7BUVwTh_JBz0QUE3Ll71WZZUYzmNxB-IPI-AXSeMpCEQkie4VG-Ogol7zPslpx3edVu96IiBpsDLAqV0FKsxlCpTeM6esWV-GRjST4our-cc3QjwX_alujHmKmolR8BvFqRBzAqkVUQsLNFjIwlgMeJ9f0onVCTct0EhHhugXdSbRmJCdwhspOr_JP3JHF4ccT54OkUl20xT8AK8F8S0K0ud8R10CvXT41iPpICgviNb_8fcbBCpxjTJOzRTaAKtAyo5Nzg4zSPR_isO7x4aSzEpPNnHRJPyfCxabNpMm4f_xPFctlOlmBqVoZ49dH-HDLzHh2-ZnpKyALWbD86sZ8Ao-djBHAY_omXsyz8eI6HY_3tz5TC25g4YhGvJoHxXPqJf6dEBriXnw_SSzFmIRmskKvunRZTnVnhZXXkYSkf7kkhNyYCpzBUGCstmuev68-kwCPQrk_kEZ2CDo73djBQ1_sqi8A8JNQomf5H-CkGKMQ7fmqSq_z8m-GGsHzKn2tB97sYYuD165bKJms348LOVGbOdUvAhB6j9aPphp1bpLFkpMCyYycAxbOA61vD-o-4xlm8fEDCbSkvSOTn4AH2r7WF-FXX5ENdpqfnUEbJyZHyMLexFlso22RGbM_FUO5N4'
//     }
// },

// );
class Layout extends React.Component {
  static propTypes = {
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarOpened: false,
  };

  componentDidMount() {
    // socket.on("connect", (data) => {
    //   console.log('key1'); // "G5p5..."
    // });
    // socket.emit("commented", 'dataaaaa');
    // socket.emit("getChatlist", 'dataaaaa');
    // socket.on("commented", (data) => {
    //   console.log('dddd',data);
    // });
    // socket.on("chatlist", (data) => {
    //   console.log('chat list',data);
    // });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.wrap}>
          <Header />
          <Sidebar />
          <main className={s.content}>
            <Breadcrumbs url={this.props.location.pathname} />
            <Switch>
              <Route
                path="/app"
                exact
                render={() => <Redirect to="app/dashboard" />}
              />
              <Route path="/app/banners" exact component={Banners} />
              <Route path="/app/maps" exact component={Map} />
              <Route
                path="/app/pushnotification"
                exact
                component={NotificationComponent}
              />
              <Route path="/app/stores" exact component={Stores} />
              <Route path="/app/stores/:storeId" component={Store} />
              <Route path="/app/Chat" exact component={Chat} />
              <Route path="/app/orders" exact component={Order} />
              <Route
                path="/app/delivery-boys"
                exact
                component={DelieveryBoys}
              />
              <Route
                path="/app/franchise/dashboard"
                exact
                component={FranchiseDashboard}
              />
              <Route path="/app/dashboard" exact component={Dashboard} />
              <Route path="/app/franchise" exact component={Franchise} />
              <Route path="/app/locations" exact component={Locations} />
              <Route path="/app/typography" exact component={Typography} />
              <Route path="/app/tables" exact component={Tables} />
              <Route
                path="/app/notifications"
                exact
                component={Notifications}
              />
              <Route
                path="/app/ui-elements"
                exact
                render={() => <Redirect to={"/app/ui-elements/charts"} />}
              />
              <Route path="/app/ui-elements/charts" exact component={Charts} />
              <Route path="/app/ui-elements/icons" exact component={Icons} />
              <Route path="/app/ui-elements/maps" exact component={Maps} />
              <Route path="*" exact render={() => <Redirect to="/error" />} />
            </Switch>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
