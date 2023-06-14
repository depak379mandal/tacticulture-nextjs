import { GET_NOTIFICATION_SUCCESS, GET_NOTIFICATION_FAIL } from "./actionTypes"

const INIT_STATE = {
  notification: [],
  error: {},
}

const notifications = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notification: action.payload,
      }
    case GET_NOTIFICATION_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default notifications
