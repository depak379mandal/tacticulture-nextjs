import {
  GET_NOTIFICATION,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_FAIL,
} from "./actionTypes"

export const getNotification = () => ({
  type: GET_NOTIFICATION,
})
export const getNotificationSuccess = notification => ({
  type: GET_NOTIFICATION_SUCCESS,
  payload: notification,
})
export const getNotificationFail = error => ({
  type: GET_NOTIFICATION_FAIL,
  payload: error,
})
