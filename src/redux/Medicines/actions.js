import {
    // Create
    CREATE_MEDICINES,
    CREATE_MEDICINES_FAIL,
    CREATE_MEDICINES_SUCCESS,
    // Delete
    DELETE_MEDICINES,
    DELETE_MEDICINES_FAIL,
    DELETE_MEDICINES_SUCCESS,
    // Get all
    GET_MEDICINES,
    GET_MEDICINES_FAIL,
    GET_MEDICINES_SUCCESS,
    // Get one
    GET_MEDICINE_DETAIL,
    GET_MEDICINE_DETAIL_SUCCESS,
    GET_MEDICINE_DETAIL_FAIL,
    CLEAR_MEDICINE_DETAIL,
    UPDATE_MEDICINE,
    UPDATE_MEDICINE_SUCCESS,
    UPDATE_MEDICINE_FAIL,
  } from './constant';
  
  // GET ALL MEDICINES
  export const getMedicines = () => ({
    type: GET_MEDICINES,
    // payload:,
  });
  
  export const getMedicinesSuccess = (medicines) => ({
    type: GET_MEDICINES_SUCCESS,
    payload: medicines,
  });
  
  export const getMedicinesFail = (error) => ({
    type: GET_MEDICINES_FAIL,
    payload: error,
  });
  
  // GET MEDICINE DETAIL
  export const getMedicineDetail = (id) => ({
    type: GET_MEDICINE_DETAIL,
    payload: id,
  });
  
  export const getMedicineDetailSuccess = (medicine) => ({
    type: GET_MEDICINE_DETAIL_SUCCESS,
    payload: medicine,
  });
  
  export const getMedicineDetailFail = (error) => ({
    type: GET_MEDICINE_DETAIL_FAIL,
    payload: error,
  });
  
  export const clearMedicineDetail = () => ({
    type: CLEAR_MEDICINE_DETAIL,
  });
  
  // CREATE MEDICINE
  export const createMedicines = (medicines) => ({
    type: CREATE_MEDICINES,
    payload: medicines,
  });
  
  export const createMedicinesSuccess = (medicines) => ({
    type: CREATE_MEDICINES_SUCCESS,
    payload: medicines,
  });
  
  export const createMedicinesFail = (error) => ({
    type: CREATE_MEDICINES_FAIL,
    payload: error,
  });
  
  // UPDATE MEDICINE
  export const updateMedicine = (medicine) => ({
    type: UPDATE_MEDICINE,
    payload: medicine,
  });
  
  export const updateMedicineSuccess = (medicine) => ({
    type: UPDATE_MEDICINE_SUCCESS,
    payload: medicine,
  });
  
  export const updateMedicineFail = (error) => ({
    type: UPDATE_MEDICINE_FAIL,
    payload: error,
  });
  
  // DELETE MEDICINE
  export const deleteMedicines = (id) => ({
    type: DELETE_MEDICINES,
    payload: id,
  });
  
  export const deleteMedicinesSuccess = (id) => ({
    type: DELETE_MEDICINES_SUCCESS,
    payload: id,
  });
  
  export const deleteMedicinesFail = (error) => ({
    type: DELETE_MEDICINES_FAIL,
    payload: error,
  });
  