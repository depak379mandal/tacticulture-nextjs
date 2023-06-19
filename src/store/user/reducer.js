import {
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "./actionTypes"

const INIT_STATE = { user: [], next: "", prev: "", error: {} }

const users = (state = INIT_STATE, action) => {
  console.log(action)
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
    case GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        userDetail: action.payload,
      }
    case GET_USER_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case ADD_USER_SUCCESS:
      return {
        ...state,
        user: [...state.user, action.payload],
      }
    case ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map(user =>
          user.id.toString() === action.user.id.toString()
            ? { user, ...action.payload }
            : user
        ),
      }

    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default users
