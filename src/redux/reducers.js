// @flow

import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';
//multilanguages
import { i18nextReducer } from 'i18next-redux-languagedetector';
import patientReducer from './patients/reducers';
import employeesReducer from './Employees/reducers';
export default combineReducers({
  Auth,
  AppMenu,
  Layout,
  i18next: i18nextReducer,
  Patient: patientReducer,
  Employees: employeesReducer,
});
