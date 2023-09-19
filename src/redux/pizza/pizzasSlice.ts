import {  createSlice } from "@reduxjs/toolkit";


import {  PizzaSliceState, Status } from "./types";
import { fetchPizzas } from "./asyncActions";







const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, 
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCSESS;
    })
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    })

  }
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
