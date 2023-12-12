import axios from 'axios';

export const sendMail = async (formData, token) => {
  const config = {
    headers: {
      authorization: token,
    },
  };
  return axios.post(`${import.meta.env.VITE_BASE_URL}/mails`, formData, config);
};

export const getMails = async (token, type) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  return axios.get(`${import.meta.env.VITE_BASE_URL}/mails/${type}`, config);
};

export const getSingleMailApiCall = async (_id, token, type) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  return axios.get(
    `${import.meta.env.VITE_BASE_URL}/mails/${type}/${_id}`,
    config
  );
};

export const updateMailApiCall = async (_id, formData, token, type) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  return axios.put(
    `${import.meta.env.VITE_BASE_URL}/mails/${type}/${_id}`,
    formData,
    config
  );
};

export const deleteMailApiCall = async (_id, token, type) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  return axios.delete(
    `${import.meta.env.VITE_BASE_URL}/mails/${type}/${_id}`,
    config
  );
};
