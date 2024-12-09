import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";

import { getToday } from "../../utils";
import Button from "../common/button";
import Input from "../common/input";

const BookingForm = ({ room, onAddBooking, onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    nights: 1,
  });

  const { date, nights } = formData;

  const today = getToday();
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
      status: Math.random() > 0.5 ? "paid" : "pending",
    };

    try {
      await onAddBooking(newBooking);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to book the room.");
    }
  };

  return (
    <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
      <h3 className="booking-form-title">{room.title}</h3>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <Input
          type="date"
          name="date"
          value={date}
          min={today}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="nights" className="form-label">
          Number of nights
        </label>
        <Input
          type="number"
          name="nights"
          value={nights}
          min={1}
          max={30}
          onChange={handleChange}
          required
        />
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="booking_form_price_title">Total price:</span>
        <span className="h4 booking-form-price_value">${totalPrice}</span>
      </div>
      <Button type="submit" className="w-100 custom-button">
        Book a room
      </Button>
    </form>
  );
};

export default BookingForm;
