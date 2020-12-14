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
  GET_EXAMINATIONS_FAIL,
  GET_EXAMINATIONS_SUCCESS,
  GET_EXAMINATION_DETAIL,
  GET_EXAMINATION_DETAIL_FAIL,
  GET_EXAMINATION_DETAIL_SUCCESS,
} from './constant';

const INIT_STATE = {
  appointments: null,
  examinations: null,
  loading: false,
};

const examinationReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    // GET ALL APPOINTMENTS
    case GET_APPOINTMENTS:
      return { ...state, loading: true };
    case GET_APPOINTMENTS_SUCCESS:
      return { ...state, appointments: action.payload, loading: false, error: null };
    case GET_APPOINTMENTS_FAIL:
      return { ...state, error: action.payload, loading: false };

    // GET APPOINTMENT DETAIl
    case GET_APPOINTMENT:
      return { ...state, loading: true };
    case GET_APPOINTMENT_SUCCESS:
      return { ...state, appointment: action.payload, loading: false, error: null };
    case GET_APPOINTMENT_FAIL:
      return { ...state, error: action.payload, loading: false };

    // CREATE APPOINTMENT
    case CREATE_APPOINTMENT:
      return { ...state, loading: true };
    case CREATE_APPOINTMENT_SUCCESS:
      let items = state.appointments ? [...state.appointments.items, action.payload] : [action.payload];
      let totalItems = items.length;
      return { ...state, appointments: { ...state.appointments, items, totalItems }, loading: false, error: null };
    case CREATE_APPOINTMENT_FAIL:
      return { ...state, error: action.payload, loading: false };

    // DELETE APPOINTMENT
    case DELETE_APPOINTMENT:
      return { ...state, loading: true };
    case DELETE_APPOINTMENT_SUCCESS:
      items = state.appointments.items.filter((item) => item.appointmentId !== action.payload);
      totalItems = items.length;
      return { ...state, appointments: { ...state.appointments, items, totalItems }, loading: false, error: null };
    case DELETE_APPOINTMENT_FAIL:
      return { ...state, error: action.payload, loading: false };

    // GET ALL EXAMINATIONS
    case GET_EXAMINATIONS:
      return { ...state, loading: true };
    case GET_EXAMINATIONS_SUCCESS:
      return { ...state, appointments: action.payload, loading: false, error: null };
    case GET_EXAMINATIONS_FAIL:
      return { ...state, error: action.payload, loading: false };

    // GET APPOINTMENT DETAIl
    case GET_EXAMINATION_DETAIL:
      return { ...state, loading: true };
    case GET_EXAMINATION_DETAIL_SUCCESS:
      return { ...state, examination: action.payload, loading: false, error: null };
    case GET_EXAMINATION_DETAIL_FAIL:
      return { ...state, error: action.payload, loading: false };

    // CREATE EXAMINATION
    case CREATE_EXAMINATION:
      return { ...state, loading: true };
    case CREATE_EXAMINATION_SUCCESS:
      items = state.examinations ? [...state.examinations.items, action.payload] : [action.payload];
      totalItems = items.length;
      return { ...state, examinations: { ...state.examinations, items, totalItems }, loading: false, error: null };
    case CREATE_EXAMINATION_FAIL:
      return { ...state, error: action.payload, loading: false };

    default:
      return { ...state };
  }
};

export default examinationReducer;
