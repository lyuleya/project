import React, { useEffect, useState } from "react";
import UserBookingItem from "./item";
import Loader from "../../components/loader";
import { fetchUserBookings, deleteBooking } from "../../modules/api";
import "./style.css";

const UserBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserBookings = async () => {
      try {
        const userBookings = await fetchUserBookings(user.id);
        setBookings(userBookings);
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
    return <Loader />;
  }

  return (
    <main className="container my-5">
      <h1 className="text-center mb-5">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-center">No bookings yet.</p>
      ) : (
        <div className="row g-3">
          {bookings.map((booking) => (
            <UserBookingItem
              key={booking.id}
              booking={booking}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default UserBookings;