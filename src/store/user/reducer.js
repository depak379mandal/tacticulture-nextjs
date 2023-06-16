import { GET_USER_SUCCESS, GET_USER_FAIL } from "./actionTypes"

const INIT_STATE = { user: [], next: "", prev: "", error: {} }
// const INIT_STATE = { user: [], error: {} }

const users = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.results,
        next: action.payload.next,
        prev: action.payload.previous,
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
