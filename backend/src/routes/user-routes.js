import express from "express";
import userService from "../services/user-service.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const users = userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.debug("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users." });
  }
});

export default router;