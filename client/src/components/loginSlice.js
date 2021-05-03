import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  appState: 'login'
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
	setAppState: (state, action) => {
	  console.log('johhnytest');
	  state.appState = action.payload;
	},
  },
});

export const { setAppState } = loginSlice.actions;

export const getAppState = (state) => state.login.appState

export default loginSlice.reducer;
