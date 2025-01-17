import { all } from "redux-saga/effects";

import profileSaga from "./profileSaga";
import employeeSaga from "./employeeSaga";
import distributionSaga from "./distributionSaga";
import proofSaga from "./proofSaga";
import routesheetSaga from "./routesheetSaga";
import assignmentSaga from "./assignmentSaga";
export function* rootSaga() {
  yield all([
    profileSaga(),
    employeeSaga(),
    distributionSaga(),
    proofSaga(),
    routesheetSaga(),
    assignmentSaga(),
  ]);
}
