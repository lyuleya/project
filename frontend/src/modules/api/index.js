import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/sign-in`, {
    email,
    password,
  });
  return response.data;
};

const registerUser = async (name, email, password) => {
  await axios.post(`${API_URL}/auth/sign-up`, { name, email, password });
};

const fetchRooms = async () => {
  const response = await axios.get(`${API_URL}/rooms`);
  return response.data;
};

const fetchFilteredRooms = async (filters) => {
  const response = await axios.post(`${API_URL}/rooms/available`, filters);
  return response.data;
};

const fetchRoomDetails = async (roomId) => {
  const response = await axios.get(`${API_URL}/rooms/${roomId}`);
  return response.data;
};

const fetchAllBookings = async () => {
  const response = await axios.get(`${API_URL}/bookings`);
  return response.data;
};

const fetchFilteredBookings = async (filters) => {
  const response = await axios.post(`${API_URL}/bookings/filter`, filters);
  return response.data;
};

const fetchUserBookings = async (userId) => {
  const response = await axios.get(`${API_URL}/bookings/user/${userId}`);
  return response.data;
};

const createBooking = async (bookingData) => {
  const response = await axios.post(`${API_URL}/bookings`, bookingData);
  return response.data;
};

const deleteBooking = async (bookingId) => {
  await axios.delete(`${API_URL}/bookings/${bookingId}`);
};

export {
  loginUser,
  registerUser,
  fetchRooms,
  fetchFilteredRooms,
  fetchRoomDetails,
  fetchAllBookings,
  fetchFilteredBookings,
  fetchUserBookings,
  createBooking,
  deleteBooking,
};