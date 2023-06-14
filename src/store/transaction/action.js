import {
  GET_TRANSACTION,
  GET_TRANSACTION_SUCCESS,
  GET_TRANSACTION_FAIL,
} from "./actionTypes"

export const getTransaction = page => ({
  type: GET_TRANSACTION,
  page,
})

export const getTransactionSuccess = transaction => ({
  type: GET_TRANSACTION_SUCCESS,
  payload: transaction,
})

export const getTransactionFail = error => ({
  type: GET_TRANSACTION_FAIL,
  payload: error,
})
