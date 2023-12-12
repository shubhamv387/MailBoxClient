import { createSlice } from '@reduxjs/toolkit';
import {
  getMails,
  getSingleMailApiCall,
  updateMailApiCall,
} from '../services/mailServices';
import { STATUS } from './helper';
import toast from 'react-hot-toast';
import { AuthActions } from './authSlice';

const initialState = {
  allMails: [],
  sent: [],
  inbox: [],
  unreadMails: 0,
  singleMail: {},
  status: STATUS.IDLE,
};

const mailSlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    sendMail: (state, action) => {
      state.allMails.push(action.payload);
    },

    getAllMails: (state, action) => {
      if (action.payload.type === 'sent') state.sent = action.payload.allMails;
      else if (action.payload.type === 'inbox')
        state.inbox = action.payload.allMails;
      else state.allMails = action.payload.allMails;

      if (action.payload.unreadMails !== undefined)
        state.unreadMails = action.payload.unreadMails;
    },

    getSingleMail: (state, action) => {
      state.singleMail = action.payload;
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

    updateUnreadMailCount: (state) => {
      if (state.unreadMails <= 0) state.unreadMails = 0;
      else state.unreadMails -= 1;
    },

    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

//thunk
export const getAllMailsThunk = (token, type) => {
  return async (dispatch, getState) => {
    dispatch(MailActions.setStatus(STATUS.LOADING));
    try {
      // console.log('thunk');
      const {
        data: { success, allMails, unreadMails },
      } = await getMails(token, type);

      if (success) {
        dispatch(MailActions.getAllMails({ allMails, unreadMails, type }));
        dispatch(MailActions.setStatus(STATUS.SUCCESS));
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        'Failed to get mails!';
      toast.error(errMsg);
      console.log(error);
      error.response?.data?.unAuthorized && dispatch(AuthActions.logout());
      dispatch(MailActions.setStatus(STATUS.ERROR));
    }
  };
};

export const fetchSingleMailThunk = (_id, token, type) => {
  return async (dispatch, getState) => {
    dispatch(MailActions.setStatus(STATUS.LOADING));
    try {
      const {
        data: { success, mail, message },
      } = await getSingleMailApiCall(_id, token, type);

      if (!success) throw new Error(message);

      dispatch(MailActions.getSingleMail(mail));
      dispatch(MailActions.setStatus(STATUS.IDLE));

      if (type === 'inbox' && success && !mail.markasread) {
        const { data } = await updateMailApiCall(
          _id,
          { markasread: true },
          token,
          type
        );

        if (data.success) {
          dispatch(MailActions.getSingleMail({ ...mail, markasread: true }));
          dispatch(MailActions.updateUnreadMailCount());
        }
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message || error.message || 'Failed to get mail!';
      toast.error(errMsg);
      console.log(error);
      dispatch(MailActions.setStatus(STATUS.ERROR));
      error.response?.data?.unAuthorized && dispatch(AuthActions.logout());
    }
  };
};

export const MailActions = mailSlice.actions;

export default mailSlice.reducer;
