import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const InputGroup = ({
  types,
  id,
  name,
  placeholder,
  value,
  error,
  forAttr,
  title,
  onChange,
  divClass
}) => {
  return (
    <div className={divClass}>
      <label htmlFor={forAttr}>{title}</label>
      <input
        type={types}
        className={classnames("form-control", {
          "is-invalid": error
        })}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  types: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  forAttr: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
