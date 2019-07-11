import React, { Component } from "react";
import PropTypes from "prop-types";
import TutorFeed from "./TutorFeed";

class TutorItem extends Component {
  render() {
    const { tutors, showDate } = this.props;

    let feed = [];
    if (showDate) {
      tutors.map(tutor => {
        if (tutor.available === "TUESDAY" || tutor.available === "BOTH") {
          feed.push(<TutorFeed key={tutor._id} tutor={tutor} />);
        }
      });
    } else {
      tutors.map(tutor => {
        if (tutor.available === "THURSDAY" || tutor.available === "BOTH") {
          feed.push(<TutorFeed key={tutor._id} tutor={tutor} />);
        }
      });
    }

    return feed;
  }
}

TutorItem.propTypes = {
  tutors: PropTypes.array.isRequired,
  showDate: PropTypes.bool.isRequired
};

export default TutorItem;
