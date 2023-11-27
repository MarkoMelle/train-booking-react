import { createSlice } from "@reduxjs/toolkit";

const seatsInitialState = {
  isSelectSeats: false,
  routeId: null,
  routeIdBack: null,
  currentRoute: null,
  currentRouteBack: null,
  seatsFilter: {
    haveFirstClass: null,
    haveSecondClass: null,
    haveThirdClass: null,
    haveFourthClass: null,
    haveWifi: null,
    haveAirConditioning: null,
    haveExpress: null,
  },
  seatsFilterBack: {
    id: null,
    haveFirstClass: null,
    haveSecondClass: null,
    haveThirdClass: null,
    haveFourthClass: null,
    haveWifi: null,
    haveAirConditioning: null,
    haveExpress: null,
  },
  seatsInfo: {},
  seatsInfoBack: {},
  selectedSeats: [],
  selectedSeatsBack: [],
};

const seatsSlice = createSlice({
  name: "seats",
  initialState: seatsInitialState,
  reducers: {
    toggleSelectSeats(state) {
      state.isSelectSeats = !state.isSelectSeats;
    },
    setCurrentRoute(state, action) {
      state.currentRoute = action.payload;
    },
    setCurrentRouteBack(state, action) {
      state.currentRouteBack = action.payload;
    },
    setRouteId(state, action) {
      state.routeId = action.payload;
    },
    setRouteIdBack(state, action) {
      state.routeIdBack = action.payload;
    },
    setSeatsInfo(state, action) {
      state.seatsInfo = action.payload;
    },
    setSeatsInfoBack(state, action) {
      state.seatsInfoBack = action.payload;
    },
    setSelectedSeats(state, action) {
      state.selectedSeats = action.payload;
    },
    setSelectedSeatsBack(state, action) {
      state.selectedSeatsBack = action.payload;
    },
    resetRoute(state) {
      state.routeId = null;
      state.currentRoute = null;
      state.routeIdBack = null;
      state.currentRouteBack = null;
      state.seatsInfo = {};
      state.selectedSeats = [];
    },
  },
});

export const {
  toggleSelectSeats,
  setCurrentRoute,
  setCurrentRouteBack,
  setRouteId,
  setRouteIdBack,
  setSeatsInfo,
  setSeatsInfoBack,
  setSelectedSeats,
  setSelectedSeatsBack,
  resetRoute,
} = seatsSlice.actions;
export default seatsSlice.reducer;
