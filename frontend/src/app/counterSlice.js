import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name : "counter",

  initialState: {
    value : [],
  },

  reducers : {
    addStock : (state,action) => {
      state.value = [...state.value,action.payload];
    },
    setStock : (state, action) => {
      state.value = action.payload;
    },
    setQuantity : (state, action) => {
      state.value[action.payload.index].quantity = action.payload.quantity;
    }
  },
});

export const {addStock,setStock,setQuantity} = counterSlice.actions;
export default counterSlice.reducer;
