import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Import helpers
import SelectList from "../common/SelectList";

// Import Actions
import { addSubjectToTutor } from "../../actions/tutorActions";

class AddSubject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayAddSubject: false,
      subject: "",
      grade: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubjectSubmit = this.onSubjectSubmit.bind(this);
    this.onUpdateTutor = this.onUpdateTutor.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubjectSubmit = e => {
    e.preventDefault();

    const tutorData = {
      subject: this.state.subject,
      grade: this.state.grade,
      id: this.props.match.params.id
    };

    this.setState({ displayAddSubject: true });

    this.props.addSubjectToTutor(tutorData);
  };

  onUpdateTutor = e => {
    e.preventDefault();

    this.props.history.push("/spreadsheet");
  };

  render() {
    const subjectOption = [
      { label: "Select Subject", value: "None" },
      { label: "English", value: "English" },
      { label: "French", value: "French" },
      { label: "Math", value: "Math" },
      { label: "Science", value: "Science" },
      { label: "Biology", value: "Biology" },
      { label: "Chemistry", value: "Chemistry" },
      { label: "Physics", value: "Physics" },
      { label: "History", value: "History" },
      { label: "Geography", value: "Geography" },
      { label: "CIVCA", value: "CIVCA" }
    ];

    const gradeOption = [
      { label: "Select Grade", value: "0" },
      { label: "Grade 9", value: "9" },
      { label: "Grade 10", value: "10" },
      { label: "Grade 11", value: "11" },
      { label: "Grade 12", value: "12" }
    ];

    return (
      <div className="container">
        <h1 className="display-4 pt-4 pb-2">Add Subjects</h1>
        <form onSubmit={this.onSubjectSubmit}>
          <div className="form-row">
            <SelectList
              name="subject"
              placeholder="Subjects"
              value={this.state.subject}
              onChange={this.onChange}
              options={subjectOption}
            />

            <SelectList
              name="grade"
              placeholder="grade"
              value={this.state.grade}
              onChange={this.onChange}
              options={gradeOption}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Subject
          </button>
        </form>

        <form className="mt-3" onSubmit={this.onUpdateTutor}>
          <button type="submit" className="btn btn-success">
            Update Tutor Profile
          </button>
        </form>

        {this.state.displayAddSubject ? (
          <div className="mt-4 alert alert-success" role="alert">
            Subject Added!
          </div>
        ) : null}
      </div>
    );
  }
}

AddSubject.propType = {
  tutor: PropTypes.object.isRequired,
  addSubjectToTutor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tutor: state.tutor
});

export default connect(
  mapStateToProps,
  { addSubjectToTutor }
)(withRouter(AddSubject));
