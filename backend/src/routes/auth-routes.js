import express from "express";
import userService from "../services/user-service.js";

const router = express.Router();

router.post("/sign-in", (req, res) => {
  const { email, password } = req.body;

  try {
    const user = userService.authenticateUser(email, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ id: user.id, name: user.name, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/sign-up", (req, res) => {
  try {
    const newUser = userService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

export default router;
