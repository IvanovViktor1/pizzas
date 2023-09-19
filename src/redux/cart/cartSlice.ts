import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { CartItemType, CartSliceState } from "./types";



const {items, totalPrice} = getCartFromLS()



const initialState: CartSliceState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id 
      );
      if (findItem) {
        findItem.count++;
      }
    },
    decrement(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id 
      );
      if (findItem) {
        findItem.count--;
      }
    },
    setCartItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id 
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeCartItem(state, action: PayloadAction<string>) {
      state.items = (state.items.filter(item => item.id !== action.payload))
      state.totalPrice = calcTotalPrice(state.items)
    },
    clearCartItems(state) {
      state.items = []; 
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState ) => state.cartSlice;
export const selectCartItems = (state: RootState) => state.cartSlice.items;
export const selectCartTotalPrice = (state: RootState) => state.cartSlice.totalPrice;

export const {
  setCartItem,
  removeCartItem,
  clearCartItems,
  increment,
  decrement,
} = cartSlice.actions;

export default cartSlice.reducer;
