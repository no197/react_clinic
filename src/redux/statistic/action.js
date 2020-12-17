import {
  GET_GENERAL_STATISTIC,
  GET_GENERAL_STATISTIC_FAIL,
  GET_GENERAL_STATISTIC_SUCCESS,
  GET_MONTHLY_MEDICAL,
  GET_MONTHLY_MEDICAL_FAIL,
  GET_MONTHLY_MEDICAL_SUCCESS,
  GET_MONTHLY_REVENUE,
  GET_MONTHLY_REVENUE_FAIL,
  GET_MONTHLY_REVENUE_SUCCESS,
  GET_MONTHLY_PATIENTS,
  GET_MONTHLY_PATIENTS_FAIL,
  GET_MONTHLY_PATIENTS_SUCCESS,
  GET_REVENUE_IN_RANGE,
  GET_REVENUE_IN_RANGE_FAIL,
  GET_REVENUE_IN_RANGE_SUCCESS,
  GET_TOP_FIVE_MEDICINE_USED,
  GET_TOP_FIVE_MEDICINE_USED_FAIL,
  GET_TOP_FIVE_MEDICINE_USED_SUCCESS,
  GET_TOP_FIVE_MEDICINE_QUANTITY,
  GET_TOP_FIVE_MEDICINE_QUANTITY_SUCCESS,
  GET_TOP_FIVE_MEDICINE_QUANTITY_FAIL,
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
//PATIENTS STATISTIC
export const getMonthlyPatient = ({ month, year }) => ({
  type: GET_MONTHLY_PATIENTS,
  payload: { month, year },
});
export const getMonthlyPatientSuccess = (patientStatistic) => ({
  type: GET_MONTHLY_PATIENTS_SUCCESS,
  payload: patientStatistic,
});

export const getMonthlyPatientFail = (error) => ({
  type: GET_MONTHLY_PATIENTS_FAIL,
  payload: error,
});
//MEDICAL STATISTIC
export const getMonthlyMedical = ({ month, year }) => ({
  type: GET_MONTHLY_MEDICAL,
  payload: { month, year },
});
export const getMonthlyMedicalSuccess = (medicalStatistic) => ({
  type: GET_MONTHLY_MEDICAL_SUCCESS,
  payload: medicalStatistic,
});

export const getMonthlyMedicalFail = (error) => ({
  type: GET_MONTHLY_MEDICAL_FAIL,
  payload: error,
});

// TOP FIVE MEDICINES USED
export const getTopFiveMedicineUsed = () => ({
  type: GET_TOP_FIVE_MEDICINE_USED,
});

export const getTopFiveMedicineUsedSuccess = (topFiveUsed) => ({
  type: GET_TOP_FIVE_MEDICINE_USED_SUCCESS,
  payload: topFiveUsed,
});

export const getTopFiveMedicineUsedFail = (error) => ({
  type: GET_TOP_FIVE_MEDICINE_USED_FAIL,
  payload: error,
});

// TOP FIVE MEDICINES QUANTITY
export const getTopFiveMedicineQuantity = () => ({
  type: GET_TOP_FIVE_MEDICINE_QUANTITY,
});

export const getTopFiveMedicineQuantitySuccess = (topFiveQuantity) => ({
  type: GET_TOP_FIVE_MEDICINE_QUANTITY_SUCCESS,
  payload: topFiveQuantity,
});

export const getTopFiveMedicineQuantityFail = (error) => ({
  type: GET_TOP_FIVE_MEDICINE_QUANTITY_FAIL,
  payload: error,
});
