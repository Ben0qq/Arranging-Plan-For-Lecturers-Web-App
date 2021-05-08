import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  appState: 'login',
  status: 'idle',
  loginResponse: '',
  alertType: '',
  alertText: '',
  alertOpen: false,
};

export const requestLogin = createAsyncThunk(
  'login/requestLogin',
  async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        {
          'email': data.login,
          'password': data.password
        }
      )   
      return response.data;
    } catch (error) {
      console.log(error.response.data)
      return(error.response.data)
    }
  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setAppState: (state, action) => {
      state.appState = action.payload;
    },
    setAlertOpen: (state,action) => {
      state.alertOpen = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(requestLogin.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.status === 'success') {
          state.appState = 'calendar'
          state.alertType = 'success'
          state.alertText = 'Logged Successfully'
          state.alertOpen = true
        }else{
          state.alertType = 'error'
          state.alertText = action.payload.message
          state.alertOpen = true
        }
      });
  },
});

export const { setAppState, setAlertOpen } = loginSlice.actions;

export const getAppState = (state) => state.login.appState

export const getAlertType = (state) => state.login.alertType

export const getAlertText = (state) => state.login.alertText

export const getAlertOpen = (state) => state.login.alertOpen


export default loginSlice.reducer;
