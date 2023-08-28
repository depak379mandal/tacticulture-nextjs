import {
  GET_ROADMAP,
  GET_ROADMAP_SUCCESS,
  GET_ROADMAP_FAIL,
} from "./actionTypes"

export const getRoadmap = () => ({
  type: GET_ROADMAP,
})

export const getRoadmapSuccess = roadmap => ({
  type: GET_ROADMAP_SUCCESS,
  payload: roadmap,
})

export const getRoadmapFail = error => ({
  type: GET_ROADMAP_FAIL,
  payload: error,
})
