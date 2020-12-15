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

// GET ALL INVOICES
export const getInvoices = () => ({
  type: GET_INVOICES,
  // payload:,
});

export const getInvoicesSuccess = (invoices) => ({
  type: GET_INVOICES_SUCCESS,
  payload: invoices,
});

export const getInvoicesFail = (error) => ({
  type: GET_INVOICES_FAIL,
  payload: error,
});

// GET Invoice DETAIL
export const getInvoiceDetail = (id) => ({
  type: GET_INVOICE_DETAIL,
  payload: id,
});

export const getInvoiceDetailSuccess = (invoice) => ({
  type: GET_INVOICE_DETAIL_SUCCESS,
  payload: invoice,
});

export const getInvoiceDetailFail = (error) => ({
  type: GET_INVOICE_DETAIL_FAIL,
  payload: error,
});

// UPDATE INVOICE
export const updateInvoice = (invoice) => ({
  type: UPDATE_INVOICE,
  payload: invoice,
});

export const updateInvoiceSuccess = (invoice) => ({
  type: UPDATE_INVOICE_SUCCESS,
  payload: invoice,
});

export const updateInvoiceFail = (error) => ({
  type: UPDATE_INVOICE_FAIL,
  payload: error,
});
