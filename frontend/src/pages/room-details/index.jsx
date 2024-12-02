import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import BookingModal from "../../components/booking-modal";
import "./style.css";
import { createBooking, fetchRoomDetails } from "../../modules/api";

const RoomDetails = ({ user }) => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const roomData = await fetchRoomDetails(roomId);
        setRoom(roomData);
      } catch (error) {
        console.debug("Error fetching room:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRoom();
  }, [roomId]);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleAddBooking = async (newBooking) => {
    try {
      const bookingData = {
        userId: user.id,
        roomId: room.id,
        date: newBooking.date,
        nights: newBooking.nights,
        totalPrice: newBooking.totalPrice,
        status: newBooking.status,
      };

      await createBooking(bookingData);
      alert("Booking saved successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save booking.");
    }
  };

  if (isLoading) {
    return <main></main>;
  }

  if (!room) {
    return <Navigate to="/" />;
  }

  const { title, description, guests, price, image } = room;

  return (
    <main className="container my-5">
      <h1 className="text-center mb-5">Room Details</h1>
      <div className="row g-4">
        <div className="col-md-6">
          <img src={image} className="img-fluid rounded shadow" alt={title} />
        </div>
        <div className="col-md-6">
          <div className="d-flex flex-column justify-content-between h-100 border p-4 rounded shadow-sm">
            <div>
              <h3 className="mb-3 fw-bold room-details-title">{title}</h3>
              <p className="text-muted mb-2">Guests: {guests}</p>
              <p className="text-secondary">{description}</p>
            </div>
            <div>
              <div className="mb-4">
                <span className="d-block text-muted">Price</span>
                <strong className="h4 room-details-price">
                  ${price} per night
                </strong>
              </div>
              <button className="btn w-100 custom-button" onClick={toggleModal}>
                Book this Room
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <BookingModal
          room={room}
          onAddBooking={handleAddBooking}
          onClose={toggleModal}
        />
      )}
    </main>
  );
};

export default RoomDetails;