import { createSlice } from "@reduxjs/toolkit";
import PropTypes from "prop-types";

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
    resetFilters: () => filtersInitialState,
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
};
