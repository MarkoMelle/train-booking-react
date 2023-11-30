import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  message: ''
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showSnackBar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideSnackBar: (state) => {
      state.open = false;
      state.message = '';
      state.type = '';
    }
  }
});

export const { showSnackBar, hideSnackBar } = notificationsSlice.actions;
export default notificationsSlice.reducer;
