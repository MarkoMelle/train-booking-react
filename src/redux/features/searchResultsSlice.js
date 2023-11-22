/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import { apiClient } from "../../api/apiClient";


export const fetchRoutes = createAsyncThunk(
  "searchResults/fetchRoutes",
  async (newFilters, { dispatch, getState }) => {
    try {
      const { searchResults } = getState();
      const isRouteChanged =
        newFilters.fromCity.id !== searchResults.lastFilters.fromCityId ||
        newFilters.toCity.id !== searchResults.lastFilters.toCityId ||
        newFilters.dateStart !== searchResults.lastFilters.dateStart ||
        newFilters.dateEnd !== searchResults.lastFilters.dateEnd;
      
      if (isRouteChanged) {
        dispatch(setFilter({ priceFrom: "", priceTo: "" }));
        const requestParams = {
          ...newFilters,
          priceFrom: "",
          priceTo: "",
          minPrice: "",
          maxPrice: "",
        };
        const data = await apiClient.searchRoutes(requestParams);
        if (data.error) {
          console.error("Error from server:", data.error);
          return; 
        }
        
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
        const requestParams = {
          ...newFilters,
           minPrice: '',
            maxPrice: '',
        };
        const data = await apiClient.searchRoutes(requestParams);
        if (data.error) {
          console.error("Error from server:", data.error);
          return; 
        }
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

const searchResultsInitialState = {
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
  limit: 5,
  offset: 0,
  sort: "date",
  totalCount: 0,
  items: [],
  minPrice: 0,
  maxPrice: 10000,
  lastFilters: {
    fromCityId: "",
    toCityId: "",
    dateStart: "",
    dateEnd: "",
  },
};

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState: searchResultsInitialState,
  reducers: {
    setFilter: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setRoutes: (state, action) => {
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
    resetFilters: () => searchResultsInitialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state) => {})
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        
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

export const { setFilter, setRoutes, resetFilters } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;

export const searchResultsPropTypes = {
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
  sort: PropTypes.string[("date", "price", "duration")],
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
};
