import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { addTutor } from "../../actions/tutorActions";

class CreateTutor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      grade: "",
      year: "",
      available: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    let date = new Date().getFullYear();
    let currentYear = `${date}/${date + 1}`;

    if (this.state.year !== currentYear) {
      // TODO: Display error
      console.log(`Please enter current year: ${currentYear}`);
    } else {
      // Dates are correct
      let availableDate = this.state.available.toUpperCase();

      const createTutor = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        grade: this.state.grade,
        year: this.state.year,
        available: availableDate
      };

      date = ""; // Reset date value
      currentYear = ""; // Reset currentYear value
      this.props.addTutor(createTutor, this.props.history);
    }
  };

  render() {
    return (
      <div className="container pt-5">
        <h1 className="display-4 pt-1">Register a new tutor</h1>
        <form onSubmit={this.onSubmit} className="pt-1">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputFirst">First Name</label>
              <input
                type="text"
                className="form-control"
                id="inputFirst"
                placeholder="Enter first name ..."
                name="firstName"
                onChange={this.onChange}
                value={this.state.firstName}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputLast">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="inputLast"
                placeholder="Enter last name ..."
                name="lastName"
                onChange={this.onChange}
                value={this.state.lastName}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="tutorGrade">Grade</label>
            <input
              type="text"
              className="form-control"
              id="tutorGrade"
              placeholder="Enter Tutor Grade"
              name="grade"
              onChange={this.onChange}
              value={this.state.grade}
            />
          </div>
          <div className="form-group">
            <label htmlFor="yearPart">Year Participating</label>
            <input
              type="text"
              className="form-control"
              id="yearPart"
              placeholder="Enter year participating ex. 2019/2020"
              name="year"
              onChange={this.onChange}
              value={this.state.year}
            />
          </div>
          <div className="form-group">
            <label htmlFor="availDate">Availability</label>
            <input
              type="text"
              className="form-control"
              id="availDate"
              placeholder="Ex. Tuesday, Thursday, or Both"
              name="available"
              onChange={this.onChange}
              value={this.state.available}
            />
          </div>
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
  addTutor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tutor: state.tutor,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addTutor }
)(withRouter(CreateTutor));
