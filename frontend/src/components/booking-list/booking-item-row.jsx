import React from "react";

import { formatDateRange } from "../../utils";

const BookingItemRow = ({ booking }) => {
  const dateRange = formatDateRange(booking.date, booking.nights);

  return (
    <li className="list-group-item">
      <p>
        <strong>Room:</strong> {booking.roomName}
      </p>
      <p>
        <strong>Dates:</strong> {dateRange}
      </p>
      <p>
        <strong>Total:</strong> ${booking.totalPrice}
      </p>
      <p
        className={
          booking.status === "paid"
            ? "booking-list-paid-status"
            : "booking-list-pending-status"
        }
      >
        <strong>Status:</strong> {booking.status}
      </p>
    </li>
  );
};

export default BookingItemRow;
