import React, { Component } from "react";
import PropTypes from "prop-types";
import TutorList from "./TutorList";

class TutorItem extends Component {
  render() {
    const { tutors } = this.props;

    return tutors.map(tutor => <TutorList key={tutor._id} tutor={tutor} />);
  }
}

TutorItem.propTypes = {
  tutors: PropTypes.array.isRequired
};

export default TutorItem;
