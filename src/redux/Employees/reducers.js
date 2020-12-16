import {
  CLEAR_EMPLOYEE_DETAIL,
  CREATE_EMPLOYEES,
  CREATE_EMPLOYEES_FAIL,
  CREATE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES,
  DELETE_EMPLOYEES_FAIL,
  DELETE_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES,
  GET_EMPLOYEES_FAIL,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEE_DETAIL,
  GET_EMPLOYEE_DETAIL_FAIL,
  GET_EMPLOYEE_DETAIL_SUCCESS,
  UPDATE_EMPLOYEE,
  UPDATE_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_SUCCESS,
} from './constant';

const INIT_STATE = {
  employees: null,
  loading: false,
};

const employeeReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    // GET ALL EMPLOYEES
    case GET_EMPLOYEES:
      return { ...state, loading: true };
    case GET_EMPLOYEES_SUCCESS:
      return { ...state, employees: action.payload, loading: false, error: null };
    case GET_EMPLOYEES_FAIL:
      return { ...state, error: action.payload, loading: false };

    // GET EMPLOYEE DETAIl
    case GET_EMPLOYEE_DETAIL:
      return { ...state, loading: true };
    case GET_EMPLOYEE_DETAIL_SUCCESS:
      return { ...state, employee: action.payload, loading: false, error: null };
    case GET_EMPLOYEE_DETAIL_FAIL:
      return { ...state, error: action.payload, loading: false };
    case CLEAR_EMPLOYEE_DETAIL:
      return { ...state, employee: undefined, loading: false, error: null };

    // CREATE EMPLOYEE
    case CREATE_EMPLOYEES:
      return { ...state, loading: true };
    case CREATE_EMPLOYEES_SUCCESS:
      let items = state.employees ? [...state.employees.items, action.payload] : [action.payload];
      let totalItems = items.length;
      return { ...state, employees: { ...state.employees, items, totalItems }, loading: false, error: null };
    case CREATE_EMPLOYEES_FAIL:
      return { ...state, error: action.payload, loading: false };

    case UPDATE_EMPLOYEE:
      return { ...state, loading: true };
    case UPDATE_EMPLOYEE_SUCCESS:
      let itemsEx = state.employees
        ? state.employees.items.filter((item) => item.employeeId !== action.payload.employeeId)
        : [];

      items = state.employees ? [...itemsEx, action.payload] : [action.payload];
      totalItems = items.length;

      return { ...state, employees: { ...state.employees, items, totalItems }, loading: false, error: null };
    case UPDATE_EMPLOYEE_FAIL:
      return { ...state, error: action.payload, loading: false };

    // DELETE EMPLOYEE
    case DELETE_EMPLOYEES:
      return { ...state, loading: true };
    case DELETE_EMPLOYEES_SUCCESS:
      console.log(state.employees);
      items = state.employees.items.filter((item) => item.employeeId !== action.payload);
      totalItems = items.length;
      return { ...state, employees: { ...state.employees, items, totalItems }, loading: false, error: null };
    case DELETE_EMPLOYEES_FAIL:
      return { ...state, error: action.payload, loading: false };

    default:
      return { ...state };
  }
};

export default employeeReducer;
