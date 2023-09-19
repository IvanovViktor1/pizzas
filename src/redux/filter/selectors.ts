import { RootState } from '../store';

export const selectFilter = (state: RootState) => state.filterSlice;

export const selectFilterCurrentPage = (state: RootState) => state.filterSlice.currentPage;

export const selectFilterPageCount = (state: RootState) => state.filterSlice.pageCount;

export const selectSort = (state: RootState) => state.filterSlice.sortType;

export const selectOrder = (state: RootState) => state.filterSlice.order;