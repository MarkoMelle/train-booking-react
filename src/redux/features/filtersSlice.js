/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import { apiClient } from "../../api/apiClient";
import { setRoutes } from "./routesSlice";

export const fetchRoutes = createAsyncThunk(
  "filters/fetchRoutes",
  async (newFilters, { dispatch, getState }) => {
    try {
      const { filters } = getState();

      const isRouteChanged =
        newFilters.fromCity.id !== filters.lastFilters.fromCityId ||
        newFilters.toCity.id !== filters.lastFilters.toCityId ||
        newFilters.dateStart !== filters.lastFilters.dateStart ||
        newFilters.dateEnd !== filters.lastFilters.dateEnd;
      if (isRouteChanged) {
        dispatch(setFilter({ priceFrom: "", priceTo: "" }));
        const updatedFilters = {
          ...newFilters,
          priceFrom: "",
          priceTo: "",
        };
        console.log(isRouteChanged, newFilters);
        const data = await apiClient.searchRoutes(updatedFilters);
        let minPrice = Infinity;
        let maxPrice = -Infinity;
        data.items.forEach((item) => {
          minPrice = Math.min(minPrice, item.min_price);
          maxPrice = Math.max(maxPrice, item.min_price);
        });
        minPrice = minPrice === Infinity ? 0 : minPrice;
        maxPrice = maxPrice === -Infinity ? 10000 : maxPrice;
        dispatch(
          setFilter({
            minPrice,
            maxPrice,
          })
        );
        dispatch(
          setRoutes({ totalCount: data.total_count, items: data.items })
        );
      } else {
        const data = await apiClient.searchRoutes(newFilters);
        dispatch(
          setRoutes({ totalCount: data.total_count, items: data.items })
        );
      }
      return {
        fromCityId: newFilters.fromCity.id,
        toCityId: newFilters.toCity.id,
        dateStart: newFilters.dateStart,
        dateEnd: newFilters.dateEnd,
      };
    } catch (error) {
      console.error("Failed to fetch routes:", error);
    }
  }
);

const filtersInitialState = {
  fromCity: {
    id: "",
    name: "",
  },
  toCity: {
    id: "",
    name: "",
  },
  dateStart: "",
  dateEnd: "",
  dateStartArrival: "",
  dateEndArrival: "",
  haveFirstClass: false,
  haveSecondClass: false,
  haveThirdClass: false,
  haveFourthClass: false,
  haveWifi: false,
  haveAirConditioning: false,
  haveExpress: false,
  priceFrom: "",
  priceTo: "",
  startDepartureHourFrom: "",
  startDepartureHourTo: "",
  startArrivalHourFrom: "",
  startArrivalHourTo: "",
  endDepartureHourFrom: "",
  endDepartureHourTo: "",
  endArrivalHourFrom: "",
  endArrivalHourTo: "",
  limit: "",
  offset: "",
  sort: "",
  minPrice: 0,
  maxPrice: 10000,
  lastFilters: {
    fromCityId: "",
    toCityId: "",
    dateStart: "",
    dateEnd: "",
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: filtersInitialState,
  reducers: {
    setFilter: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setLastFilters: (state, action) => {
      return {
        ...state,
        lastFilters: action.payload,
      };
    },
    resetFilters: () => filtersInitialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state) => {})
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        console.log("action", action.payload);
        state.lastFilters = {
          fromCityId: action.meta.arg.fromCity.id,
          toCityId: action.meta.arg.toCity.id,
          dateStart: action.meta.arg.dateStart,
          dateEnd: action.meta.arg.dateEnd,
        };
      })
      .addCase(fetchRoutes.rejected, (state, action) => {});
  },
});

export const { setFilter, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;

export const filtersPropTypes = {
  fromCity: PropTypes.object,
  toCity: PropTypes.object,
  dateStart: PropTypes.string,
  dateEnd: PropTypes.string,
  dateStartArrival: PropTypes.string,
  dateEndArrival: PropTypes.string,
  haveFirstClass: PropTypes.bool,
  haveSecondClass: PropTypes.bool,
  haveThirdClass: PropTypes.bool,
  haveFourthClass: PropTypes.bool,
  haveWifi: PropTypes.bool,
  haveAirConditioning: PropTypes.bool,
  haveExpress: PropTypes.bool,
  priceFrom: PropTypes.string,
  priceTo: PropTypes.string,
  startDepartureHourFrom: PropTypes.string,
  startDepartureHourTo: PropTypes.string,
  startArrivalHourFrom: PropTypes.string,
  startArrivalHourTo: PropTypes.string,
  endDepartureHourFrom: PropTypes.string,
  endDepartureHourTo: PropTypes.string,
  endArrivalHourFrom: PropTypes.string,
  endArrivalHourTo: PropTypes.string,
  limit: PropTypes.string,
  offset: PropTypes.string,
  sort: PropTypes.string,
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
};
