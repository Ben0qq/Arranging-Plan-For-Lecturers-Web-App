import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dialogOpen: false,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDialogOpen: (state, action) => {
      state.dialogOpen = action.payload;
    }
  }
});

export const { setDialogOpen } = calendarSlice.actions;

export const getDialogOpen = (state) => state.calendar.dialogOpen

export default calendarSlice.reducer;
