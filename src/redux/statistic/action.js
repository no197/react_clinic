import { GET_MONTHLY_REVENUE, GET_MONTHLY_REVENUE_FAIL, GET_MONTHLY_REVENUE_SUCCESS } from './constant';

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
