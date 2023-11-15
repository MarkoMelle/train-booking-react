import { createSlice } from "@reduxjs/toolkit";
import PropTypes from "prop-types";

const routesInitialState = {
  totalCount: 0,
  items: [],
};

const routesSlice = createSlice({
  name: "routes",
  initialState: routesInitialState,
  reducers: {
    setRoutes: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetRoutes: () => routesInitialState,
  },
});

export const { setRoutes, resetRoutes } = routesSlice.actions;

export default routesSlice.reducer;

export const routesPropTypes = {
  totalCount: PropTypes.number,
  items: PropTypes.array,
};
