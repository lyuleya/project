import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/sign-in`, {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (name, email, password) => {
  await axios.post(`${API_URL}/auth/sign-up`, { name, email, password });
};

export const fetchRooms = async () => {
  const response = await axios.get(`${API_URL}/rooms`);
  return response.data;
};

export const fetchFilteredRooms = async (filters) => {
  const response = await axios.post(`${API_URL}/rooms/available`, filters);
  return response.data;
};

export const fetchRoomDetails = async (roomId) => {
  const response = await axios.get(`${API_URL}/rooms/${roomId}`);
  return response.data;
};

export const fetchUserBookings = async (userId) => {
  const response = await axios.get(`${API_URL}/bookings/user/${userId}`);
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await axios.post(`${API_URL}/bookings`, bookingData);
  return response.data;
};

export const deleteBooking = async (bookingId) => {
  await axios.delete(`${API_URL}/bookings/${bookingId}`);
};