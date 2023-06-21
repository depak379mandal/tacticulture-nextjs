import { call, put, takeEvery } from "redux-saga/effects"
import {
  getEvents,
  getEventCategories,
} from "../../helpers/events/backend_helper"
import { GET_EVENT, GET_EVENT_CATEGORY } from "./actionTypes"
import {
  getEventCategoryFail,
  getEventCategorySuccess,
  getEventFail,
  getEventSuccess,
} from "./actions"

function* fetchTacticultureEvent(page) {
  try {
    const response = yield call(getEvents, page.page)
    yield put(getEventSuccess(response))
  } catch (error) {
    yield put(getEventFail(error))
  }
}
function* fetchTacticultureEventCategory() {
  try {
    const response = yield call(getEventCategories)
    yield put(getEventCategorySuccess(response))
  } catch (error) {
    yield put(getEventCategoryFail(error))
  }
}

function* tacticultureEventSaga() {
  yield takeEvery(GET_EVENT, fetchTacticultureEvent)
  yield takeEvery(GET_EVENT_CATEGORY, fetchTacticultureEventCategory)
}

export default tacticultureEventSaga
