import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Import actions
import { createUser } from "../../actions/userActions";

import InputGroup from "../common/InputGroup";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    this.props.createUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container pt-5">
        <h1 className="display-4 pt-2">Register to Harbord Tutoring Club</h1>
        <form onSubmit={this.onSubmit}>
          <InputGroup
            divClass="form-group"
            forAttr="inputName"
            title="Full name"
            types="text"
            id="inputName"
            placeholder="Enter full name ..."
            name="name"
            onChange={this.onChange}
            value={this.state.name}
            error={errors.name}
          />

          <InputGroup
            divClass="form-group"
            forAttr="inputEmail"
            title="Email address"
            types="email"
            id="inputEmail"
            placeholder="Enter email"
            name="email"
            onChange={this.onChange}
            value={this.state.email}
            error={errors.email}
          />

          <InputGroup
            divClass="form-group"
            forAttr="inputPassword"
            title="Password"
            types="password"
            id="inputPassword"
            placeholder="Enter password ..."
            name="password"
            onChange={this.onChange}
            value={this.state.password}
            error={errors.password}
          />

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <p className="text-muted">
            Already have an account? <Link to="/login">Login Here.</Link>
          </p>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createUser }
)(withRouter(Register));
