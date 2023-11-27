import { configureStore } from '@reduxjs/toolkit';
import AuthReducers from './authSlice';
import ThemeReducers from './themeSlice';

const store = configureStore({
  reducer: {
    theme: ThemeReducers,
    auth: AuthReducers,
  },
});

export default store;
