import { GET_EVENT_SUCCESS, GET_EVENT_FAIL } from "./actionTypes"

const INIT_STATE = { event: [], error: {} }

const events = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EVENT_SUCCESS:
      return {
        ...state,
        event: action.payload.results,
      }
    case GET_EVENT_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default events
