import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  GET_TUTORS,
  GET_TUTOR_YEAR
  /* GET_TUTOR */
} from "./types";

// Add tutor to database
export const addTutor = (createTutor, history) => dispatch => {
  axios
    .post("/api/tutor/register", createTutor)
    .then(res => history.push("/spreadsheet"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Tutor Subject
export const addSubjectToTutor = tutorData => dispatch => {
  axios
    .post(`/api/tutor/subject/${tutorData.id}`, tutorData)
    .then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all tutors
export const getTutors = () => dispatch => {
  axios
    .get("/api/tutor")
    .then(res =>
      dispatch({
        type: GET_TUTORS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: ""
      })
    );
};

// Get tutor by year
export const getTutorByYear = () => dispatch => {
  axios
    .get("/api/tutor/year")
    .then(res =>
      dispatch({
        type: GET_TUTOR_YEAR,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add one absence
export const addAbsence = (id, history) => dispatch => {
  axios
    .post(`/api/tutor/absence/${id}`)
    .then(res => history.push("/spreadsheet"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: ""
      })
    );
};

// Add hours for tutor
export const addHourTutor = (id, tutorData, history) => dispatch => {
  axios
    .post(`/api/tutor/hour/${id}`, tutorData)
    .then(res => history.push("/spreadsheet"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: ""
      })
    );
};

export const createSubject = (subjectData, history) => dispatch => {
  axios
    .post("/api/course", subjectData)
    .then(res => history.push("/subjects"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete tutor from spreadsheet
export const deleteTutor = (id, history) => dispatch => {
  axios
    .delete(`/api/tutor/${id}`)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete all tutors
export const deleteAllTutors = (delYear, history) => dispatch => {
  axios
    .delete("/api/tutor/delTutors", delYear)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
