import React, { useState, useMemo } from "react";

const BookingForm = ({ room, onAddBooking, onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    nights: 1,
  });

  const { date, nights } = formData;

  const totalPrice = useMemo(() => room.price * nights, [room.price, nights]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "nights" ? Math.max(1, parseInt(value, 10)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDate = new Date(date);

    const newBooking = {
      id: Date.now().toString(),
      roomId: room.id,
      date: selectedDate.toISOString(),
      nights,
      totalPrice,
      status: Math.random() > 0.5 ? "Paid" : "Pending",
    };

    try {
      await onAddBooking(newBooking);
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to book the room.");
    }
  };

  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h3 className="fw-bold room-details-title">{room.title}</h3>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="form-control"
          value={date}
          min={todayDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="nights" className="form-label">
          Number of nights
        </label>
        <input
          type="number"
          id="nights"
          name="nights"
          className="form-control"
          value={nights}
          min={1}
          max={30}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="fw-bold">Total:</span>
        <span className="h4 room-details-price">${totalPrice}</span>
      </div>

      <button type="submit" className="btn w-100 custom-button">
        Book a room
      </button>
    </form>
  );
};

export default BookingForm;