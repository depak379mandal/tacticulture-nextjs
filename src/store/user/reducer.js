import { GET_USER_SUCCESS, GET_USER_FAIL } from "./actionTypes"

const INIT_STATE = { user: [], page: "", error: {} }
// const INIT_STATE = { user: [], error: {} }

const users = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.results,
        page: action.payload.next,
      }
    case GET_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default users
