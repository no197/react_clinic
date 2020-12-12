// @flow

import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';
//multilanguages
import { i18nextReducer } from 'i18next-redux-languagedetector';
import patientReducer from './patients/reducers';
import employeesReducer from './Employees/reducers';
import { connectRouter } from 'connected-react-router';
import examinationReducer from './examinations/reducers';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    Auth,
    AppMenu,
    Layout,
    i18next: i18nextReducer,
    Patient: patientReducer,
    Employees: employeesReducer,
    Examinations: examinationReducer,
  });

export default createRootReducer;
// export default combineReducers({
//   Auth,
//   AppMenu,
//   Layout,
//   i18next: i18nextReducer,
//   Patient: patientReducer,
//   Employees: employeesReducer,
// });
