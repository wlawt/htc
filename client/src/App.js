import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// Components
import Header from "./components/layout/Header";
import Spreadsheet from "./components/Spreadsheet/Spreadsheet";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import RegisterTutor from "./components/Tutor/CreateTutor";
import AddSubject from "./components/Tutor/AddSubject";
import Footer from "./components/layout/Footer";
import NotFound from "./components/not-found/NotFound";
import Log from "./components/log/Log";

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
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header />

            <div className="App">
              <div className="pb-5" style={{ marginBottom: "300px" }}>
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />

                  <Route exact path="/" component={Spreadsheet} />

                  <PrivateRoute
                    exact
                    path="/registerTutor"
                    component={RegisterTutor}
                  />

                  <PrivateRoute
                    exact
                    path="/addSubject/:id"
                    component={AddSubject}
                  />

                  <PrivateRoute exact path="/log" component={Log} />

                  <Route component={NotFound} />
                </Switch>
              </div>
              <Footer />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
