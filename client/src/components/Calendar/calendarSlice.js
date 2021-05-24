import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  dialogOpen: false,
  status: 'idle',
  courses: [],
  day: '',
  hour: '',
};

export const requestAllCourses = createAsyncThunk(
  'calendar/requestAll',
  async (data) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/courses/',
        {
          headers:{
            'Authorization': 'Bearer ' + data
          }
        }
      )   
      return response.data;
    } catch (error) {
      console.log(error.response.data)
      return(error.response.data)
    }
  }
)

export const teachCourse = createAsyncThunk(
  'calendar/teachOne',
  async (data) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/courses/',
        {
          headers:{
            'Authorization': 'Bearer ' + data
          }
        }
      )   
      return response.data;
    } catch (error) {
      console.log(error.response.data)
      return(error.response.data)
    }
  }
)

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDialogOpen: (state, action) => {
      state.dialogOpen = action.payload;
    },
    setHour: (state, action) => {
      state.hour = action.payload;
    },
    setDay: (state, action) => {
      state.day = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestAllCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(requestAllCourses.fulfilled, (state, action) => {
        state.courses = action.payload.data.doc
        state.status = 'idle';
      });
  },
});

export const { setDialogOpen, setDay, setHour } = calendarSlice.actions;

export const getDialogOpen = (state) => state.calendar.dialogOpen

export const getDay = (state) => state.calendar.day

export const getHour = (state) => state.calendar.hour

export const getCourses = (state) => state.calendar.courses

export default calendarSlice.reducer;
