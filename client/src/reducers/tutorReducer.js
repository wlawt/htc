import { ADD_POST, GET_TUTORS, TUTOR_LOADING } from "../actions/types";

const initalState = {
  subjects: [],
  tutors: [],
  tutor: {},
  tutorYear: [],
  loading: false
};

export default function(state = initalState, action) {
  switch (action.type) {
    case TUTOR_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_POST:
      return {
        ...state,
        subjects: [action.payload, ...state.subjects]
      };
    case GET_TUTORS:
      return {
        ...state,
        tutors: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
