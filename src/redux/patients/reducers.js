import {
  CLEAR_PATIENT_DETAIL,
  CREATE_PATIENTS,
  CREATE_PATIENTS_FAIL,
  CREATE_PATIENTS_SUCCESS,
  DELETE_PATIENTS,
  DELETE_PATIENTS_FAIL,
  DELETE_PATIENTS_SUCCESS,
  GET_PATIENTS,
  GET_PATIENTS_FAIL,
  GET_PATIENTS_SUCCESS,
  GET_PATIENT_DETAIL,
  GET_PATIENT_DETAIL_FAIL,
  GET_PATIENT_DETAIL_SUCCESS,
  UPDATE_PATIENT,
  UPDATE_PATIENT_FAIL,
  UPDATE_PATIENT_SUCCESS,
} from './constant';

const INIT_STATE = {
  patients: null,
  loading: false,
};

const patientReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    // GET ALL PATIENTS
    case GET_PATIENTS:
      return { ...state, loading: true };
    case GET_PATIENTS_SUCCESS:
      return { ...state, patients: action.payload, loading: false, error: null };
    case GET_PATIENTS_FAIL:
      return { ...state, error: action.payload, loading: false };

    // GET PATIENT DETAIl
    case GET_PATIENT_DETAIL:
      return { ...state, loading: true };
    case GET_PATIENT_DETAIL_SUCCESS:
      return { ...state, patient: action.payload, loading: false, error: null };
    case GET_PATIENT_DETAIL_FAIL:
      return { ...state, error: action.payload, loading: false };
    case CLEAR_PATIENT_DETAIL:
      return { ...state, patient: undefined, loading: false, error: null };

    // CREATE PATIENT
    case CREATE_PATIENTS:
      return { ...state, loading: true };
    case CREATE_PATIENTS_SUCCESS:
      let items = state.patients ? [...state.patients.items, action.payload] : [action.payload];
      let totalItems = items.length;
      return { ...state, patients: { ...state.patients, items, totalItems }, loading: false, error: null };
    case CREATE_PATIENTS_FAIL:
      return { ...state, error: action.payload, loading: false };

    case UPDATE_PATIENT:
      return { ...state, loading: true };
    case UPDATE_PATIENT_SUCCESS:
      let itemsEx = state.patients
        ? state.patients.items.filter((item) => item.patientId !== action.payload.patientId)
        : [];

      items = state.patients ? [...itemsEx, action.payload] : [action.payload];
      totalItems = items.length;

      return { ...state, patients: { ...state.patients, items, totalItems }, loading: false, error: null };
    case UPDATE_PATIENT_FAIL:
      return { ...state, error: action.payload, loading: false };

    // DELETE PATIENT
    case DELETE_PATIENTS:
      return { ...state, loading: true };
    case DELETE_PATIENTS_SUCCESS:
      console.log(state.patients);
      items = state.patients.items.filter((item) => item.patientId !== action.payload);
      totalItems = items.length;
      return { ...state, patients: { ...state.patients, items, totalItems }, loading: false, error: null };
    case DELETE_PATIENTS_FAIL:
      return { ...state, error: action.payload, loading: false };

    default:
      return { ...state };
  }
};

export default patientReducer;
