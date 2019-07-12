import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  deleteTutor,
  addAbsence,
  addHourTutor,
  getTutors,
  minusAbsence
} from "../../actions/tutorActions";
import { Link } from "react-router-dom";

import InputGroup from "../common/InputGroup";

class TutorFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hour: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getTutors();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  deleteTutor = id => {
    this.props.deleteTutor(id, this.props.history);
    window.location.reload();
  };

  addOneAbsence = id => {
    this.props.addAbsence(id, this.props.history);
    window.location.reload();
  };

  minusOneAbsence = id => {
    this.props.minusAbsence(id, this.props.history);
    window.location.reload();
  };

  addHours = id => {
    const tutorData = {
      hour: this.state.hour
    };

    this.setState({ hour: "" });
    this.props.addHourTutor(id, tutorData, this.props.history);
    window.location.reload();
  };

  render() {
    const { tutor } = this.props;
    const { errors } = this.state;
    const { isAuthenticated } = this.props.auth;

    const authDashboard = (
      <tr key={tutor._id}>
        <th scope="row">
          <p className="mt-1">
            {tutor.lastName}, {tutor.firstName}
          </p>
        </th>
        <td>
          <p className="mt-1">{tutor.grade}</p>
        </td>
        <td>
          {tutor.numAbsence}
          <button
            type="button"
            onClick={this.addOneAbsence.bind(this, tutor._id)}
            className="btn btn-danger ml-5"
          >
            +
          </button>
          <br />
          <p style={{ float: "center" }}>
            <button
              type="button"
              onClick={this.minusOneAbsence.bind(this, tutor._id)}
              className="btn btn-success ml-5"
            >
              —
            </button>
          </p>
        </td>
        <td>
          <p className="mt-1" style={{ display: "inline-block" }}>
            {tutor.numHours}
          </p>
          <div className="text-right" style={{ float: "right" }}>
            <button
              type="button"
              onClick={this.addHours.bind(this, tutor._id)}
              className="btn btn-success mb-2"
            >
              Add
            </button>
          </div>

          <InputGroup
            types="text"
            placeholder="Enter number only"
            name="hour"
            onChange={this.onChange}
            value={this.state.hour}
            error={errors.hour}
          />
        </td>
        <td style={{ wordWrap: "break-word" }}>
          {tutor.subjects.length === 0 ? (
            <p className="keepBlock">No subjects</p>
          ) : (
            <p className="keepBlock">
              {tutor.subjects.map(s => `${s.topic}${" "}${s.grade}, `)}
            </p>
          )}
        </td>
        <td>
          <div className="keepBlock keepLine mr-2">
            <Link to={`/addSubject/${tutor._id}`} className="btn btn-primary">
              +
            </Link>
          </div>
          <button
            type="button"
            onClick={this.deleteTutor.bind(this, tutor._id)}
            className="btn btn-danger ml-4"
          >
            <i className="fas fa-trash-alt" />
          </button>
        </td>
      </tr>
    );

    const guestDashboard = (
      <tr key={tutor._id}>
        <th scope="row">
          <p className="mt-1">
            {tutor.lastName}, {tutor.firstName}
          </p>
        </th>
        <td>
          <p className="mt-1">{tutor.grade}</p>
        </td>
        <td>{tutor.numAbsence}</td>
        <td>
          <p className="mt-1" style={{ display: "inline-block" }}>
            {tutor.numHours}
          </p>
        </td>
        <td>
          {tutor.subjects.length === 0 ? (
            <p className="keepBlock">No subjects</p>
          ) : (
            <p className="keepBlock">
              {tutor.subjects.map(s => `${s.topic}${" "}${s.grade}, `)}
            </p>
          )}
        </td>
        <td />
      </tr>
    );

    return <tbody>{isAuthenticated ? authDashboard : guestDashboard}</tbody>;
  }
}

TutorFeed.propTypes = {
  tutor: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteTutor: PropTypes.func.isRequired,
  addAbsence: PropTypes.func.isRequired,
  addHourTutor: PropTypes.func.isRequired,
  getTutors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  minusAbsence: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deleteTutor, addAbsence, addHourTutor, getTutors, minusAbsence }
)(TutorFeed);
