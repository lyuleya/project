import express from "express";
import fs from "fs";

const router = express.Router();

const loadRooms = () => {
  const data = fs.readFileSync("./src/data/rooms.json", "utf-8");
  return JSON.parse(data);
};

router.get("/", (req, res) => {
  try {
    const rooms = loadRooms();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Failed to load rooms." });
  }
});

export default router;
