import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FilterScliceState, SortPopup, SortPropertyEnum } from "./types";






const initialState: FilterScliceState = {
  searchValue: "",
  categoryId: 0,
  pageCount: 1,
  currentPage: 1,
  filters: "",
  sortType: {
    name: "популярности",
    sortProperty: SortPropertyEnum.RATING,
  },
  order: "asc"

};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<SortPopup>) {
      state.sortType = action.payload;
    },
    setOrder(state, action: PayloadAction<string>){
      state.order = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterScliceState>) {
      state.order = action.payload.order
      if (Object.keys(action.payload).length){
        state.sortType = action.payload.sortType;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.order = action.payload.order
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sortType = {
          name: "популярности",
          sortProperty: SortPropertyEnum.RATING,
        };
        state.order = "asc"
      }
      
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = Number(action.payload);
    },
    
  },
});

export const selectFilterSearchValue = (state: RootState) => state.filterSlice.searchValue;

export const { 
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
  setPageCount,
  setSearchValue,
  setOrder
} = filterSlice.actions;

export default filterSlice.reducer;
