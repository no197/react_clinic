import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { CREATE_PATIENTS, GET_PATIENTS } from './constant';
import apiCall from '../../helpers/apiCall';
import { createPatientsFail, createPatientsSuccess, getPatientsFail, getPatientsSuccess } from './actions';

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

function* createPatientSaga() {
  try {
    const { data: resonse } = yield call(() => apiCall.post('/patients'));
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

export function* watchGetPatients() {
  yield takeEvery(GET_PATIENTS, getPatientsSaga);
}
export function* watchCreatePatients() {
  yield takeEvery(CREATE_PATIENTS, createPatientSaga);
}

function* patientSaga() {
  yield all([fork(watchGetPatients, watchCreatePatients)]);
}

export default patientSaga;
