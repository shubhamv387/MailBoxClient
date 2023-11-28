import { configureStore } from '@reduxjs/toolkit';
import AuthReducers from './authSlice';
import ThemeReducers from './themeSlice';
import MailReducers from './mailSlice';

const store = configureStore({
  reducer: {
    theme: ThemeReducers,
    auth: AuthReducers,
    mail: MailReducers,
  },
});

export default store;
