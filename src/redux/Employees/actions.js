import { CLEAR_PATIENT_DETAIL } from '../patients/constant';
import { GET_EMPLOYEES, GET_EMPLOYEES_FAIL, GET_EMPLOYEES_SUCCESS ,CREATE_EMPLOYEES,CREATE_EMPLOYEES_SUCCESS,CREATE_EMPLOYEES_FAIL,UPDATE_EMPLOYEE,UPDATE_EMPLOYEE_SUCCESS,UPDATE_EMPLOYEE_FAIL, DELETE_EMPLOYEES,DELETE_EMPLOYEES_SUCCESS,DELETE_EMPLOYEES_FAIL, GET_EMPLOYEE_DETAIL, GET_EMPLOYEE_DETAIL_SUCCESS, GET_EMPLOYEE_DETAIL_FAIL, CLEAR_EMPLOYEE_DETAIL} from './constant';

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

// GET EMPLOYEE DETAIL
export const getEmployeeDetail = (id) => ({
  type: GET_EMPLOYEE_DETAIL,
  payload: id,
});

export const getEmployeeDetailSuccess = (employee) => ({
  type: GET_EMPLOYEE_DETAIL_SUCCESS,
  payload: employee,
});

export const getEmployeeDetailFail = (error) => ({
  type: GET_EMPLOYEE_DETAIL_FAIL,
  payload: error,
});

export const clearEmployeeDetail = () => ({
  type: CLEAR_EMPLOYEE_DETAIL,
});

export const createEmployees = (employees) => ({
  type: CREATE_EMPLOYEES,
  payload: employees,
});

export const createEmployeesSuccess = (employees) => ({
  type: CREATE_EMPLOYEES_SUCCESS,
  payload: employees,
});

export const createEmployeesFail = (error) => ({
  type: CREATE_EMPLOYEES_FAIL,
  payload: error,
});
//DELETE
export const deleteEmployees = (id) => ({
  type: DELETE_EMPLOYEES,
  payload: id,
});

export const deleteEmployeesSuccess = (id) => ({
  type: DELETE_EMPLOYEES_SUCCESS,
  payload: id,
});

export const deleteEmployeesFail = (error) => ({
  type: DELETE_EMPLOYEES_FAIL,
  payload: error,
});


//Update
export const updateEmployee = (employee) =>({
  type: UPDATE_EMPLOYEE,
  payload: employee,
})
export const updateEmployeeSuccess = (employee) => ({
  type: UPDATE_EMPLOYEE_SUCCESS,
  payload: employee,
});

export const updateEmployeeFail = (error) => ({
  type: UPDATE_EMPLOYEE_FAIL,
  payload: error,
});