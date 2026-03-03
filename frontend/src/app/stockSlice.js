import { createSlice } from "@reduxjs/toolkit";

export const stockSlice = createSlice({
  name : "stock",

  initialState: {
    value : [],
  },

  reducers : {
    changeData : (state,action) => {
      state.value = action.payload;
    },
  },
});

export const {changeData} = stockSlice.actions;
export default stockSlice.reducer;
