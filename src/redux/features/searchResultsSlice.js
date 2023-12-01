import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import { apiClient } from "../../api/apiClient";

const excludedFields = new Set([
  "minPrice",
  "maxPrice",
  "totalCount",
  "currentPage",
  "isLoading",
]);

const cleanFilters = (filters) => {
  return Object.fromEntries(
    Object.entries(filters).filter(
      ([key, value]) =>
        value !== "" &&
        value !== undefined &&
        value !== null &&
        !excludedFields.has(key)
    )
  );
};

const prepareRequestParams = (newFilters, isRouteChanged) => {
  let requestParams = {
    ...newFilters,
    minPrice: "",
    maxPrice: "",
    totalCount: "",
    currentPage: "",
  };

  if (isRouteChanged) {
    requestParams.priceFrom = "";
    requestParams.priceTo = "";
  }

  return cleanFilters(requestParams);
};

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
      const requestParams = prepareRequestParams(newFilters, isRouteChanged);

      const data = await apiClient.searchRoutes(requestParams);
      if (data.error) {
        console.error("Error from server:", data.error);
        return;
      }

      if (isRouteChanged) {
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
            priceFrom: minPrice,
            priceTo: maxPrice,
          })
        );
      }

      dispatch(setRoutes({ totalCount: data.total_count, items: data.items }));

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
  isLoading: false,
  currentPage: 1,
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
  isExpress: false,
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
  offset: 0,
  sort: "date",
  totalCount: 0,
  limit: 5,
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
    setCurrentPage: (state, action) => {
      return {
        ...state,
        currentPage: action.payload,
      };
    },
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
    resetPagination: (state) => {
      return {
        ...state,
        currentPage: 1,
        offset: 0,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lastFilters = {
          fromCityId: action.meta.arg.fromCity.id,
          toCityId: action.meta.arg.toCity.id,
          dateStart: action.meta.arg.dateStart,
          dateEnd: action.meta.arg.dateEnd,
        };
      })
      .addCase(fetchRoutes.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Error from server:", action.error);
      });
  },
});

export const {
  setCurrentPage,
  setFilter,
  setRoutes,
  resetFilters,
  resetPagination,
} = searchResultsSlice.actions;
export default searchResultsSlice.reducer;

export const searchResultsPropTypes = {
  isLoading: PropTypes.bool,
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
