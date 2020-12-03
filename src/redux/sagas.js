// @flow
import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import appMenuSaga from './appMenu/saga';
import patientSaga from './patients/saga';

export default function* rootSaga(getState: any): any {
  yield all([authSaga(), layoutSaga(), appMenuSaga(), patientSaga()]);
}
