import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { CREATE_EMPLOYEES, GET_EMPLOYEES } from './constant';
import apiCall from '../../helpers/apiCall';
import { createEmployeesFail, createEmployeesSuccess, getEmployeesFail, getEmployeesSuccess } from './actions';

function* getEmployeesSaga() {
  try {
    const { data: response } = yield call(() => apiCall.get('/employees'));
    yield put(getEmployeesSuccess(response));
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
    yield put(getEmployeesFail(message));
  }
}

function* createEmployeesaga() {
  try {
    const { data: resonse } = yield call(() => apiCall.post('/employees'));
    yield put(createEmployeesSuccess(resonse));
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
    yield put(createEmployeesFail(message));
  }
}

export function* watchGetEmployees() {
  yield takeEvery(GET_EMPLOYEES, getEmployeesSaga);
}
export function* watchCreateEmployees() {
  yield takeEvery(CREATE_EMPLOYEES, createEmployeesaga);
}

function* EmployeeSaga() {
  yield all([fork(watchGetEmployees,watchCreateEmployees)]);
}

export default EmployeeSaga;
