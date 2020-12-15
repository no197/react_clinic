// @flow
import { all, call } from 'redux-saga/effects';
import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import appMenuSaga from './appMenu/saga';
import patientSaga from './patients/saga';
import EmployeeSaga from './Employees/saga';
import examinationSaga from './examinations/saga';
import invoiceSaga from './invoices/saga';

export default function* rootSaga(getState: any): any {
  yield all([
    authSaga(),
    layoutSaga(),
    appMenuSaga(),
    call(patientSaga),
    EmployeeSaga(),
    call(examinationSaga),
    call(invoiceSaga),
  ]);
}
