import { configureStore } from "@reduxjs/toolkit";
import searchResultsSlice from "./features/searchResultsSlice";
import seatsSlice from "./features/seatsSlice";

export const store = configureStore({
  reducer: {
    searchResults: searchResultsSlice,
    seats: seatsSlice,
  },
});
