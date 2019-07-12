const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTutorInputs(data) {
  let errors = {};

  (data.firstName = !isEmpty(data.firstName) ? data.firstName : ""),
    (data.lastName = !isEmpty(data.lastName) ? data.lastName : "");
  data.grade = !isEmpty(data.grade) ? data.grade : "";
  data.available = !isEmpty(data.available) ? data.available : "";

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First name is required";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name is required";
  }

  if (Validator.isEmpty(data.grade)) {
    errors.grade = "Current grade is required";
  }

  if (Validator.isEmpty(data.available)) {
    errors.available = "Availability is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
