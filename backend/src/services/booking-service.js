import fs from "fs";
import roomService from "./room-service.js";

const BOOKINGS_FILE = "./src/data/bookings.json";

const loadBookings = () => {
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.debug("Error loading bookings:", error);
    return [];
  }
};

const saveBookings = (bookings) => {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");
  } catch (error) {
    console.debug("Error saving bookings:", error);
  }
};

const addBooking = ({ userId, roomId, date, nights, totalPrice, status }) => {
  const startDate = new Date(date);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + nights);

  const roomAvailable = roomService.isRoomAvailable(roomId, startDate, endDate);
  if (!roomAvailable) {
    throw new Error("ROOM_NOT_AVAILABLE");
  }

  const bookings = loadBookings();
  const newBooking = {
    id: Date.now().toString(),
    userId,
    roomId,
    date: startDate.toISOString(),
    nights,
    totalPrice,
    status,
  };

  bookings.push(newBooking);
  saveBookings(bookings);
  return newBooking;
};

const getAllBookings = () => {
  return loadBookings();
};

const getUserBookings = (userId) => {
  const bookings = loadBookings();
  return bookings.filter((booking) => booking.userId === userId);
};

const deleteBooking = (bookingId) => {
  const bookings = loadBookings();
  const updatedBookings = bookings.filter(
    (booking) => booking.id !== bookingId
  );
  saveBookings(updatedBookings);
};

export default {
  addBooking,
  getAllBookings,
  getUserBookings,
  deleteBooking,
};