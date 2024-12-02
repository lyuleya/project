import express from "express";
import roomService from "../services/room-service.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const rooms = roomService.loadRooms();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Failed to load rooms." });
  }
});

router.get("/:roomId", (req, res) => {
  const { roomId } = req.params;
  try {
    const room = roomService.getRoomById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch room data." });
  }
});

export default router;