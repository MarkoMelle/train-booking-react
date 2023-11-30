import { configureStore } from "@reduxjs/toolkit";
import searchResultsSlice from "./features/searchResultsSlice";
import seatsSlice from "./features/seatsSlice";
import notificationsReducer from "./features/notificationsSlice";
import orderReducer from "./features/orderSlice";

export const store = configureStore({
  reducer: {
    searchResults: searchResultsSlice,
    seats: seatsSlice,
    notifications: notificationsReducer,
    order: orderReducer,
  },
});
