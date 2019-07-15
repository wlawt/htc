import React from "react";
import PropTypes from "prop-types";

const SelectList = ({ name, value, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        className="form-control"
        value={value}
        onChange={onChange}
        name={name}
      >
        {selectOptions}
      </select>
    </div>
  );
};

SelectList.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectList;
