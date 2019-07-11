import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// Components
import Header from "./components/layout/Header";
import Dashboard from "./components/dashboard/Dashboard";
import Spreadsheet from "./components/Spreadsheet/Spreadsheet";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import RegisterTutor from "./components/Tutor/CreateTutor";
import AddSubject from "./components/Tutor/AddSubject";
import SubjectsOffered from "./components/subjects/SubjectsOffered";
import Footer from "./components/layout/Footer";

import {
  setCurrentUser,
  logoutUser,
  clearCurrentUser
} from "./actions/userActions";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

// Private Route
import PrivateRoute from "./components/common/PrivateRoute";

import "./App.css";

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Clear user
    store.dispatch(clearCurrentUser());

    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <div className="App">
            <div className="pb-5">
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
              </Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Switch>
                <PrivateRoute
                  exact
                  path="/spreadsheet"
                  component={Spreadsheet}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/registerTutor"
                  component={RegisterTutor}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/addSubject/:id"
                  component={AddSubject}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/subjects"
                  component={SubjectsOffered}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
