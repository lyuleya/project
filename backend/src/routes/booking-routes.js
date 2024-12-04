import express from "express";
import bookingService from "../services/booking-service.js";

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const newBooking = bookingService.addBooking(req.body);
    res.status(201).json({ message: "Booking created", booking: newBooking });
  } catch (error) {
    console.debug("Error creating booking:", error);

    if (error.message === "ROOM_NOT_AVAILABLE") {
      res
        .status(400)
        .json({ message: "No available rooms for the selected dates." });
    } else {
      res
        .status(500)
        .json({ message: "Failed to create booking. Please try again later." });
    }
  }
});

router.get("/", (req, res) => {
  try {
    const allBookings = bookingService.getAllBookings();
    res.status(200).json(allBookings);
  } catch (error) {
    console.debug("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings." });
  }
});

router.post("/filter", (req, res) => {
  const filters = req.body;
  try {
    const filteredBookings = bookingService.getFilteredBookings(filters);
    res.status(200).json(filteredBookings);
  } catch (error) {
    console.error("Error filtering bookings:", error);
    res.status(500).json({ message: "Error filtering bookings" });
  }
});

router.get("/user/:userId", (req, res) => {
  const { userId } = req.params;

  try {
    const userBookings = bookingService.getUserBookings(userId);
    res.status(200).json(userBookings);
  } catch (error) {
    console.debug("Error fetching user bookings:", error);
    res.status(500).json({ message: "Failed to fetch user bookings." });
  }
});

router.delete("/:bookingId", (req, res) => {
  const { bookingId } = req.params;

  try {
    bookingService.deleteBooking(bookingId);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.debug("Error deleting booking:", error);
    res.status(500).json({ message: "Failed to delete booking." });
  }
});

export default router;