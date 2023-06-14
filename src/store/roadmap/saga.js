import { call, put, takeEvery } from "redux-saga/effects"
import { getRoadmaps } from "../../helpers/fakebackend_helper"
import { GET_ROADMAP } from "./actionTypes"
import { getRoadmapFail, getRoadmapSuccess } from "./action"

function* fetchRoadmap() {
  try {
    const response = yield call(getRoadmaps)
    console.log(response)
    yield put(getRoadmapSuccess(response))
  } catch (error) {
    console.log(errror)
    yield put(getRoadmapFail(error))
  }
}

function* roadmapSaga() {
  yield takeEvery(GET_ROADMAP, fetchRoadmap)
}

export default roadmapSaga
