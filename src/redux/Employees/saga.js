import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { CREATE_EMPLOYEES, DELETE_EMPLOYEES, GET_EMPLOYEES, GET_EMPLOYEE_DETAIL, UPDATE_EMPLOYEE } from './constant';
import apiCall from '../../helpers/apiCall';
import {
  createEmployeesFail,
  createEmployeesSuccess,
  deleteEmployeesFail,
  deleteEmployeesSuccess,
  getEmployeeDetailFail,
  getEmployeeDetailSuccess,
  getEmployeesFail,
  getEmployeesSuccess,
  updateEmployeeFail,
  updateEmployeeSuccess,
} from './actions';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

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
// GET EMPLOYEES DETAIL
function* getEmployeeDetailSaga({ payload: id }) {
  try {
    const { data: response } = yield call(() => apiCall.get(`/Employees/${id}`));
    yield put(getEmployeeDetailSuccess(response));
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
    yield put(getEmployeeDetailFail(message));
  }
}

function* createEmployeeSaga({ payload }) {
  try {
    const { data: resonse } = yield call(() => apiCall.post('/employees', payload));
    yield put(createEmployeesSuccess(resonse));
    yield put(push('/app/employees'));
    toast.success('Thêm thành công nhân viên mới');
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
//update employee
function* updateEmployeeSaga({ payload }) {
  const { employeeId: id } = payload;
  try {
    const { data: resonse } = yield call(() => apiCall.put(`/employees/${id}`, payload));
    yield put(updateEmployeeSuccess(resonse));
    yield put(push('/app/employees'));
    toast.success('Cập nhật thành công thông tin nhân viên');
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
    yield put(updateEmployeeFail(message));
    toast.error('Không thể cập nhật thông tin nhân viên');
  }
}
// DELETE Employee
function* deleteEmployeeSaga({ payload: id }) {
  try {
    yield call(() => apiCall.delete(`/employees/${id}`));
    toast.success('Xóa thành công nhân viên!');
    yield put(deleteEmployeesSuccess(id));
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
    toast.error('Không thể xóa nhân viên này!');
    yield put(deleteEmployeesFail(message));
  }
}
export function* watchGetEmployees() {
  yield takeEvery(GET_EMPLOYEES, getEmployeesSaga);
}
export function* watchGetEmployeeDetail() {
  yield takeEvery(GET_EMPLOYEE_DETAIL, getEmployeeDetailSaga);
}
export function* watchCreateEmployees() {
  yield takeEvery(CREATE_EMPLOYEES, createEmployeeSaga);
}
export function* watchUpdateEmployee() {
  yield takeLatest(UPDATE_EMPLOYEE, updateEmployeeSaga);
}
export function* watchDeleteEmployee() {
  yield takeLatest(DELETE_EMPLOYEES, deleteEmployeeSaga);
}

function* EmployeeSaga() {
  yield all([
    call(watchGetEmployees),
    call(watchGetEmployeeDetail),
    call(watchCreateEmployees),
    call(watchUpdateEmployee),
    call(watchDeleteEmployee),
  ]);
}

export default EmployeeSaga;
