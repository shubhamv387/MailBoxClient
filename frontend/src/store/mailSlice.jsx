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
