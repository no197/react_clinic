import {
  CREATE_PATIENTS,
  CREATE_PATIENTS_FAIL,
  CREATE_PATIENTS_SUCCESS,
  DELETE_PATIENTS,
  DELETE_PATIENTS_FAIL,
  DELETE_PATIENTS_SUCCESS,
  GET_PATIENTS,
  GET_PATIENTS_FAIL,
  GET_PATIENTS_SUCCESS,
} from './constant';

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

export const createPatients = (patients) => ({
  type: CREATE_PATIENTS,
  payload: patients
});
export const createPatientsSuccess = (patients) => ({
  type: CREATE_PATIENTS_SUCCESS,
  payload: patients,
});
export const createPatientsFail = (error) => ({
  type: CREATE_PATIENTS_FAIL,
  payload: error,
});

export const deletePatients = (id) => ({
  type: DELETE_PATIENTS,
  payload: id
});
export const deletePatientsSuccess = (id) => ({
  type: DELETE_PATIENTS_SUCCESS,
  payload: id,
});
export const deletePatientsFail = (error) => ({
  type: DELETE_PATIENTS_FAIL,
  payload: error,
});
