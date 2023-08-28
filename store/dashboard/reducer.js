import {
  API_SUCCESS,
  API_FAIL,
  GET_CHARTS_DATA,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAIL,
  GET_DASHBOARD,
  GET_MONTHLY_CHART,
  CHART_SUCCESS,
  CHART_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  chartsData: [],
  dashboardData: [],
  dashboardDataError: {},
  monthlyChart: [],
}

const Dashboard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_SUCCESS:
      switch (action.payload.actionType) {
        case GET_CHARTS_DATA:
          return {
            ...state,
            chartsData: action.payload.data,
          }
        default:
          return state
      }
    case API_FAIL:
      switch (action.payload.actionType) {
        case GET_CHARTS_DATA:
          return {
            ...state,
            chartsDataError: action.payload.error,
          }

        default:
          return state
      }
    case DASHBOARD_SUCCESS:
      switch (action.payload.actionType) {
        case GET_DASHBOARD:
          return {
            ...state,
            dashboardData: action.payload.data,
          }
      }

    case DASHBOARD_FAIL:
      switch (action.payload.actionType) {
        case GET_DASHBOARD:
          return {
            ...state,
            dashboardDataError: action.payload.error,
          }
      }

    case CHART_SUCCESS:
      switch (action.payload.actionType) {
        case GET_MONTHLY_CHART:
          return {
            ...state,
            monthlyChart: action.payload.data,
          }
      }
    case CHART_FAIL:
      switch (action.payload.actionType) {
        case GET_MONTHLY_CHART:
          return {
            ...state,
            dashboardDataError: action.payload.error,
          }
      }
    default:
      return state
  }
}

export default Dashboard
