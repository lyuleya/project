import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import UserBookingItem from "./user-bookings-item";
import Loader from "../../components/loader";
import { deleteBooking, fetchUserBookings } from "../../modules/api";

import "./style.css";

const UserBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = useCallback(async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      const message = "Error deleting booking.";
      toast.error(message);
      console.debug(message, error);
    }
  }, []);

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

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="container my-5">
      <h1 className="text-center mb-5 page-title">My bookings</h1>
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
