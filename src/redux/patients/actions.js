import {
  // Create
  CREATE_PATIENTS,
  CREATE_PATIENTS_FAIL,
  CREATE_PATIENTS_SUCCESS,
  // Delete
  DELETE_PATIENTS,
  DELETE_PATIENTS_FAIL,
  DELETE_PATIENTS_SUCCESS,
  // Get all
  GET_PATIENTS,
  GET_PATIENTS_FAIL,
  GET_PATIENTS_SUCCESS,
  // Get one
  GET_PATIENT_DETAIL,
  GET_PATIENT_DETAIL_SUCCESS,
  GET_PATIENT_DETAIL_FAIL,
  CLEAR_PATIENT_DETAIL,
  UPDATE_PATIENT,
  UPDATE_PATIENT_SUCCESS,
  UPDATE_PATIENT_FAIL,
} from './constant';

// GET ALL PATIENTS
export const getPatients = () => ({
  type: GET_PATIENTS,
  // payload:,
});

export const getPatientsSuccess = (patients) => ({
  type: GET_PATIENTS_SUCCESS,
  payload: patients,
});

export const getPatientsFail = (error) => ({
  type: GET_PATIENTS_FAIL,
  payload: error,
});

// GET PATIENT DETAIL
export const getPatientDetail = (id) => ({
  type: GET_PATIENT_DETAIL,
  payload: id,
});

export const getPatientDetailSuccess = (patient) => ({
  type: GET_PATIENT_DETAIL_SUCCESS,
  payload: patient,
});

export const getPatientDetailFail = (error) => ({
  type: GET_PATIENT_DETAIL_FAIL,
  payload: error,
});

export const clearPatientDetail = () => ({
  type: CLEAR_PATIENT_DETAIL,
});

// CREATE PATIENT
export const createPatients = (patients) => ({
  type: CREATE_PATIENTS,
  payload: patients,
});

export const createPatientsSuccess = (patients) => ({
  type: CREATE_PATIENTS_SUCCESS,
  payload: patients,
});

export const createPatientsFail = (error) => ({
  type: CREATE_PATIENTS_FAIL,
  payload: error,
});

// UPDATE PATIENT
export const updatePatient = (patient) => ({
  type: UPDATE_PATIENT,
  payload: patient,
});

export const updatePatientSuccess = (patient) => ({
  type: UPDATE_PATIENT_SUCCESS,
  payload: patient,
});

export const updatePatientFail = (error) => ({
  type: UPDATE_PATIENT_FAIL,
  payload: error,
});

// DELETE PATIENT
export const deletePatients = (id) => ({
  type: DELETE_PATIENTS,
  payload: id,
});

export const deletePatientsSuccess = (id) => ({
  type: DELETE_PATIENTS_SUCCESS,
  payload: id,
});

export const deletePatientsFail = (error) => ({
  type: DELETE_PATIENTS_FAIL,
  payload: error,
});
