import React from "react";
import BookingItem from "./item";

const BookingList = ({ bookings }) => {
  const groupedBookings = {};

  bookings.forEach((booking) => {
    if (!groupedBookings[booking.userEmail]) {
      groupedBookings[booking.userEmail] = {
        userName: booking.userName,
        userEmail: booking.userEmail,
        bookings: [],
      };
    }
    groupedBookings[booking.userEmail].bookings.push(booking);
  });

  return (
    <div className="row g-3">
      {Object.values(groupedBookings).map((group, index) => (
        <div className="col-12" key={`${group.userEmail}-${index}`}>
          <BookingItem group={group} />
        </div>
      ))}
    </div>
  );
};

export default BookingList;