import { GET_EVENT, GET_EVENT_SUCCESS, GET_EVENT_FAIL } from "./actionTypes"

export const getEvent = page => ({
  type: GET_EVENT,
  page,
})
export const getEventSuccess = Event => ({
  type: GET_EVENT_SUCCESS,
  payload: Event,
})

export const getEventFail = error => ({
  type: GET_EVENT_FAIL,
  payload: error,
})
