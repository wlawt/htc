import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer id="page-footer" className="mt-5 pt-5 py-4 bg-light">
        <div className="container text-center">
          <h3>Harbord Tutoring Club</h3>

          <p className="text-muted">
            Est. &copy;{" "}
            {new Date().getFullYear() === 2019
              ? new Date().getFullYear()
              : "2019 - " + new Date().getFullYear()}
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
