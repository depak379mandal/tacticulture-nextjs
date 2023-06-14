import { call, put, takeEvery } from "redux-saga/effects"
import { getAllUsers } from "../../helpers/users/backend_helper"
import { GET_USER } from "./actionTypes"
import { getAllUserFail, getAllUserSuccess } from "./action"
import axios from "axios"

function* fetchTacticultureUser(page) {
  try {
    const response = yield call(getAllUsers, page)
    console.log(response)
    yield put(getAllUserSuccess(response))
  } catch (error) {
    yield put(getAllUserFail(error))
  }
}

function* tacticultureUserSaga() {
  yield takeEvery(GET_USER, fetchTacticultureUser)
}

export default tacticultureUserSaga
