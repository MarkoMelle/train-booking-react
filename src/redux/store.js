import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./features/testSlice";
import searchResultsSlice from "./features/searchResultsSlice";

export const store = configureStore({
  reducer: {
    test: testSlice,
    searchResults: searchResultsSlice,
    // filters: filtersSlice,
  },
});
