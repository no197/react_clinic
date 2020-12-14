import React from 'react';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  CREATE_APPOINTMENT,
  CREATE_EXAMINATION,
  DELETE_APPOINTMENT,
  GET_APPOINTMENT,
  GET_APPOINTMENTS,
  GET_EXAMINATIONS,
  GET_EXAMINATION_DETAIL,
} from './constant';
import apiCall from '../../helpers/apiCall';
import {
  getAppointmentsSuccess,
  getAppointmentsFail,
  createAppointmentSuccess,
  createAppointmentFail,
  deleteAppointmentSuccess,
  deleteAppointmentFail,
  getAppointmentSuccess,
  getAppointmentFail,
  getExaminationDetailSuccess,
  getExaminationDetailFail,
} from './actions';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import ToastifyLink from '../../components/Toastify/ToastifyLink';

// GET ALL APPOINTMENT
function* getAppointmentsSaga({ payload: params }) {
  try {
    const { status } = params;
    const { data: response } = yield call(() => apiCall.get(`/appointments?status=${status}`));
    yield put(getAppointmentsSuccess(response));
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
    yield put(getAppointmentsFail(message));
  }
}

// GET ONE APPOINTMENT
function* getAppointmentSaga({ payload: id }) {
  try {
    const { data: response } = yield call(() => apiCall.get(`/appointments/${id}`));
    yield put(getAppointmentSuccess(response));
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
    yield put(getAppointmentFail(message));
  }
}

// CREATE APPOINTMENT
function* createAppointmentSaga({ payload }) {
  try {
    const { data: resonse } = yield call(() => apiCall.post('/appointments', payload));
    yield put(createAppointmentSuccess(resonse));
    toast.success('Thêm thành đăng ký khám bệnh cho bệnh nhân');
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
    yield put(createAppointmentFail(message));
  }
}

// DELETE APPOINTMENT
function* deleteAppointmentSaga({ payload: id }) {
  try {
    yield call(() => apiCall.delete(`/appointments/${id}`));
    toast.success('Xóa thành công đăng ký khám bệnh của bệnh nhân!');
    yield put(deleteAppointmentSuccess(id));
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
    toast.error('Không thể xóa đăng ký khám bệnh của bệnh nhân này!');
    yield put(deleteAppointmentFail(message));
  }
}

// GET ALL EXAMINATION
function* getExaminationsSaga() {
  try {
    const { data: response } = yield call(() => apiCall.get(`/examinations`));
    yield put(getAppointmentsSuccess(response));
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
    yield put(getAppointmentsFail(message));
  }
}

// GET ONE APPOINTMENT
function* getExaminationDetailSaga({ payload: id }) {
  try {
    const { data: response } = yield call(() => apiCall.get(`/examinations/${id}`));
    yield put(getExaminationDetailSuccess(response));
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
    yield put(getExaminationDetailFail(message));
  }
}

// CREATE EXAMINATION
function* createExaminationSaga({ payload }) {
  try {
    const { data: resonse } = yield call(() => apiCall.post('/examinations', payload));
    yield put(createAppointmentSuccess(resonse));
    toast.success(
      <ToastifyLink to={`/app/examinations/${resonse.examinationId}`}>
        Thêm thành công phiếu khám bệnh cho bệnh nhân
      </ToastifyLink>
    );
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
    yield put(createAppointmentFail(message));
  }
}

/// APOINTMENTS
export function* watchGetAppointments() {
  yield takeLatest(GET_APPOINTMENTS, getAppointmentsSaga);
}

export function* watchGetAppointment() {
  yield takeLatest(GET_APPOINTMENT, getAppointmentSaga);
}

export function* watchCreateAppointment() {
  yield takeLatest(CREATE_APPOINTMENT, createAppointmentSaga);
}

export function* watchDeleteAppointment() {
  yield takeLatest(DELETE_APPOINTMENT, deleteAppointmentSaga);
}

/// EXAMINATIONS

export function* watchGetExaminations() {
  yield takeLatest(GET_EXAMINATIONS, getExaminationsSaga);
}

export function* watchGetExaminationDetail() {
  yield takeLatest(GET_EXAMINATION_DETAIL, getExaminationDetailSaga);
}

export function* watchCreateExamination() {
  yield takeLatest(CREATE_EXAMINATION, createExaminationSaga);
}

function* examinationSaga() {
  yield all([
    //Appointment
    call(watchGetAppointments),
    call(watchGetAppointment),
    call(watchCreateAppointment),
    call(watchDeleteAppointment),

    // Examination
    call(watchGetExaminations),
    call(watchGetExaminationDetail),
    call(watchCreateExamination),
  ]);
}

export default examinationSaga;
