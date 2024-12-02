import React, { useEffect, useState } from "react";
import {
  fetchUserBookings,
  fetchRoomDetails,
  deleteBooking,
} from "../../modules/api";
import BookingItem from "./item";
import "./style.css";

const Bookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserBookings = async () => {
      try {
        const userBookings = await fetchUserBookings(user.id);
        setBookings(userBookings);

        const roomsList = {};
        for (const booking of userBookings) {
          if (!roomsList[booking.roomId]) {
            const roomDetails = await fetchRoomDetails(booking.roomId);
            roomsList[booking.roomId] = roomDetails;
          }
        }
        setRooms(roomsList);
      } catch (error) {
        console.debug("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserBookings();
  }, [user.id]);

  const handleDelete = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      console.debug("Error deleting booking:", error);
    }
  };

  if (loading) {
    return <main></main>;
  }

  return (
    <main className="container my-5">
      <h1 className="text-center mb-5">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-center">No bookings yet.</p>
      ) : (
        <div className="row g-3">
          {bookings.map((booking) => {
            const room = rooms[booking.roomId];
            return (
              <BookingItem
                key={booking.id}
                booking={booking}
                room={room}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Bookings;