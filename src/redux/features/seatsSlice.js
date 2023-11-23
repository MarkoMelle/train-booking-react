import { createSlice } from "@reduxjs/toolkit";
import PropTypes from "prop-types";

const seatsInitialState = {
  filters: {
    id: "",
    haveFirstClass: false,
    haveSecondClass: false,
    haveThirdClass: false,
    haveFourthClass: false,
    haveWifi: false,
    haveAirConditioning: false,
    haveExpress: false,
  },
  seatsInfo: {
    seats: [
      {
        _id: "",
        name: "",
        classType: "",
        haveFirstClass: false,
        haveSecondClass: false,
        haveThirdClass: false,
        haveFourthClass: false,
        haveWifi: false,
        haveAirConditioning: false,
        haveExpress: false,
        price: 0,
        topPrice: 0,
        bottomPrice: 0,
        sidePrice: 0,
        linensPrice: 0,
        wifiPrice: 0,
        availableSeats: 0,
        isLinensIncluded: false,
        seats: [
          {
            index: 0,
            available: false,
          },
        ],
      },
    ],
  },
  selectedSeats: [
    {
      type: "",
      seatNumber: 0,
      price: 0,
    },
  ],
};

const seatsSlice = createSlice({
  name: "seats",
  initialState: seatsInitialState,
  reducers: {
    setFilter(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setCurrentTicket(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setFilter, setCurrentTicket } = seatsSlice.actions;
export default seatsSlice.reducer;

seatsSlice.propTypes = {
  filters: PropTypes.shape({
    id: PropTypes.string,
    haveFirstClass: PropTypes.bool,
    haveSecondClass: PropTypes.bool,
    haveThirdClass: PropTypes.bool,
    haveFourthClass: PropTypes.bool,
    haveWifi: PropTypes.bool,
    haveAirConditioning: PropTypes.bool,
    haveExpress: PropTypes.bool,
  }),
  seatsInfo: PropTypes.shape({
    seats: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        classType: PropTypes.string,
        haveFirstClass: PropTypes.bool,
        haveSecondClass: PropTypes.bool,
        haveThirdClass: PropTypes.bool,
        haveFourthClass: PropTypes.bool,
        haveWifi: PropTypes.bool,
        haveAirConditioning: PropTypes.bool,
        haveExpress: PropTypes.bool,
        price: PropTypes.number,
        topPrice: PropTypes.number,
        bottomPrice: PropTypes.number,
        sidePrice: PropTypes.number,
        linensPrice: PropTypes.number,
        wifiPrice: PropTypes.number,
        availableSeats: PropTypes.number,
        isLinensIncluded: PropTypes.bool,
        seats: PropTypes.arrayOf(
          PropTypes.shape({
            index: PropTypes.number,
            available: PropTypes.bool,
          })
        ),
      })
    ),
  }),
  selectedSeats: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      seatNumber: PropTypes.number,
      price: PropTypes.number,
    })
  ),
};
