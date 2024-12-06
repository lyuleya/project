import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth-routes.js";
import userRoutes from "./routes/user-routes.js";
import roomRoutes from "./routes/room-routes.js";
import bookingRoutes from "./routes/booking-routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);