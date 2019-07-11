import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { createSubject } from "../../actions/tutorActions";

class SubjectsOffered extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const subjectData = {
      course: this.state.course
    };

    this.props.createSubject(subjectData, this.props.history);
    //window.location.reload();
  };

  render() {
    return (
      <div className="container" style={{ marginBottom: "375px" }}>
        <h2 className="display-4 pt-4">Add a new course</h2>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="courseInput">Course</label>
            <input
              type="text"
              className="form-control"
              id="courseInput"
              placeholder="Enter Course Name: Ex. Astronomy"
              name="course"
              onChange={this.onChange}
              value={this.state.course}
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary mt-3"
            />
          </div>
        </form>

        <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div>
  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
  <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
</div>
      </div>
    );
  }
}

SubjectsOffered.propTypes = {
  createSubject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createSubject }
)(SubjectsOffered);
