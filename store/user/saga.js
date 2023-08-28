import { call, put, takeEvery } from "redux-saga/effects"
import {
  getAllUsers,
  getUserDetail,
  addNewUser,
  updateUsers,
  deleteUsers,
} from "../../helpers/users/backend_helper"
import {
  ADD_NEW_USER,
  DELETE_USER,
  GET_USER,
  GET_USER_DETAIL,
  UPDATE_USER,
} from "./actionTypes"
import {
  addNewUserFail,
  addNewUserSuccess,
  getAllUserFail,
  getAllUserSuccess,
  getUserDetailsFail,
  getUserDetailsSuccess,
  updateUserDetailSuccess,
  updateUserDetailFail,
  deleteUserSuccess,
  deleteUserFail,
} from "./action"

function* fetchTacticultureUser(page) {
  try {
    const response = yield call(getAllUsers, page.page)
    yield put(getAllUserSuccess(response))
  } catch (error) {
    yield put(getAllUserFail(error))
  }
}

function* fetchTacticultureUserDetail({ userId }) {
  try {
    const response = yield call(getUserDetail, userId)
    yield put(getUserDetailsSuccess(response))
  } catch (error) {
    yield put(getUserDetailsFail(error))
  }
}

function* tacticulturAddNewUser({ payload: user }) {
  try {
    const response = yield call(addNewUser, user)
    yield put(addNewUserSuccess(response))
  } catch (error) {
    yield put(addNewUserFail(error))
  }
}

function* tacticultureUpdateUser({ payload: user }) {
  try {
    const response = yield call(updateUsers, user)

    yield put(updateUserDetailSuccess(response))
  } catch (error) {
    yield put(updateUserDetailFail(error))
  }
}
function* tacticultureDeleteProject({ payload: user }) {
  try {
    const response = yield call(deleteUsers, user)
    yield put(deleteUserSuccess(response))
  } catch (error) {
    yield put(deleteUserFail(error))
  }
}
function* tacticultureUserSaga() {
  yield takeEvery(GET_USER, fetchTacticultureUser)
  yield takeEvery(GET_USER_DETAIL, fetchTacticultureUserDetail)
  yield takeEvery(ADD_NEW_USER, tacticulturAddNewUser)
  yield takeEvery(UPDATE_USER, tacticultureUpdateUser)
  yield takeEvery(DELETE_USER, tacticultureDeleteProject)

}

export default tacticultureUserSaga
