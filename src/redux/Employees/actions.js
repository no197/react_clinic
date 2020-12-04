import { GET_EMPLOYEES, GET_EMPLOYEES_FAIL, GET_EMPLOYEES_SUCCESS } from './constant';

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
