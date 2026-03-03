import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counterSlice'
import stockReducer from './stockSlice'

const store = configureStore({
  reducer : {
    counter : counterReducer,
    stock : stockReducer
  },
})

export default store;
