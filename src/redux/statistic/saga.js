import { all, call, put, takeLatest } from 'redux-saga/effects';
import apiCall from '../../helpers/apiCall';
import {
  getGeneralStatisticFail,
  getGeneralStatisticSuccess,
  getMonthlyRevenueFail,
  getMonthlyRevenueSuccess,
  getRevenueInRangeFail,
  getRevenueInRangeSuccess,
} from './action';
import { GET_GENERAL_STATISTIC, GET_MONTHLY_REVENUE, GET_REVENUE_IN_RANGE } from './constant';

// GET RENVENUE
function* getMonthlyRevenueSaga({ payload: { month, year } }) {
  try {
    const { data: response } = yield call(() => apiCall.get(`/statistic/monthlyRevenue?month=${month}&year=${year}`));
    yield put(getMonthlyRevenueSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = error;
    }
    yield put(getMonthlyRevenueFail(message));
  }
}

// GET RENVENUE
function* getRevenueInRangeSaga({ payload: { fromDate, toDate } }) {
  try {
    const { data: response } = yield call(() =>
      apiCall.get(`statistic/revenueInRange?fromDate=${fromDate}&toDate=${toDate}`)
    );
    yield put(getRevenueInRangeSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = error;
    }
    yield put(getRevenueInRangeFail(message));
  }
}

// GET GENERAL STATISTIC
function* getGeneralStatisticSaga() {
  try {
    const { data: response } = yield call(() => apiCall.get(`/statistic/general`));
    yield put(getGeneralStatisticSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = error;
    }
    yield put(getGeneralStatisticFail(message));
  }
}

export function* watchGetMonthlyRevenue() {
  yield takeLatest(GET_MONTHLY_REVENUE, getMonthlyRevenueSaga);
}

export function* watchRevenueInRange() {
  yield takeLatest(GET_REVENUE_IN_RANGE, getRevenueInRangeSaga);
}

export function* watchGetGeneralStatistic() {
  yield takeLatest(GET_GENERAL_STATISTIC, getGeneralStatisticSaga);
}

function* statisticSaga() {
  yield all([call(watchGetMonthlyRevenue), call(watchGetGeneralStatistic), call(watchRevenueInRange)]);
}

export default statisticSaga;
