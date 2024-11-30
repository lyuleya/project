import React from "react";
import { useParams, Navigate } from "react-router-dom";
import "./style.css";

const RoomDetails = ({ rooms }) => {
  const { roomId } = useParams();
  const room = rooms.find((room) => room.id === roomId);

  if (!room) {
    return <Navigate to="/" />;
  }

  const { title, description, level, price, image } = room;

  return (
    <main className="container my-5 room-page">
      <h1 className="hidden-title">Room Details</h1>
      <div className="row g-4">
        <div className="col-md-6">
          <img src={image} className="img-fluid rounded shadow" alt={title} />
        </div>
        <div className="col-md-6">
          <div className="d-flex flex-column justify-content-between h-100 border p-4 rounded shadow-sm">
            <div>
              <h3 className="mb-3 text-primary fw-bold room-title">{title}</h3>
              <p className="text-muted mb-2">Level: {level}</p>
              <p className="text-secondary">{description}</p>
            </div>
            <div>
              <div className="mb-4">
                <span className="d-block text-muted">Price</span>
                <strong className="h4 text-primary room-price">
                  ${price} per night
                </strong>
              </div>
              <button className="btn btn-primary w-100 custom-button">
                Book this Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RoomDetails;
