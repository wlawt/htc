import React, { Component } from "react";
import TutorFeed from "./TutorItem";
import { getTutors } from "../actions/tutorActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class TutorSheets extends Component {
  componentDidMount() {
    this.props.getTutors();
  }

  render() {
    const { year } = this.props;
    const { tutors } = this.props.tutor;

    let tutorContent;
    tutorContent = <TutorFeed tutors={tutors} />;

    return (
      <div
        className="tab-pane fade show active"
        id={`${year}`}
        role="tabpanel"
        aria-labelledby={`${year}-tab`}
      >
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Grade</th>
              <th scope="col">Absence</th>
              <th scope="col">No. of Hours</th>
              <th scope="col">Subjects</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{tutorContent}</tbody>
        </table>
      </div>
    );
  }
}

TutorSheets.propTypes = {
  tutor: PropTypes.object.isRequired,
  getTutors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tutor: state.tutor
});

export default connect(
  mapStateToProps,
  { getTutors }
)(TutorSheets);
