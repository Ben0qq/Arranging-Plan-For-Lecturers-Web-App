import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  appState: 'login',
  status: 'idle'
};

export const requestLogin = createAsyncThunk(
  'login/requestLogin',
  async(login, password) => {
    const response = await axios.post(
    'http://localhost:5000/api/users/login',
    {
      "email": login,
      'password': password
    }
  )
  setAppState('calendar');
    return response.data;
  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setAppState: (state, action) => {
      state.appState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(requestLogin.fulfilled, (state) => {
        state.status = 'idle';
      });
  },
});

export const { setAppState } = loginSlice.actions;

export const getAppState = (state) => state.login.appState

export default loginSlice.reducer;
