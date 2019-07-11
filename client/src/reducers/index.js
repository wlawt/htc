import { combineReducers } from "redux";
import tutorReducer from "./tutorReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  tutor: tutorReducer,
  auth: authReducer,
  errors: errorReducer
});
