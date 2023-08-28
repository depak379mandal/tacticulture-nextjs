import { GET_ROADMAP_SUCCESS, GET_ROADMAP_FAIL } from "./actionTypes"

const INIT_STATE = { roadmaps: [], error: {} }

const roadmaps = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ROADMAP_SUCCESS:
      return {
        ...state,
        roadmaps: action.payload,
      }
    case GET_ROADMAP_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default roadmaps
