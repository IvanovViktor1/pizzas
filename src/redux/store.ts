import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filter/filterSlice";
import cartSlice from "./cart/cartSlice";
import pizzasSlice from "./pizza/pizzasSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizzasSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch