import { call, put, takeEvery } from "redux-saga/effects"
import { GET_WORKSPACE } from "./actionTypes"
import { getWorkspaces } from "../../helpers/fakebackend_helper"
import { getWorkspaceFail, getWorkspaceSuccess } from "./actions"

function* fetchWorkspace() {
  try {
    const response = yield call(getWorkspaces)
    // console.log(response, "work resp")
    yield put(getWorkspaceSuccess(response))
  } catch (error) {
    console.log(error, "work error")
    yield put(getWorkspaceFail(error))
  }
}

function* workspaceSaga() {
  yield takeEvery(GET_WORKSPACE, fetchWorkspace)
}

export default workspaceSaga
