import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_USER_DETAIL_FAIL,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL,
  ADD_NEW_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "./actionTypes"

/* USER LIST*/
export const getAllUser = page => ({
  type: GET_USER,
  page: page,
})
export const getAllUserSuccess = User => ({
  type: GET_USER_SUCCESS,
  payload: User,
})

export const getAllUserFail = error => ({
  type: GET_USER_FAIL,
  payload: error,
})

/* USER ADD*/
export const addUser = user => ({
  type: ADD_NEW_USER,
  payload: user,
})

export const addNewUserSuccess = user => ({
  type: ADD_USER_SUCCESS,
  payload: user,
})

export const addNewUserFail = error => ({
  type: ADD_USER_FAIL,
  payload: error,
})

/* USER UPDATE*/
export const updateUserDetail = user => ({
  type: UPDATE_USER,
  payload: user,
})

export const updateUserDetailSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
})

export const updateUserDetailFail = error => ({
  type: UPDATE_USER_FAIL,
  payload: error,
})

/* USER DELETE*/
export const deleteUser = user => ({
  type: DELETE_USER,
  payload: user,
})

export const deleteUserSuccess = user => ({
  type: DELETE_USER_SUCCESS,
  payload: user,
})

export const deleteUserFail = error => ({
  type: DELETE_USER_FAIL,
  payload: error,
})

/* USER DETAIL*/
export const getUserDetails = userId => ({
  type: GET_USER_DETAIL,
  userId,
})

export const getUserDetailsSuccess = userDetails => ({
  type: GET_USER_DETAIL_SUCCESS,
  payload: userDetails,
})

export const getUserDetailsFail = error => ({
  type: GET_USER_DETAIL_FAIL,
  payload: error,
})
