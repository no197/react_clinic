import {
  CREATE_APPOINTMENT,
  CREATE_APPOINTMENT_FAIL,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_EXAMINATION,
  CREATE_EXAMINATION_FAIL,
  CREATE_EXAMINATION_SUCCESS,
  DELETE_APPOINTMENT,
  DELETE_APPOINTMENT_FAIL,
  DELETE_APPOINTMENT_SUCCESS,
  GET_APPOINTMENT,
  GET_APPOINTMENTS,
  GET_APPOINTMENTS_FAIL,
  GET_APPOINTMENTS_SUCCESS,
  GET_APPOINTMENT_FAIL,
  GET_APPOINTMENT_SUCCESS,
  GET_EXAMINATIONS,
  GET_EXAMINATION_DETAIL,
  GET_EXAMINATION_DETAIL_FAIL,
  GET_EXAMINATION_DETAIL_SUCCESS,
} from './constant';

// GET ALL APPOINTMENT
export const getAppointments = (params) => ({
  type: GET_APPOINTMENTS,
  payload: params,
});

export const getAppointmentsSuccess = (appointments) => ({
  type: GET_APPOINTMENTS_SUCCESS,
  payload: appointments,
});

export const getAppointmentsFail = (error) => ({
  type: GET_APPOINTMENTS_FAIL,
  payload: error,
});

// GET ONE APPOINTMENT
export const getAppointment = (id) => ({
  type: GET_APPOINTMENT,
  payload: id,
});

export const getAppointmentSuccess = (appointment) => ({
  type: GET_APPOINTMENT_SUCCESS,
  payload: appointment,
});

export const getAppointmentFail = (error) => ({
  type: GET_APPOINTMENT_FAIL,
  payload: error,
});

// CREATE APPOINTMENT
export const createAppointment = (appointment) => ({
  type: CREATE_APPOINTMENT,
  payload: appointment,
});

export const createAppointmentSuccess = (appointment) => ({
  type: CREATE_APPOINTMENT_SUCCESS,
  payload: appointment,
});

export const createAppointmentFail = (error) => ({
  type: CREATE_APPOINTMENT_FAIL,
  payload: error,
});

// DELETE APPOINTMENT
export const deleteAppointment = (id) => ({
  type: DELETE_APPOINTMENT,
  payload: id,
});

export const deleteAppointmentSuccess = (id) => ({
  type: DELETE_APPOINTMENT_SUCCESS,
  payload: id,
});

export const deleteAppointmentFail = (error) => ({
  type: DELETE_APPOINTMENT_FAIL,
  payload: error,
});

// CREATE EXAMINATION
export const createExamination = (examination) => ({
  type: CREATE_EXAMINATION,
  payload: examination,
});

export const createExaminationSuccess = (examination) => ({
  type: CREATE_EXAMINATION_SUCCESS,
  payload: examination,
});

export const createExaminatonFail = (error) => ({
  type: CREATE_EXAMINATION_FAIL,
  payload: error,
});

// GET ALL EXAMINATIONS
export const getExaminations = () => ({
  type: GET_EXAMINATIONS,
});

export const getExaminationsSuccess = (examinations) => ({
  type: GET_APPOINTMENTS_SUCCESS,
  payload: examinations,
});

export const getExaminationsFail = (error) => ({
  type: GET_APPOINTMENTS_FAIL,
  payload: error,
});

// GET ONE APPOINTMENT
export const getExaminationDetail = (id) => ({
  type: GET_EXAMINATION_DETAIL,
  payload: id,
});

export const getExaminationDetailSuccess = (examination) => ({
  type: GET_EXAMINATION_DETAIL_SUCCESS,
  payload: examination,
});

export const getExaminationDetailFail = (error) => ({
  type: GET_EXAMINATION_DETAIL_FAIL,
  payload: error,
});
