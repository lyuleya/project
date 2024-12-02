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
    console.debug("Error during sign-in:", error);
    res
      .status(500)
      .json({ message: "Failed to sign in. Please try again later." });
  }
});

router.post("/sign-up", (req, res) => {
  try {
    const newUser = userService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.debug("Error during sign-up:", error);
    res
      .status(409)
      .json({ message: "User already exists or invalid data provided." });
  }
});

export default router;