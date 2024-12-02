import express from "express";
import bookingService from "../services/booking-service.js";

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const newBooking = bookingService.addBooking(req.body);
    res.status(201).json({ message: "Booking created", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", (req, res) => {
  try {
    const allBookings = bookingService.getAllBookings();
    res.status(200).json(allBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

router.get("/user/:userId", (req, res) => {
  const { userId } = req.params;

  try {
    const userBookings = bookingService.getUserBookings(userId);
    res.status(200).json(userBookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Error fetching user bookings" });
  }
});

router.delete("/:bookingId", (req, res) => {
  const { bookingId } = req.params;

  try {
    bookingService.deleteBooking(bookingId);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Error deleting booking" });
  }
});

export default router;