import { call, put, takeEvery, all, fork } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_CHARTS_DATA,
  GET_DASHBOARD,
  GET_MONTHLY_CHART,
} from "./actionTypes"
import {
  apiSuccess,
  apiFail,
  dashboardSuccess,
  dashboardFail,
  chartFail,
  chartSuccess,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getWeeklyData,
  getYearlyData,
  getMonthlyData,
  getDashboardRecord,
  getMonthlyChartRecord,
} from "../../helpers/fakebackend_helper"

function* getChartsData({ payload: periodType }) {
  try {
    var response
    if (periodType == "monthly") {
      response = yield call(getWeeklyData, periodType)
    }
    if (periodType == "yearly") {
      response = yield call(getYearlyData, periodType)
    }
    if (periodType == "weekly") {
      response = yield call(getMonthlyData, periodType)
    }

    yield put(apiSuccess(GET_CHARTS_DATA, response))
  } catch (error) {
    yield put(apiFail(GET_CHARTS_DATA, error))
  }
}

function* getDashboardData() {
  try {
    const response = yield call(getDashboardRecord)
    // console.log(response, "dashboard respo")
    yield put(dashboardSuccess(GET_DASHBOARD, response))
  } catch (error) {
    // console.log(error, "dahsboard error")
    yield put(dashboardFail(GET_DASHBOARD, error))
  }
}

function* getMonthlyChart() {
  try {
    const response = yield call(getMonthlyChartRecord)

    yield put(chartSuccess(GET_MONTHLY_CHART, response))
  } catch (error) {
    yield put(chartFail(GET_MONTHLY_CHART, error))
  }
}

export function* watchGetChartsData() {
  yield takeEvery(GET_CHARTS_DATA, getChartsData)
  yield takeEvery(GET_DASHBOARD, getDashboardData)
  yield takeEvery(GET_MONTHLY_CHART, getMonthlyChart)
}

function* dashboardSaga() {
  yield all([fork(watchGetChartsData)])
}

export default dashboardSaga
