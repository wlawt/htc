import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TutorItem from "./TutorItem";
import { getTutors, deleteAllTutors } from "../../actions/tutorActions";

class Spreadsheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDate: true // true == Tuesday || false == Thursday
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getTutors();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeDate = e => {
    e.preventDefault();

    // Toggles state
    this.setState({ showDate: !this.state.showDate });
  };

  deleteTutors = () => {
    alert("Are you sure? This action cannot be undone.");

    this.props.deleteAllTutors(this.props.history);
    window.location.reload();
  };

  render() {
    const { showDate } = this.state;
    const { tutors, loading } = this.props.tutor;
    const { isAuthenticated } = this.props.auth;
    let contentForTutors;

    if (tutors === null || loading) {
      contentForTutors = (
        <td>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </td>
      );
    } else {
      contentForTutors = <TutorItem tutors={tutors} showDate={showDate} />;
    }

    const authPerms = (
      <button
        onClick={this.deleteTutors.bind(this)}
        style={{ float: "right" }}
        className="btn btn-danger"
      >
        Delete All Tutors
      </button>
    );

    return (
      <div className="container pt-3">
        <h1 className="display-4 pb-3">{showDate ? "Tuesday" : "Thursday"}</h1>
        <button
          type="button"
          onClick={this.changeDate.bind(this)}
          className="btn btn-outline-primary"
        >
          {/* Show opposite state to toggle */}
          Show {showDate ? "Thursday" : "Tuesday"}
        </button>
        {isAuthenticated ? authPerms : ""}
        <div className="pt-4">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link"
                id={`home-tab`}
                data-toggle="tab"
                href={`#home`}
                role="tab"
                aria-controls={`home`}
                aria-selected="true"
              >
                {`${new Date().getFullYear()}/${new Date().getFullYear() + 1}`}
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
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

              {contentForTutors.props.tutors.length === 0 ? (
                <p>Empty!</p>
              ) : (
                contentForTutors
              )}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

Spreadsheet.propTypes = {
  auth: PropTypes.object.isRequired,
  tutor: PropTypes.object.isRequired,
  getTutors: PropTypes.func.isRequired,
  deleteAllTutors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  tutor: state.tutor,
  years: state.years
});

export default connect(
  mapStateToProps,
  { getTutors, deleteAllTutors }
)(Spreadsheet);
