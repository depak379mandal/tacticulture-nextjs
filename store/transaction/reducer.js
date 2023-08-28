import {
  GET_TRANSACTION_SUCCESS,
  GET_TRANSACTION_FAIL,
  GET_TRANSACTION,
} from "./actionTypes"

const INIT_STATE = {
  transaction: [],
  error: {},
  transactionLoading: true,
}

const transactions = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TRANSACTION:
      return {
        ...state,
        transactionLoading: true,
      }
    case GET_TRANSACTION_SUCCESS:
      return {
        ...state,
        transaction: action.payload,
        transactionLoading: false,
      }

    case GET_TRANSACTION_FAIL:
      return {
        ...state,
        error: action.payload,
        transactionLoading: false,
      }
    default:
      return state
  }
}

export default transactions
