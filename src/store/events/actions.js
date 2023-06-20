import {
  GET_EVENT,
  GET_EVENT_SUCCESS,
  GET_EVENT_FAIL,
  GET_EVENT_CATEGORY,
  GET_EVENT_CATEGORY_SUCCESS,
  GET_EVENT_CATEGORY_FAIL,
} from "./actionTypes"

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

export const getEventCategory = () => ({
  type: GET_EVENT_CATEGORY,
})
export const getEventCategorySuccess = Category => ({
  type: GET_EVENT_CATEGORY_SUCCESS,
  payload: Category,
})

export const getEventCategoryFail = error => ({
  type: GET_EVENT_CATEGORY_FAIL,
  payload: error,
})
