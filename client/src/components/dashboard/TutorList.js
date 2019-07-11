import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class TutorList extends Component {
  render() {
    const { tutor } = this.props;

    return (
      <div className="container pt-1">
        {tutor.year ===
        `${new Date().getFullYear()}/${new Date().getFullYear() + 1}` ? (
          <div className="card">
            <div className="card-body">
              {tutor.lastName}
              {", "}
              {tutor.firstName}
            </div>
          </div>
        ) : (
          <p className="lead">
            No tutors this year,{" "}
            <Link to="/registerTutor">Register one now!</Link>
          </p>
        )}
      </div>
    );
  }
}

TutorList.propTypes = {
  tutor: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(TutorList);
