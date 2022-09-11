import { configureStore } from '@reduxjs/toolkit'
import invoiceReducer from '../features/invoiceSlice'
export const store = configureStore({
  reducer: {
    invoice: invoiceReducer
  },
})