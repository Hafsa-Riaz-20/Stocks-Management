import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counterSlice'
import stockReducer from './stockSlice'

export const store = configureStore({
  reducer : {
    counter : counterReducer,
    stock : stockReducer
  },
});
