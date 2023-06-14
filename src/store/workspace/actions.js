import {
  GET_WORKSPACE,
  GET_WORKSPACE_SUCCESS,
  GET_WORKSPACE_FAIL,
} from "./actionTypes"

export const getWorkspace = () => ({
  type: GET_WORKSPACE,
})

export const getWorkspaceSuccess = workspace => ({
  type: GET_WORKSPACE_SUCCESS,
  payload: workspace,
})

export const getWorkspaceFail = error => ({
  type: GET_WORKSPACE_FAIL,
  payload: error,
})
