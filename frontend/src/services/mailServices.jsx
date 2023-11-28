import axios from 'axios';

export const sendMail = async (formData, token) => {
  const config = {
    headers: {
      authorization: token,
    },
  };
  return axios.post(`${import.meta.env.VITE_BASE_URL}/mails`, formData, config);
};

export const getMails = async (token) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  return axios.get(`${import.meta.env.VITE_BASE_URL}/mails`, config);
};
