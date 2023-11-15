import { createSlice } from '@reduxjs/toolkit';

export const testSlice = createSlice({
  name: 'test',
  initialState: {
   currentTrip: {
      trainNumber: "116С",
      direction: ["Москва", "Санкт-Петербург"],
      departureTime: ["00:10", "09:52"],
      departureStation: ["Курский вокзал", "Ладожский вокзал"],
      arrivalTime: ["00:10", "09:52"],
      arrivalStation: ["Курский вокзал", "Ладожский вокзал"],
      sitClasses: [
        {
          name: "Сидячий",
          available: { all: 88, upper: 22, lower: 66 },
          price: { from: 1920, upper: 1920, lower: 2130 },
        },
        {
          name: "Плацкарт",
          available: { all: 52, upper: 12, lower: 40 },
          price: { from: 3820, upper: 3820, lower: 4130 },
        },
        {
          name: "Купе",
          available: { all: 24, upper: 19, lower: 5 },
          price: { from: 6820, upper: 6820, lower: 7130 },
        },
        {
          name: "Люкс",
          available: { all: 18, upper: 11, lower: 7 },
          price: { from: 11820, upper: 11820, lower: 12130 },
        },
      ],
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = testSlice.actions;

export default testSlice.reducer;
