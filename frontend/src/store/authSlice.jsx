import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token') || null;

const initialState = { token, isLoggedIn: !!token };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
  },
});

export const AuthActions = authSlice.actions;
export default authSlice.reducer;
