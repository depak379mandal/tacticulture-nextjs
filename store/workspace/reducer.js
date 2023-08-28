import { GET_WORKSPACE_SUCCESS, GET_WORKSPACE_FAIL } from "./actionTypes"

const INIT_STATE = {
  workspace: [],
  error: {},
}

const workspaces = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_WORKSPACE_SUCCESS:
      return {
        ...state,
        workspace: action.payload,
      }

    case GET_WORKSPACE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default workspaces
