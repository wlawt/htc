import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import HTCLogo from "../../img/hcilogo.png";
import PropTypes from "prop-types";
import { logoutUser, clearCurrentUser } from "../../actions/userActions";

class Header extends Component {
  onLogoutClick = e => {
    e.preventDefault();

    this.props.clearCurrentUser();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const authLinks = (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/spreadsheet">
              Spreadsheet
            </Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <Link
            className="btn btn-outline-primary my-2 my-sm-0 mr-3"
            to="/registerTutor"
          >
            Add Tutor
          </Link>
          <button
            className="btn btn-outline-danger my-2 my-sm-0 mr-5"
            onClick={this.onLogoutClick.bind(this)}
          >
            Logout
          </button>
        </form>
      </div>
    );

    const guestLink = (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto" />
        <form className="form-inline my-2 my-lg-0">
          <Link
            className="btn btn-outline-primary my-2 my-sm-0 mr-5"
            to="/login"
          >
            Login
          </Link>
        </form>
      </div>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light pt-3 pb-3">
          <Link to="/" className="navbar-brand">
            <img
              src={HTCLogo}
              alt="HTC Logo"
              width="30"
              height="30"
              className="d-inline-block align-top mr-3 ml-3"
            />
            Harbord Tutoring Club
          </Link>
          {isAuthenticated ? authLinks : guestLink}
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentUser }
)(Header);
