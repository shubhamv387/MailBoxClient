import axios from 'axios';

export const validateToken = (token) => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/users/validate-token`, {
    headers: { authorization: token },
  });
};

export const registerUser = async (userDetails) => {
  return axios.post(
    `${import.meta.env.VITE_BASE_URL}/users/register`,
    userDetails
  );
};

export const loginUser = async (loginData) => {
  return axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, loginData);
};

export const ForgotPasswordReq = (email) => {
  return axios.post(
    `${import.meta.env.VITE_BASE_URL}/password/forgot-password`,
    { email }
  );
};

export const GetResetPasswordReq = (uuid) => {
  return axios.get(
    `${import.meta.env.VITE_BASE_URL}/password/reset-password/${uuid}`
  );
};

export const PostResetPasswordReq = (uuid, formData) => {
  return axios.post(
    `${import.meta.env.VITE_BASE_URL}/password/reset-password/${uuid}`,
    formData
  );
};

export const getUserProfile = async (_id, config) => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/users/${_id}`, config);
};

export const updateUserProfile = async (_id, config, updatedProfile) => {
  return axios.put(
    `${import.meta.env.VITE_BASE_URL}/users/${_id}`,
    updatedProfile,
    config
  );
};
