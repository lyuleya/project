import axios from "axios";

const API_URL = "http://localhost:5001/api";

const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/sign-in`, {
    email,
    password,
  });
  return response.data;
};

const registerUser = async (name, email, password, role) => {
  await axios.post(`${API_URL}/auth/sign-up`, { name, email, password, role });
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
  createBooking,
  deleteBooking,
  fetchAllBookings,
  fetchFilteredBookings,
  fetchFilteredRooms,
  fetchRoomDetails,
  fetchRooms,
  fetchUserBookings,
  loginUser,
  registerUser,
};
