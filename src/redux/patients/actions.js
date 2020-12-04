import {
  CREATE_PATIENTS,
  CREATE_PATIENTS_FAIL,
  CREATE_PATIENTS_SUCCESS,
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

export const createPatients = () => ({
  type: CREATE_PATIENTS,
});
export const createPatientsSuccess = (patients) => ({
  type: CREATE_PATIENTS_SUCCESS,
  payload: patients,
});
export const createPatientsFail = (error) => ({
  type: CREATE_PATIENTS_FAIL,
  payload: error,
});
