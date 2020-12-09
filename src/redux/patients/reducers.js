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

const INIT_STATE = {
  patients: null,
  loading: false,
};

const patientReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PATIENTS:
      return { ...state, loading: true };
    case GET_PATIENTS_SUCCESS:
      return { ...state, patients: action.payload, loading: false, error: null };
    case GET_PATIENTS_FAIL:
      return { ...state, error: action.payload, loading: false };

    case CREATE_PATIENTS:
      return { ...state, loading: true };
    case CREATE_PATIENTS_SUCCESS:
      let patients = state.patients ? state.patients.push(action.payload) : [action.payload]
      return { ...state, patients:patients, loading: false, error: null };
    case CREATE_PATIENTS_FAIL:
      return { ...state, error: action.payload, loading: false };

    case DELETE_PATIENTS:
      return { ...state, loading: true };
    case DELETE_PATIENTS_SUCCESS:
       patients =  state.patients.filter(item => item.patientId !== action.payload) 
      return { ...state, patients, loading: false, error: null };
    case DELETE_PATIENTS_FAIL:
      return { ...state, error: action.payload, loading: false };
    
    default:
      return { ...state };
  }
};

export default patientReducer;
