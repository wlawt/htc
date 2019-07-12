import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { addTutor } from "../../actions/tutorActions";

import InputGroup from "../common/InputGroup";

class CreateTutor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      grade: "",
      available: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

    let date = new Date().getFullYear();
    let currentYear = `${date}/${date + 1}`;

    let availableDate = this.state.available.toUpperCase();

    const createTutor = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      grade: this.state.grade,
      year: currentYear,
      available: availableDate
    };

    date = ""; // Reset date value
    currentYear = ""; // Reset currentYear value
    this.props.addTutor(createTutor, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container pt-5">
        <h1 className="display-4 pt-1">Register a new tutor</h1>
        <form onSubmit={this.onSubmit} className="pt-1">
          <div className="form-row">
            <InputGroup
              divClass="form-group col-md-6"
              forAttr="inputFirst"
              title="First name"
              types="text"
              id="inputFirst"
              placeholder="Enter first name ..."
              name="firstName"
              onChange={this.onChange}
              value={this.state.firstName}
              error={errors.firstName}
            />

            <InputGroup
              divClass="form-group col-md-6"
              forAttr="inputLast"
              title="Last name"
              types="text"
              id="inputLast"
              placeholder="Enter last name ..."
              name="lastName"
              onChange={this.onChange}
              value={this.state.lastName}
              error={errors.lastName}
            />
          </div>

          <InputGroup
            divClass="form-group"
            forAttr="tutorGrade"
            title="Grade"
            types="text"
            id="tutorGrade"
            placeholder="Enter tutor grade ..."
            name="grade"
            onChange={this.onChange}
            value={this.state.grade}
            error={errors.grade}
          />

          <InputGroup
            divClass="form-group"
            forAttr="availDate"
            title="Availability"
            types="text"
            id="availDate"
            placeholder="Ex. Tuesday, Thursday, or Both"
            name="available"
            onChange={this.onChange}
            value={this.state.available}
            error={errors.available}
          />

          <button type="submit" className="btn btn-primary">
            Add Tutor
          </button>
        </form>
      </div>
    );
  }
}

CreateTutor.propTypes = {
  tutor: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addTutor: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tutor: state.tutor,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTutor }
)(withRouter(CreateTutor));
