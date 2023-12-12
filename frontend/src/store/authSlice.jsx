import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token') || null;
const username = localStorage.getItem('username') || 'User';

const initialState = { token, isLoggedIn: !!token, username };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.userDetails.email
        .split('@')[0]
        .substring(0, 12);
      state.isLoggedIn = true;
      localStorage.setItem('token', state.token);
      localStorage.setItem('username', state.username);
    },

    logout: (state) => {
      state.token = null;
      state.username = 'USER';
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('theme');
    },
  },
});

export const AuthActions = authSlice.actions;
export default authSlice.reducer;
