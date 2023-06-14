import { call, put, takeEvery } from "redux-saga/effects"
import { GET_TRANSACTION } from "./actionTypes"
import { getTransactions } from "../../helpers/fakebackend_helper"
import { getTransactionFail, getTransactionSuccess } from "./action"

function* fetchTransaction({ page }) {
  console.log(page, "page")
  try {
    const response = yield call(getTransactions, page)
    // console.log(page)
    console.log(response, "getTransaction response")
    yield put(getTransactionSuccess(response))
  } catch (error) {
    console.log("getTransactionError", error)
    yield put(getTransactionFail(response))
  }
}

function* transactionSaga() {
  yield takeEvery(GET_TRANSACTION, fetchTransaction)
}

export default transactionSaga
