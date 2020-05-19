import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Import action
import { loginUser } from "../../actions/userActions";

import InputGroup from "../common/InputGroup";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const loginData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(loginData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container pt-5" style={{ marginBottom: "100px" }}>
        <h1 className="display-4 pt-2">Login to Harbord Tutoring Club</h1>
        <form onSubmit={this.onSubmit}>
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
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
