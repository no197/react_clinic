import {
  GET_GENERAL_STATISTIC,
  GET_GENERAL_STATISTIC_FAIL,
  GET_GENERAL_STATISTIC_SUCCESS,
  GET_MONTHLY_REVENUE,
  GET_MONTHLY_REVENUE_FAIL,
  GET_MONTHLY_REVENUE_SUCCESS,
  GET_REVENUE_IN_RANGE,
  GET_REVENUE_IN_RANGE_FAIL,
  GET_REVENUE_IN_RANGE_SUCCESS,
} from './constant';

export const getMonthlyRevenue = ({ month, year }) => ({
  type: GET_MONTHLY_REVENUE,
  payload: { month, year },
});

export const getMonthlyRevenueSuccess = (monthlyRevenue) => ({
  type: GET_MONTHLY_REVENUE_SUCCESS,
  payload: monthlyRevenue,
});

export const getMonthlyRevenueFail = (error) => ({
  type: GET_MONTHLY_REVENUE_FAIL,
  payload: error,
});

// GET REVENUE IN RANGE
export const getRevenueInRange = ({ fromDate, toDate }) => ({
  type: GET_REVENUE_IN_RANGE,
  payload: { fromDate, toDate },
});

export const getRevenueInRangeSuccess = (revenues) => ({
  type: GET_REVENUE_IN_RANGE_SUCCESS,
  payload: revenues,
});

export const getRevenueInRangeFail = (error) => ({
  type: GET_REVENUE_IN_RANGE_FAIL,
  payload: error,
});

// GENERAL STATISTIC
export const getGeneralStatistic = () => ({
  type: GET_GENERAL_STATISTIC,
});

export const getGeneralStatisticSuccess = (generalStatistic) => ({
  type: GET_GENERAL_STATISTIC_SUCCESS,
  payload: generalStatistic,
});

export const getGeneralStatisticFail = (error) => ({
  type: GET_GENERAL_STATISTIC_FAIL,
  payload: error,
});
