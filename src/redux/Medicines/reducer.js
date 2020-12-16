import {
    CLEAR_MEDICINE_DETAIL,
    CREATE_MEDICINES,
    CREATE_MEDICINES_FAIL,
    CREATE_MEDICINES_SUCCESS,
    DELETE_MEDICINES,
    DELETE_MEDICINES_FAIL,
    DELETE_MEDICINES_SUCCESS,
    GET_MEDICINES,
    GET_MEDICINES_FAIL,
    GET_MEDICINES_SUCCESS,
    GET_MEDICINE_DETAIL,
    GET_MEDICINE_DETAIL_FAIL,
    GET_MEDICINE_DETAIL_SUCCESS,
    UPDATE_MEDICINE,
    UPDATE_MEDICINE_FAIL,
    UPDATE_MEDICINE_SUCCESS,
  } from './constant';
  
  const INIT_STATE = {
    medicines: null,
    loading: false,
  };
  
  const medicineReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      // GET ALL MEDICINES
      case GET_MEDICINES:
        return { ...state, loading: true };
      case GET_MEDICINES_SUCCESS:
        return { ...state, medicines: action.payload, loading: false, error: null };
      case GET_MEDICINES_FAIL:
        return { ...state, error: action.payload, loading: false };
  
      // GET MEDICINE DETAIl
      case GET_MEDICINE_DETAIL:
        return { ...state, loading: true };
      case GET_MEDICINE_DETAIL_SUCCESS:
        return { ...state, medicine: action.payload, loading: false, error: null };
      case GET_MEDICINE_DETAIL_FAIL:
        return { ...state, error: action.payload, loading: false };
      case CLEAR_MEDICINE_DETAIL:
        return { ...state, medicine: undefined, loading: false, error: null };
  
      // CREATE MEDICINE
      case CREATE_MEDICINES:
        return { ...state, loading: true };
      case CREATE_MEDICINES_SUCCESS:
        let items = state.medicines ? [...state.medicines.items, action.payload] : [action.payload];
        let totalItems = items.length;
        return { ...state, medicines: { ...state.medicines, items, totalItems }, loading: false, error: null };
      case CREATE_MEDICINES_FAIL:
        return { ...state, error: action.payload, loading: false };
  
      case UPDATE_MEDICINE:
        return { ...state, loading: true };
      case UPDATE_MEDICINE_SUCCESS:
        let itemsEx = state.medicines
          ? state.medicines.items.filter((item) => item.medicineId !== action.payload.medicineId)
          : [];
  
        items = state.medicines ? [...itemsEx, action.payload] : [action.payload];
        totalItems = items.length;
  
        return { ...state, medicines: { ...state.medicines, items, totalItems }, loading: false, error: null };
      case UPDATE_MEDICINE_FAIL:
        return { ...state, error: action.payload, loading: false };
  
      // DELETE MEDICINE
      case DELETE_MEDICINES:
        return { ...state, loading: true };
      case DELETE_MEDICINES_SUCCESS:
        console.log(state.medicines);
        items = state.medicines.items.filter((item) => item.medicineId !== action.payload);
        totalItems = items.length;
        return { ...state, medicines: { ...state.medicines, items, totalItems }, loading: false, error: null };
      case DELETE_MEDICINES_FAIL:
        return { ...state, error: action.payload, loading: false };
  
      default:
        return { ...state };
    }
  };
  
  export default medicineReducer;
  