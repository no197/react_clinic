import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { GET_PATIENTS } from './constant';
import apiCall from '../../helpers/apiCall';
import { getPatientsFail, getPatientsSuccess } from './actions';

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

export function* watchGetPatients() {
  yield takeEvery(GET_PATIENTS, getPatientsSaga);
}

function* patientSaga() {
  yield all([fork(watchGetPatients)]);
}

export default patientSaga;
