import React, { Component } from "react";
import PropTypes from "prop-types";
import SheetsYear from "./YearSheets";

class YearItem extends Component {
  render() {
    const { years } = this.props;

    return years.map(year => <SheetsYear key={year} year={year} />);
  }
}

YearItem.propTypes = {
  years: PropTypes.array.isRequired
};

export default YearItem;
