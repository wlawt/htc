import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTutors } from "../../actions/tutorActions";
import TutorItem from "./TutorItem";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getTutors();
  }

  render() {
    const { tutors } = this.props.tutor;

    let tutorContent;
    tutorContent = <TutorItem tutors={tutors} />;

    return (
      <div className="container pt-3" style={{ paddingBottom: "125px" }}>
        <h1 className="display-4 pt-2">Tutors</h1>
        {tutorContent}
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  tutor: PropTypes.object.isRequired,
  getTutors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  tutor: state.tutor
});

export default connect(
  mapStateToProps,
  { getTutors }
)(Dashboard);
