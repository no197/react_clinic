import {
  //   CREATE_GET_EMPLOYEES,
  //   CREATE_GET_EMPLOYEES_FAIL,
  //   CREATE_GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES,
  GET_EMPLOYEES_FAIL,
  GET_EMPLOYEES_SUCCESS,
} from './constant';

const INIT_STATE = {
  employees: null,
  loading: false,
};

const employeesReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return { ...state, loading: true };
    case GET_EMPLOYEES_SUCCESS:
      return { ...state, employees: action.payload, loading: false, error: null };
    case GET_EMPLOYEES_FAIL:
      return { ...state, error: action.payload, loading: false };
    // case CREATE_GET_EMPLOYEES:
    //   return { ...state, loading: true };
    // case CREATE_GET_EMPLOYEES_SUCCESS:
    //   return { ...state, employees: action.payload, loading: false, error: null };
    // case CREATE_GET_EMPLOYEES_FAIL:
    //   return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default employeesReducer;
