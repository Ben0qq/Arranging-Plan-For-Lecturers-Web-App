import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../components/Login/loginSlice'
import calendarReducer from '../components/Calendar/calendarSlice'
import adminPanelReducer from '../components/AdminPanel/adminPanelSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    calendar: calendarReducer,
    adminPanel: adminPanelReducer
  },
});
