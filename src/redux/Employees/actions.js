import { GET_EMPLOYEES, GET_EMPLOYEES_FAIL, GET_EMPLOYEES_SUCCESS ,CREATE_EMPLOYEES,CREATE_EMPLOYEES_SUCCESS,CREATE_EMPLOYEES_FAIL} from './constant';

export const getEmployees = () => ({
  type: GET_EMPLOYEES,
  // payload:,
});

export const getEmployeesSuccess = (employees) => ({
  type: GET_EMPLOYEES_SUCCESS,
  payload: employees,
});

export const getEmployeesFail = (error) => ({
  type: GET_EMPLOYEES_FAIL,
  payload: error,
});
export const createEmployees = () => ({
  type: CREATE_EMPLOYEES,
  // payload:,
});

export const createEmployeesSuccess = (employees) => ({
  type: CREATE_EMPLOYEES_SUCCESS,
  payload: employees,
});

export const createEmployeesFail = (error) => ({
  type: CREATE_EMPLOYEES_FAIL,
  payload: error,
});
