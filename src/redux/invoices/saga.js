import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import apiCall from '../../helpers/apiCall';
import { push } from 'connected-react-router';

import {
  getInvoiceDetailFail,
  getInvoiceDetailSuccess,
  getInvoicesFail,
  getInvoicesSuccess,
  updateInvoiceFail,
  updateInvoiceSuccess,
} from './actions';
import { GET_INVOICES, GET_INVOICE_DETAIL, UPDATE_INVOICE } from './constant';

// GET ALL INVOICES
function* getInvoicesSaga() {
  try {
    const { data: response } = yield call(() => apiCall.get('/invoices'));
    yield put(getInvoicesSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = error;
    }
    yield put(getInvoicesFail(message));
  }
}

// GET INVOICE
function* getInvoicesDetailSaga({ payload: id }) {
  try {
    const { data: response } = yield call(() => apiCall.get(`/invoices/${id}`));
    yield put(getInvoiceDetailSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = error;
    }
    yield put(getInvoiceDetailFail(message));
  }
}

// CREATE PATIENT
function* updateInvoiceSaga({ payload }) {
  const { invoiceId: id } = payload;
  try {
    const { data: resonse } = yield call(() => apiCall.put(`/invoices/${id}`, payload));
    yield put(updateInvoiceSuccess(resonse));
    yield put(push('/app/patients'));
  } catch (error) {
    console.log(error);
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = error;
    }
    yield put(updateInvoiceFail(message));
  }
}

export function* watchGetInvoices() {
  yield takeEvery(GET_INVOICES, getInvoicesSaga);
}

export function* watchGetInvoicesDetail() {
  yield takeEvery(GET_INVOICE_DETAIL, getInvoicesDetailSaga);
}

export function* watchUpdateInvoice() {
  yield takeLatest(UPDATE_INVOICE, updateInvoiceSaga);
}

function* invoiceSaga() {
  yield all([call(watchGetInvoices), call(watchGetInvoicesDetail), call(watchUpdateInvoice)]);
}

export default invoiceSaga;
