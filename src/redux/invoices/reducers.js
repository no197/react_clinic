import {
  GET_INVOICES,
  GET_INVOICES_FAIL,
  GET_INVOICES_SUCCESS,
  GET_INVOICE_DETAIL,
  GET_INVOICE_DETAIL_FAIL,
  GET_INVOICE_DETAIL_SUCCESS,
  UPDATE_INVOICE,
  UPDATE_INVOICE_FAIL,
  UPDATE_INVOICE_SUCCESS,
} from './constant';

const INIT_STATE = {
  invoices: null,
  loading: false,
};

const invoiceReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    // GET ALL INVOICES
    case GET_INVOICES:
      return { ...state, loading: true };
    case GET_INVOICES_SUCCESS:
      return { ...state, invoices: action.payload, loading: false, error: null };
    case GET_INVOICES_FAIL:
      return { ...state, error: action.payload, loading: false };

    // GET invoice DETAIl
    case GET_INVOICE_DETAIL:
      return { ...state, loading: true };
    case GET_INVOICE_DETAIL_SUCCESS:
      return { ...state, invoice: action.payload, loading: false, error: null };
    case GET_INVOICE_DETAIL_FAIL:
      return { ...state, error: action.payload, loading: false };

    case UPDATE_INVOICE:
      return { ...state, loading: true };
    case UPDATE_INVOICE_SUCCESS:
      let itemsEx = state.invoices
        ? state.invoices.items.filter((item) => item.invoiceId !== action.payload.invoiceId)
        : [];

      let items = state.invoices ? [...itemsEx, action.payload] : [action.payload];
      let totalItems = items.length;

      return { ...state, invoices: { ...state.invoices, items, totalItems }, loading: false, error: null };
    case UPDATE_INVOICE_FAIL:
      return { ...state, error: action.payload, loading: false };

    default:
      return { ...state };
  }
};

export default invoiceReducer;
