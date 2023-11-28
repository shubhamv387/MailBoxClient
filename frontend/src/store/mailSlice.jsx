import { createSlice } from '@reduxjs/toolkit';

const initialState = { allMails: [] };

const mailSlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    sendMail: (state, action) => {
      state.allMails.push(action.payload);
    },

    getAllMails: (state, action) => {
      state.allMails = action.payload;
    },

    resetMailState: (state) => {
      state.allMails = [];
    },
  },
});

export const MailActions = mailSlice.actions;

export default mailSlice.reducer;
