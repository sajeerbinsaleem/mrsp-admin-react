import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router";
import { HashRouter } from "react-router-dom";
import LayoutComponent from "../components/Layout/Layout.js";
import ErrorPage from "../pages/error/ErrorPage.js";
import Login from "../pages/login/Login.js";
import Register from "../pages/register/Register.js";
import { logoutUser } from "../actions/auth.js";
import PrivateRoute from "../modules/PrivateRoute"
import "../styles/app.scss";
import {ToastContainer} from "react-toastify";

// const PrivateRoute = ({ dispatch, component, ...rest }) => {
//   if (!Login.isAuthenticated()) {
//     dispatch(logoutUser());
//     return (<Redirect to="/login" />)
//   } else {
//     return (
//       <Route { ...rest } render={props => (React.createElement(component, props))} />
//     );
//   }
// };

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <ToastContainer/>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/app" exact render={() => <Redirect to="/app/dashboard"/>}/>
            <PrivateRoute path="/app" component={LayoutComponent} />
            {/* <Route path="/app"  component={LayoutComponent} /> */}
            <Route path="/error" exact component={ErrorPage} />
            <Route path="/register" exact component={Register} />
            <Route component={ErrorPage}/>
            <Route path='*' exact={true} render={() => <Redirect to="/error" />} />

          </Switch>
        </HashRouter>
      </div>
    );
  }
}



export default App;
