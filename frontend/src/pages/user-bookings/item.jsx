import { formatDateRange } from "../../utils";

const UserBookingItem = ({ booking, onDelete }) => {
  const handleDelete = () => onDelete(booking.id);

  const dateRange = formatDateRange(booking.date, booking.nights);

  return (
    <div className="col-md-6">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="text-center card-title bookings-title">
            {booking.roomTitle}
          </h5>
          <p className="card-text">
            <strong>Guests:</strong> {booking.roomGuests}
          </p>
          <p className="card-text">
            <strong>Dates:</strong> {dateRange}
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

export default UserBookingItem;