import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { CREATE_PATIENTS, DELETE_PATIENTS, DELETE_PATIENTS_FAIL, GET_PATIENTS } from './constant';
import apiCall from '../../helpers/apiCall';
import { createPatientsFail, createPatientsSuccess, deletePatients, deletePatientsFail, deletePatientsSuccess, getPatientsFail, getPatientsSuccess } from './actions';

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

function* createPatientSaga({payload}) {
  console.log('call 1 lan ')
  try {
    const { data: resonse } = yield call(() => apiCall.post('/patients',payload));
    yield put(createPatientsSuccess(resonse));
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

function* deletePatientSaga({payload: id}) {
  try {
yield call(() => apiCall.delete(`/patients/${id}`));
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
    yield put(deletePatientsFail(message));
  }
}

export function* watchGetPatients() {
  yield takeEvery(GET_PATIENTS, getPatientsSaga);
}
export function* watchCreatePatients() {
  yield takeLatest(CREATE_PATIENTS, createPatientSaga);
}
export function* watchDeletePatients() {
  yield takeLatest(DELETE_PATIENTS,deletePatientSaga );
}

function* patientSaga() {
  yield all([
    call(watchGetPatients),
    call(watchCreatePatients),
    call(watchDeletePatients)
  ]);
}

export default patientSaga;
