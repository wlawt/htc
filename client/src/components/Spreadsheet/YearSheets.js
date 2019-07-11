import React, { Component } from "react";
/* import YearFeed from "./YearFeed"; */
import { getTutors } from "../../actions/tutorActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class YearSheets extends Component {
  componentDidMount() {
    this.props.getTutors();
  }

  render() {
    const { year } = this.props;
    /* const { tutors } = this.props.tutor; */

    /*     let tutorContent;
    tutorContent = <YearFeed tutors={tutors} />; */

    return (
      <li className="nav-item">
        <a
          className="nav-link"
          id={`${year}-tab`}
          data-toggle="tab"
          href={`#${year}`}
          role="tab"
          aria-controls={`${year}`}
          aria-selected="true"
        >
          {year}
        </a>
      </li>
    );
  }
}

YearSheets.propTypes = {
  tutor: PropTypes.object.isRequired,
  getTutors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tutor: state.tutor
});

export default connect(
  mapStateToProps,
  { getTutors }
)(YearSheets);
