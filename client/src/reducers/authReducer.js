import { SET_CURRENT_USER, CLEAR_ADMIN } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload), // Depends if the payload is empty or not
        user: action.payload
      };
    case CLEAR_ADMIN:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
