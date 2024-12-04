import fs from "fs";
import roomService from "./room-service.js";
import userService from "./user-service.js";

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
  const bookings = loadBookings();

  return bookings.map((booking) => {
    const user = userService.getUserById(booking.userId);
    const room = roomService.getRoomById(booking.roomId);

    return {
      ...booking,
      userName: user ? user.name : "Unknown",
      userEmail: user ? user.email : "No email",
      roomName: room ? room.title : "Unknown Room",
    };
  });
};

const getFilteredBookings = (filters) => {
  const bookings = loadBookings();
  const { startDate, endDate, status } = filters;

  return bookings.filter((booking) => {
    const bookingStart = new Date(booking.date);
    const bookingEnd = new Date(bookingStart);
    bookingEnd.setDate(bookingStart.getDate() + booking.nights);

    const isWithinDates =
      (!startDate || new Date(startDate) <= bookingEnd) &&
      (!endDate || new Date(endDate) >= bookingStart);
    const matchesStatus = status === "all" || booking.status === status;

    return isWithinDates && matchesStatus;
  });
};

const getUserBookings = (userId) => {
  const bookings = loadBookings();

  return bookings
    .filter((booking) => booking.userId === userId)
    .map((booking) => {
      const room = roomService.getRoomById(booking.roomId);

      return {
        ...booking,
        roomTitle: room ? room.title : "Unknown Room",
        roomGuests: room ? room.guests : 0,
      };
    });
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
  getFilteredBookings,
  getUserBookings,
  deleteBooking,
};