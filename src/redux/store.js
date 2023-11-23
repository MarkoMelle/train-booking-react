import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./features/testSlice";
import searchResultsSlice from "./features/searchResultsSlice";
import seatsSlice from "./features/seatsSlice";

export const store = configureStore({
  reducer: {
    test: testSlice,
    searchResults: searchResultsSlice,
    seats: seatsSlice,
  },
});
