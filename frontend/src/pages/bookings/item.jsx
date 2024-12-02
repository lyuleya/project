import React from "react";

const BookingItem = ({ booking, room, onDelete }) => {
  const handleDelete = () => onDelete(booking.id);

  const startDate = new Date(booking.date);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + booking.nights);

  const formattedStartDate = startDate.toLocaleDateString();
  const formattedEndDate = endDate.toLocaleDateString();

  return (
    <div className="col-md-6">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="text-center card-title bookings-title">
            {room ? room.title : "Room not found"}
          </h5>
          {room && (
            <p className="card-text">
              <strong>Guests:</strong> {room.guests}
            </p>
          )}
          <p className="card-text">
            <strong>Date:</strong> {formattedStartDate} - {formattedEndDate}
          </p>
          <p className="card-text bookings-price">
            <strong>Total Price: ${booking.totalPrice}</strong>
          </p>
          <button
            className="btn btn-danger w-100 bookings-button"
            onClick={handleDelete}
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingItem;