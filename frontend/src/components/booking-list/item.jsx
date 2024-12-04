import React from "react";
import BookingItemRow from "./row";
import "./style.css";

const BookingItem = ({ group }) => {
  const { userName, userEmail, bookings } = group;

  return (
    <div className="card shadow-sm">
      <div className="card-body booking-list-card">
        <h5 className="card-title text-center booking-list-title">
          {userName}
        </h5>
        <p className="card-title text-center">{userEmail}</p>
        <ul className="list-group list-group-flush rounded">
          {bookings.map((booking, index) => (
            <BookingItemRow
              key={`${booking.roomName}-${index}`}
              booking={booking}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingItem;