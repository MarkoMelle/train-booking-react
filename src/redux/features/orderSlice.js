import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    firstName: "",
    lastName: "",
    patronymic: "",
    email: "",
    phone: "",
    payment_method: "cash",
  },
  passengers: [],
  orderPassengers: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    updatePassenger: (state, action) => {
      const { index, data } = action.payload;
      state.passengers[index] = data;

      let documentData;
      if (data.documentType === "passport") {
        documentData = data.passportSeries + data.passportNumber;
      } else if (data.documentType === "birthCertificate") {
        documentData = { birthCertificateNumber: data.birthCertificateNumber };
      } else {
        documentData = { passportForeignNumber: data.passportForeignNumber };
      }
      let gender;
      if (data.gender === "male") {
        gender = true;
      } else {
        gender = false;
      }
      state.orderPassengers[index] = {
        ...state.orderPassengers[index],
        person_info: {
          ...state.orderPassengers[index].person_info,
          first_name: data.firstName,
          last_name: data.lastName,
          patronymic: data.patronymic,
          gender: gender,
          birthday: data.birthday,
          document_type: data.documentType,
          document_data: documentData,
        },
      };
    },
    initializePassengers: (state, action) => {
      state.orderPassengers = action.payload.map((passenger) => ({
        coach_id: passenger.wagonId,
        person_info: {
          is_adult: passenger.type === "adult",
        },
        include_children_seat: passenger.infant,
        is_child: passenger.type !== "adult",
        seat_number: passenger.seatNumber,
      }));
      state.passengers = action.payload.map((seat) => ({
        first_name: "",
        last_name: "",
        patronymic: "",
        birthday: "",
        gender: "",
        document_type: seat.type === "adult" ? "passport" : "birthCertificate",
        document_data: {
          passportSeries: "",
          passportNumber: "",
          passportForeignNumber: "",
          birthCertificateNumber: "",
        },
      }));
    },
    resetOrder: () => initialState,
  },
});

export const {
  updateUserInfo,
  updatePassenger,
  initializePassengers,
  resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
