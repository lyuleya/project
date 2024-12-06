import React from "react";

import BookingForm from "./booking-form";

import "./style.css";

const BookingModal = ({ room, onAddBooking, onClose }) => {
  return (
    <div className="modal show d-block fade qwe" tabIndex="-1" role="dialog">
      <div
        className="modal-dialog modal-dialog-centered justify-content-center"
        role="document"
      >
        <div className="modal-content p-4 booking-modal">
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 p-4"
            aria-label="Close"
            onClick={onClose}
          ></button>
          <BookingForm
            room={room}
            onAddBooking={onAddBooking}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
