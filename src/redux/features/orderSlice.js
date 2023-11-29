import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    passengers: []
  },
  reducers: {
    updatePassenger: (state, action) => {
      const { index, data } = action.payload;
      state.passengers[index] = data;
    },
    initializePassengers: (state, action) => {
      state.passengers = action.payload.map(() => ({
        person_info: {},
        seat_number: null,
        include_children_seat: false
      }));
    }
  },
});

export const { updatePassenger, initializePassengers } = orderSlice.actions;

export default orderSlice.reducer;
