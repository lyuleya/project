import express from "express";
import roomService from "../services/room-service.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const rooms = roomService.loadRooms();
    res.json(rooms);
  } catch (error) {
    console.debug("Error loading rooms:", error);
    res.status(500).json({ message: "Failed to load rooms." });
  }
});

router.get("/:roomId", (req, res) => {
  const { roomId } = req.params;
  try {
    const room = roomService.getRoomById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }
    res.json(room);
  } catch (error) {
    console.debug("Error fetching room data:", error);
    res.status(500).json({ message: "Failed to fetch room data." });
  }
});

router.post("/available", (req, res) => {
  const filters = req.body;

  try {
    const availableRooms = roomService.getAvailableRooms(filters);
    res.status(200).json(availableRooms);
  } catch (error) {
    console.debug("Error fetching available rooms:", error);
    res.status(500).json({ message: "Failed to fetch available rooms." });
  }
});

export default router;