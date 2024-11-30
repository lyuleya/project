import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/sign-in`, {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (name, email, password, role) => {
  await axios.post(`${API_URL}/auth/sign-up`, { name, email, password, role });
};

export const fetchRooms = async () => {
  const response = await axios.get(`${API_URL}/rooms`);
  return response.data;
};
