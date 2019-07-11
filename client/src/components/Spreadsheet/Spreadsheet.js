import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
/* import YearItem from "./YearItem"; */
import TutorItem from "./TutorItem";
import { getTutors, deleteAllTutors } from "../../actions/tutorActions";

class Spreadsheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      years: ["2019/2020"],
      years1: ["2019/2020"],
      showDate: true // true == Tuesday || false == Thursday
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    /* 
      Relative year: 2019
      Automation process to create new spreadsheets for each 
      succesive year after 2019. Checks once whenever this
      page is visited. 
    */
    let relativeYear = 2019;
    let currentYear = 2020; /* new Date().getFullYear(); */

    if (relativeYear !== currentYear) {
      let newYearFormat = `${currentYear}/${currentYear + 1}`;
      this.setState({
        years: this.state.years.concat([newYearFormat])
      });
      this.setState({
        years1: this.state.years1.concat([newYearFormat])
      });
    }

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
    const delYear = {
      year: `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`
    };
    this.props.deleteAllTutors(delYear, this.props.history);
    window.location.reload();
  };

  render() {
    const { showDate } = this.state;
    const { tutors } = this.props.tutor;

    /* let yearHeaders;
    yearHeaders = <YearItem years={years} />; */

    let contentForTutors;
    contentForTutors = <TutorItem tutors={tutors} showDate={showDate} />;

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
        <button
          onClick={this.deleteTutors.bind(this)}
          style={{ float: "right" }}
          className="btn btn-danger"
        >
          Delete All Tutors
        </button>
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
              {contentForTutors}
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
