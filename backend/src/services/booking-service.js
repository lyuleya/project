import fs from "fs";

const BOOKINGS_FILE = "./src/data/bookings.json";

const loadBookings = () => {
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading bookings:", error);
    return [];
  }
};

const saveBookings = (bookings) => {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving bookings:", error);
  }
};

const addBooking = ({ userId, roomId, date, nights, totalPrice, status }) => {
  const bookings = loadBookings();
  const newBooking = {
    id: Date.now().toString(),
    userId,
    roomId,
    date,
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