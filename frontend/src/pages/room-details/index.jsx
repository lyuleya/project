import React, { useCallback, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import BookingModal from "../../components/booking-modal";
import Button from "../../components/common/button";
import Loader from "../../components/loader";
import { createBooking, fetchRoomDetails } from "../../modules/api";

import "./style.css";

const RoomDetails = ({ user }) => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const handleAddBooking = useCallback(
    async (newBooking) => {
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
        toast.success("Booking saved successfully!");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to save booking.");
      }
    },
    [user, room]
  );

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

  if (isLoading) {
    return <Loader />;
  }

  if (!room) {
    return <Navigate to="/" />;
  }

  const { title, description, guests, price, image } = room;

  return (
    <main className="container my-5">
      <h1 className="text-center mb-5 page-title">Room Details</h1>
      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={image}
            width="800"
            height="600"
            loading="lazy"
            className="img-fluid rounded shadow room-details-image"
            alt={title}
          />
        </div>
        <div className="col-md-6">
          <div className="d-flex flex-column justify-content-between h-100 border p-4 rounded shadow-sm">
            <div>
              <h3 className="mb-3 room-details-title">{title}</h3>
              <p className="mb-2">Guests: {guests}</p>
              <p className="text-muted">{description}</p>
            </div>
            <div>
              <div className="mb-4">
                <span className="d-block">Price</span>
                <h4 className="room-details-price">${price} per night</h4>
              </div>
              <Button className="btn w-100 custom-button" onClick={toggleModal}>
                Book this room
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="modal-backdrop show"></div>
          <BookingModal
            room={room}
            onAddBooking={handleAddBooking}
            onClose={toggleModal}
          />
        </>
      )}
    </main>
  );
};

export default RoomDetails;
