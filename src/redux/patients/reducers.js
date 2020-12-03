import { GET_PATIENTS, GET_PATIENTS_FAIL, GET_PATIENTS_SUCCESS } from './constant';

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
    default:
      return { ...state };
  }
};

export default patientReducer;
