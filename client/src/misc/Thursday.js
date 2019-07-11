import React, { Component } from "react";
import { Link } from "react-router-dom";

class Thursday extends Component {
  render() {
    return (
      <div className="container pt-3">
        <h1 className="display-4 pb-3">Thursday</h1>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              2018-2019
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              2019-2020
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="contact-tab"
              data-toggle="tab"
              href="#contact"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              2020-2021
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
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
              <tbody>
                <tr>
                  <th scope="row">Rip</th>
                  <td>12</td>
                  <td>3</td>
                  <td>
                    <p>40 Hours</p>
                    <button className="btn btn-success">
                      <i class="fas fa-plus" />
                    </button>
                  </td>
                  <td>Math 12, Physics 12</td>
                  <td>
                    <Link to="#" className="btn btn-danger">
                      <i className="fas fa-trash-alt" />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Pog</th>
                  <td>12</td>
                  <td>3</td>
                  <td>40 hours</td>
                  <td>Math 12, Physics 12</td>
                  <td>
                    <Link to="#" className="btn btn-danger">
                      <i className="fas fa-trash-alt" />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Yeet</th>
                  <td>12</td>
                  <td>3</td>
                  <td>40 hours</td>
                  <td>Math 12, Physics 12</td>
                  <td>
                    <Link to="#" className="btn btn-danger">
                      <i className="fas fa-trash-alt" />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            ...
          </div>
          <div
            className="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            ...
          </div>
        </div>
      </div>
    );
  }
}

export default Thursday;
