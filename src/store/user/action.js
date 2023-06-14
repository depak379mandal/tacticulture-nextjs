import { GET_USER, GET_USER_SUCCESS, GET_USER_FAIL } from "./actionTypes"

// export const getAllUser = page => ({
//   type: GET_USER,
//   page,
// })
export const getAllUser = page => ({
  type: GET_USER,
  page,
})
export const getAllUserSuccess = User => ({
  type: GET_USER_SUCCESS,
  payload: User,
})

export const getAllUserFail = error => ({
  type: GET_USER_FAIL,
  payload: error,
})
