import {
  GET_GENERAL_STATISTIC,
  GET_GENERAL_STATISTIC_FAIL,
  GET_GENERAL_STATISTIC_SUCCESS,
  GET_MONTHLY_MEDICAL,
  GET_MONTHLY_MEDICAL_FAIL,
  GET_MONTHLY_MEDICAL_SUCCESS,
  GET_MONTHLY_PATIENTS,
  GET_MONTHLY_PATIENTS_FAIL,
  GET_MONTHLY_PATIENTS_SUCCESS,
  GET_MONTHLY_REVENUE,
  GET_MONTHLY_REVENUE_FAIL,
  GET_MONTHLY_REVENUE_SUCCESS,
  GET_REVENUE_IN_RANGE,
  GET_REVENUE_IN_RANGE_FAIL,
  GET_REVENUE_IN_RANGE_SUCCESS,
} from './constant';

const INIT_STATE = {
  monthlyRevenue: null,
  loading: false,
  monthlyPatient: null,
  monthlyMedical: null
};

const statisticReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    // GET MONTHLY REVENUE
    case GET_MONTHLY_REVENUE:
      return { ...state, loading: true };
    case GET_MONTHLY_REVENUE_SUCCESS:
      return { ...state, monthlyRevenue: action.payload, loading: false, error: null };
    case GET_MONTHLY_REVENUE_FAIL:
      return { ...state, error: action.payload, loading: false };

    // GET REVENUE IN RANGE
    case GET_REVENUE_IN_RANGE:
      return { ...state, loading: true };
    case GET_REVENUE_IN_RANGE_SUCCESS:
      return { ...state, revenueInRange: action.payload, loading: false, error: null };
    case GET_REVENUE_IN_RANGE_FAIL:
      return { ...state, error: action.payload, loading: false };

    // GET MONTHLY REVENUE
    case GET_GENERAL_STATISTIC:
      return { ...state, loading: true };
    case GET_GENERAL_STATISTIC_SUCCESS:
      return { ...state, generalStatistic: action.payload, loading: false, error: null };
    case GET_GENERAL_STATISTIC_FAIL:
      return { ...state, error: action.payload, loading: false };
    
    // GET MONTHLY PATIENTS
    case GET_MONTHLY_PATIENTS:
      return { ...state, loading: true };
    case GET_MONTHLY_PATIENTS_SUCCESS:
      return { ...state, monthlyPatient: action.payload, loading: false, error: null };
    case GET_MONTHLY_PATIENTS_FAIL:
      return { ...state, error: action.payload, loading: false };

    // GET MONTHLY MEDICAL
    case GET_MONTHLY_MEDICAL:
      return { ...state, loading: true };
    case GET_MONTHLY_MEDICAL_SUCCESS:
      return { ...state, monthlyMedical: action.payload, loading: false, error: null };
    case GET_MONTHLY_MEDICAL_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default statisticReducer;
