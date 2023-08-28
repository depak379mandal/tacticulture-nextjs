import { call, put, takeEvery } from "redux-saga/effects"
import { GET_NOTIFICATION } from "./actionTypes"
import {
  getNotificationSuccess,
  getNotificationFail,
  getNotification,
} from "./actions"
import { getNotifications } from "../../helpers/fakebackend_helper"

function* fetchNotification() {
  try {
    const response = yield call(getNotifications)
    yield put(getNotificationSuccess(response))
  } catch (error) {
    yield put(getNotificationFail(response))
  }
}

function* notificationSaga() {
  yield takeEvery(GET_NOTIFICATION, fetchNotification)
}

export default notificationSaga
