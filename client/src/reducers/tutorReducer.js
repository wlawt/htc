import {
  ADD_POST,
  GET_TUTORS,
  /* GET_TUTOR */
  GET_TUTOR_YEAR
} from "../actions/types";

const initalState = {
  subjects: [],
  tutors: [],
  tutor: {},
  tutorYear: []
};

export default function(state = initalState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        subjects: [action.payload, ...state.subjects]
      };
    case GET_TUTORS:
      return {
        ...state,
        tutors: action.payload
      };
    /*     case GET_TUTOR:
      return {
        ...state,
        tutor: action.payload
      }; */
    case GET_TUTOR_YEAR:
      return {
        ...state,
        tutorYear: action.payload
      };
    default:
      return state;
  }
}
