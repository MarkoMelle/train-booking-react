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
      state.message = action.payload;
    },
    hideSnackBar: (state) => {
      state.open = false;
      state.message = '';
    }
  }
});

export const { showSnackBar, hideSnackBar } = notificationsSlice.actions;
export default notificationsSlice.reducer;
