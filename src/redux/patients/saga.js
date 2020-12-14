import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { CREATE_PATIENTS, DELETE_PATIENTS, GET_PATIENTS, GET_PATIENT_DETAIL, UPDATE_PATIENT } from './constant';
import apiCall from '../../helpers/apiCall';
import {
  createPatientsFail,
  createPatientsSuccess,
  deletePatientsFail,
  deletePatientsSuccess,
  getPatientDetailFail,
  getPatientDetailSuccess,
  getPatientsFail,
  getPatientsSuccess,
  updatePatientFail,
  updatePatientSuccess,
} from './actions';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

// GET ALL PATIENTS
function* getPatientsSaga() {
  try {
    const { data: response } = yield call(() => apiCall.get('/patients'));
    yield put(getPatientsSuccess(response));
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
    yield put(getPatientsFail(message));
  }
}

// GET PATIENT
function* getPatientDetailSaga({ payload: id }) {
  try {
    const { data: response } = yield call(() => apiCall.get(`/patients/${id}`));
    yield put(getPatientDetailSuccess(response));
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
    yield put(getPatientDetailFail(message));
  }
}

// CREATE PATIENT
function* createPatientSaga({ payload }) {
  console.log('call 1 lan ');
  try {
    const { data: resonse } = yield call(() => apiCall.post('/patients', payload));
    yield put(createPatientsSuccess(resonse));
    yield put(push('/app/patients'));
    toast.success('Thêm thành công bệnh nhân mới');
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
    yield put(createPatientsFail(message));
  }
}

// CREATE PATIENT
function* updatePatientSaga({ payload }) {
  const { patientId: id } = payload;
  try {
    const { data: resonse } = yield call(() => apiCall.put(`/patients/${id}`, payload));
    yield put(updatePatientSuccess(resonse));
    yield put(push('/app/patients'));
    toast.success('Cập nhật thành công thông tin bệnh nhân');
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
    yield put(updatePatientFail(message));
    toast.error('Không thể cập nhật thông tin bệnh nhân');
  }
}

// DELETE PATIENT
function* deletePatientSaga({ payload: id }) {
  try {
<<<<<<< HEAD
yield call(() => apiCall.delete(`/patients/${id}`));
=======
    yield call(() => apiCall.delete(`/patients/${id}`));
    toast.success('Xóa thành công bệnh nhân!');
>>>>>>> e1a52b2fa0209217ec5395234de5d96598553131
    yield put(deletePatientsSuccess(id));
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
    toast.error('Không thể xóa bệnh nhân này!');
    yield put(deletePatientsFail(message));
  }
}

export function* watchGetPatients() {
  yield takeEvery(GET_PATIENTS, getPatientsSaga);
}

export function* watchGetPatientDetail() {
  yield takeEvery(GET_PATIENT_DETAIL, getPatientDetailSaga);
}

export function* watchCreatePatients() {
  yield takeLatest(CREATE_PATIENTS, createPatientSaga);
}
export function* watchUpdatePatient() {
  yield takeLatest(UPDATE_PATIENT, updatePatientSaga);
}
export function* watchDeletePatients() {
  yield takeLatest(DELETE_PATIENTS, deletePatientSaga);
}

function* patientSaga() {
  yield all([
    call(watchGetPatients),
    call(watchGetPatientDetail),
    call(watchCreatePatients),
    call(watchUpdatePatient),
    call(watchDeletePatients),
  ]);
}

export default patientSaga;
