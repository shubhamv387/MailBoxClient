import { createSlice } from '@reduxjs/toolkit';

const initialState = { theme: localStorage.getItem('theme') || 'system' };

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      switch (action.payload) {
        case 'dark-blue':
          document
            .querySelector('html')
            .setAttribute('data-theme', 'dark-blue');
          localStorage.setItem('theme', 'dark-blue');
          state.theme = 'dark-blue';
          break;

        case 'light':
          document.querySelector('html').setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
          state.theme = 'light';
          break;

        default:
          localStorage.removeItem('theme');
          state.theme = 'system';
          if (darkQuery.matches) {
            document.querySelector('html').setAttribute('data-theme', 'dark');
          } else {
            document.querySelector('html').setAttribute('data-theme', 'light');
          }
          break;
      }
    },
  },
});

export const ThemeActions = themeSlice.actions;

export default themeSlice.reducer;
