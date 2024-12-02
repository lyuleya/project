import fs from "fs";

const ROOMS_FILE = "./src/data/rooms.json";
const BOOKINGS_FILE = "./src/data/bookings.json";

const loadRooms = () => {
  try {
    const data = fs.readFileSync(ROOMS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.debug("Error loading rooms:", error);
    return [];
  }
};

const loadBookings = () => {
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.debug("Error loading bookings:", error);
    return [];
  }
};

const getRoomById = (roomId) => {
  const rooms = loadRooms();
  return rooms.find((room) => room.id === roomId);
};

const isRoomAvailable = (roomId, startDate, endDate) => {
  const bookings = loadBookings();
  const roomBookings = bookings.filter((booking) => booking.roomId === roomId);

  const overlappingBookings = roomBookings.filter((booking) => {
    const bookingStart = new Date(booking.date);
    const bookingEnd = new Date(bookingStart);
    bookingEnd.setDate(bookingStart.getDate() + booking.nights);

    const searchStart = new Date(startDate);
    const searchEnd = new Date(endDate);

    return searchStart < bookingEnd && searchEnd > bookingStart;
  });

  const roomsBooked = overlappingBookings.length;
  const roomDetails = getRoomById(roomId);
  return roomsBooked < roomDetails.count;
};

const getAvailableRooms = (filters) => {
  const { startDate, endDate, guests } = filters;
  const rooms = loadRooms();

  return rooms.filter(
    (room) =>
      room.guests >= guests && isRoomAvailable(room.id, startDate, endDate)
  );
};

export default {
  loadRooms,
  loadBookings,
  getRoomById,
  getAvailableRooms,
  isRoomAvailable,
};