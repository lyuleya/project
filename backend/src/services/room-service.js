import fs from "fs";

const ROOMS_FILE = "./src/data/rooms.json";


const loadRooms = () => {
  try {
    const data = fs.readFileSync(ROOMS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading rooms:", error);
    return [];
  }
};


const getRoomById = (roomId) => {
  const rooms = loadRooms();
  return rooms.find((room) => room.id === roomId);
};

export default {
  loadRooms,
  getRoomById,
};