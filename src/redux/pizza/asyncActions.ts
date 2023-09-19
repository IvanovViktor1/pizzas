import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza, SearchPizzaParams } from "./types";
import  Axios  from "axios";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    "pizza/fetchPizzasStatus",
    async (params) => {
      const { sortBy, order, category, currentPage, search } = params;
      const { data } = await Axios.get(
        `https://64dfcc7d71c3335b25831222.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
      );
      return data;
    }
  );