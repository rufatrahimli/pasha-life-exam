import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [],
  selectedInvoice: {},
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload;
    },
    setSelectedInvoice: (state, action) => {
      state.selectedInvoice = action.payload;
    },
    updateSelectedInvoiceItems: (state, action) => {
      state.selectedInvoice.itemAmount = action.payload.itemAmount;
      state.selectedInvoice.sum = action.payload.sum;
      state.selectedInvoice.invoiceItems = action.payload.invoiceItems;
      let newState = state.invoices.map((item) => {
        if (item.id === state.selectedInvoice.id) {
          return (item = state.selectedInvoice);
        }
        return item;
      });
      state.invoices = newState;
    },
    removeInvoice: (state) => {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== state.selectedInvoice.id
      );
    },
    addInvoice: (state, action) => {
      console.log(action.payload);

      state.invoices = [...state.invoices, action.payload];
      console.log(state.invoices);
    },
    changeInvoiceStatus: (state, action) => {
      state.invoices = state.invoices.map((invoice) => {
        if (invoice.id === state.selectedInvoice.id) {
          invoice.status = action.payload;
        }
        return invoice;
      });
    },
  },
});

export const {
  setInvoices,
  setSelectedInvoice,
  removeInvoice,
  changeInvoiceStatus,
  addInvoice,
  updateSelectedInvoiceItems,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
