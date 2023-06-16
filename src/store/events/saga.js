import { call, put, takeEvery } from "redux-saga/effects"
import { getEvents } from "../../helpers/events/backend_helper"
import { GET_EVENT } from "./actionTypes"
import { getEventFail, getEventSuccess } from "./actions"

function* fetchTacticultureEvent(page) {
  try {
    const response = yield call(getEvents, page.page)
    yield put(getEventSuccess(response))
  } catch (error) {
    yield put(getEventFail(error))
  }
}

function* tacticultureEventSaga() {
  yield takeEvery(GET_EVENT, fetchTacticultureEvent)
}

export default tacticultureEventSaga
