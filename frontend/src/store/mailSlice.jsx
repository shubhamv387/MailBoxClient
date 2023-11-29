import { createSlice } from '@reduxjs/toolkit';

const initialState = { allMails: [], unreadMails: 0 };

const mailSlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    sendMail: (state, action) => {
      state.allMails.push(action.payload);
    },

    getAllMails: (state, action) => {
      state.allMails = action.payload.allMails;
      if (action.payload.unreadMails !== undefined)
        state.unreadMails = action.payload.unreadMails;
    },

    resetMailState: (state) => {
      state.allMails = [];
      state.unreadMails = 0;
    },

    updateMail: (state, action) => {
      const mailIndex = state.allMails.findIndex(
        (mail) => mail._id === action.payload._id
      );

      const mail = state.allMails[mailIndex];

      if (mail) {
        let updatedMail = { ...mail, ...action.payload.mail };
        state.allMails[mailIndex] = updatedMail;
      }
    },
  },
});

export const MailActions = mailSlice.actions;

export default mailSlice.reducer;
