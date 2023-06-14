import {
  API_SUCCESS,
  API_FAIL,
  GET_CHARTS_DATA,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAIL,
  GET_DASHBOARD,
  CHART_SUCCESS,
  CHART_FAIL,
  GET_MONTHLY_CHART,
} from "./actionTypes"

export const chartSuccess = (actionType, data) => ({
  type: CHART_SUCCESS,
  payload: { actionType, data },
})

export const chartFail = (actionType, error) => ({
  type: CHART_FAIL,
  payload: { actionType, error },
})

export const getMonthlyChart = () => ({
  type: GET_MONTHLY_CHART,
})

export const apiSuccess = (actionType, data) => ({
  type: API_SUCCESS,
  payload: { actionType, data },
})

export const apiFail = (actionType, error) => ({
  type: API_FAIL,
  payload: { actionType, error },
})

// charts data
export const getChartsData = periodType => ({
  type: GET_CHARTS_DATA,
  payload: periodType,
})

// Dashboard data
export const getDashboardData = () => ({
  type: GET_DASHBOARD,
})

export const dashboardSuccess = (actionType, data) => ({
  type: DASHBOARD_SUCCESS,
  payload: { actionType, data },
})

export const dashboardFail = (actionType, error) => ({
  type: DASHBOARD_FAIL,
  payload: { actionType, error },
})
