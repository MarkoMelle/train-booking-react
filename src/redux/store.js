import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./features/testSlice";
import filtersSlice from "./features/filtersSlice";

export const store = configureStore({
   reducer: {
      test: testSlice,
      filters: filtersSlice,
   },
});