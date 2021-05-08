import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../components/Login/loginSlice'
import calendarReducer from '../components/Calendar/calendarSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    calendar: calendarReducer,
  },
});
