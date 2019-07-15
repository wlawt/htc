import React, { Component } from "react";
import { getTutors } from "../../actions/tutorActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SelectList from "../common/SelectHour";
import { addHourTutor } from "../../actions/tutorActions";

class Log extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hourTimeStart: "",
      minTimeStart: "",
      hourTimeEnd: "",
      minTimeEnd: ""
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getTutors();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCalculateHour = id => {
    const start = `${this.state.hourTimeStart}:${this.state.minTimeStart}`;
    const end = `${this.state.hourTimeEnd}:${this.state.minTimeEnd}`;

    function timeStringToFloat(time) {
      var hoursMinutes = time.split(/[.:]/);
      var hours = parseInt(hoursMinutes[0], 10);
      var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
      return hours + minutes / 60;
    }

    const diff = timeStringToFloat(`${end}`) - timeStringToFloat(`${start}`);

    const data = {
      hour: `${diff.toFixed(2)}`
    };

    this.props.addHourTutor(id, data, this.props.history);
  };

  render() {
    const { tutors } = this.props.tutor;

    const hourTime = [
      { label: "Select", value: "" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" }
    ];

    const minTime = [];
    for (var i = 0; i < 60; i++) {
      if (i === 0) {
        minTime.push({ label: "Select", value: "" });
      } else {
        if (i < 10) {
          minTime.push({ label: `0${i}`, value: `0${i}` });
        } else {
          minTime.push({ label: `${i}`, value: `${i}` });
        }
      }
    }

    let tutorContent;
    if (tutors === null) {
      tutorContent = <h1>Empty!</h1>;
    } else {
      if (tutors.length > 0) {
        tutorContent = tutors.map(tutor => (
          <tr key={tutor._id}>
            <td>
              {tutor.lastName}, {tutor.firstName}
            </td>
            <td>
              <div className="form-row">
                <SelectList
                  name="hourTimeStart"
                  value={this.state.hourTimeStart}
                  onChange={this.onChange}
                  options={hourTime}
                />
                <SelectList
                  name="minTimeStart"
                  value={this.state.minTimeStart}
                  onChange={this.onChange}
                  options={minTime}
                />
              </div>
            </td>
            <td>
              <div className="form-row">
                <SelectList
                  name="hourTimeEnd"
                  value={this.state.hourTimeEnd}
                  onChange={this.onChange}
                  options={hourTime}
                />
                <SelectList
                  name="minTimeEnd"
                  value={this.state.minTimeEnd}
                  onChange={this.onChange}
                  options={minTime}
                />
              </div>
            </td>
            <td>
              <button
                onClick={this.onCalculateHour.bind(this, tutor._id)}
                className="btn btn-success"
              >
                Add
              </button>
            </td>
          </tr>
        ));
      }
    }

    return (
      <div className="container pt-3">
        <h1 className="display-4 pt-5">Sign In/Sign Out</h1>
        <table className="table mt-3">
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Time In</th>
              <th scope="col">Time Out</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{tutorContent}</tbody>
        </table>
      </div>
    );
  }
}

Log.propTypes = {
  getTutors: PropTypes.func.isRequired,
  tutor: PropTypes.object.isRequired,
  addHourTutor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tutor: state.tutor
});

export default connect(
  mapStateToProps,
  { getTutors, addHourTutor }
)(Log);
