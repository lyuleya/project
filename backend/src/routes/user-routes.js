import express from "express";
import userService from "../services/user-service.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const users = userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
