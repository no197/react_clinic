import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { CREATE_MEDICINES, DELETE_MEDICINES, GET_MEDICINES, GET_MEDICINE_DETAIL, UPDATE_MEDICINE } from './constant';
import apiCall from '../../helpers/apiCall';
import {
  createMedicinesFail,
  createMedicinesSuccess,
  deleteMedicinesFail,
  deleteMedicinesSuccess,
  getMedicineDetailFail,
  getMedicineDetailSuccess,
  getMedicinesFail,
  getMedicinesSuccess,
  updateMedicineFail,
  updateMedicineSuccess,
} from './actions';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

// GET ALL MEDICINES
function* getMedicinesSaga() {
  try {
    const { data: response } = yield call(() => apiCall.get('/medicines'));
    yield put(getMedicinesSuccess(response));
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
    yield put(getMedicinesFail(message));
  }
}

// GET MEDICINE
function* getMedicineDetailSaga({ payload: id }) {
  try {
    const { data: response } = yield call(() => apiCall.get(`/medicines/${id}`));
    yield put(getMedicineDetailSuccess(response));
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
    yield put(getMedicineDetailFail(message));
  }
}

// CREATE MEDICINE
function* createMedicineSaga({ payload }) {
  try {
    const { data: resonse } = yield call(() => apiCall.post('/medicines', payload));
    yield put(createMedicinesSuccess(resonse));
    yield put(push('/app/medicines'));
    toast.success('Thêm thành công thuốc mới');
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
    yield put(createMedicinesFail(message));
  }
}

// UPDATE MEDICINE
function* updateMedicineSaga({ payload }) {
  const { medicineId: id } = payload;
  try {
    const { data: resonse } = yield call(() => apiCall.put(`/medicines/${id}`, payload));
    yield put(updateMedicineSuccess(resonse));
    yield put(push('/app/medicines'));
    toast.success('Cập nhật thành công thông tin thuốc');
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
    yield put(updateMedicineFail(message));
    toast.error('Không thể cập nhật thông tin thuốc');
  }
}

// DELETE MEDICINE
function* deleteMedicineSaga({ payload: id }) {
  try {
    yield call(() => apiCall.delete(`/medicines/${id}`));
    toast.success('Xóa thành công thuốc!');
    yield put(deleteMedicinesSuccess(id));
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
    toast.error('Không thể xóa thuốc này!');
    yield put(deleteMedicinesFail(message));
  }
}

export function* watchGetMedicines() {
  yield takeEvery(GET_MEDICINES, getMedicinesSaga);
}

export function* watchGetMedicineDetail() {
  yield takeEvery(GET_MEDICINE_DETAIL, getMedicineDetailSaga);
}

export function* watchCreateMedicines() {
  yield takeLatest(CREATE_MEDICINES, createMedicineSaga);
}
export function* watchUpdateMedicine() {
  yield takeLatest(UPDATE_MEDICINE, updateMedicineSaga);
}
export function* watchDeleteMedicines() {
  yield takeLatest(DELETE_MEDICINES, deleteMedicineSaga);
}

function* medicineSaga() {
  yield all([
    call(watchGetMedicines),
    call(watchGetMedicineDetail),
    call(watchCreateMedicines),
    call(watchUpdateMedicine),
    call(watchDeleteMedicines),
  ]);
}

export default medicineSaga;
