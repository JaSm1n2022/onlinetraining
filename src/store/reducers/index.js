import { combineReducers } from "redux";

import profileReducer from "./profile";
import employeeReducer from "./employee";
import distributionReducer from "./distribution";
import proofReducer from "./proof";
import routesheetReducer from "./routesheet";
import assignmentReducer from "./assignment";
export default combineReducers({
  profile: profileReducer,
  employee: employeeReducer,
  distribution: distributionReducer,
  proof: proofReducer,
  routesheet: routesheetReducer,
  assignment: assignmentReducer,
});
