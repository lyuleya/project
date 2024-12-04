import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const RoomCard = ({ room }) => {
  return (
    <div className="card room-card shadow-sm">
      <img
        src={room.image}
        sizes="(max-width: 768px) 400px, 800px"
        width="800"
        height="600"
        loading="lazy"
        className="room-card-img-top"
        alt={room.title}
      />
      <div className="card-body">
        <h5 className="card-title room-card-title">{room.title}</h5>
        <p className="card-text">
          <small className="text-muted">Guests: {room.guests}</small>
        </p>
        <p className="card-text">
          <strong>${room.price} per night</strong>
        </p>
        <Link to={`/rooms/${room.id}`} className="btn custom-button">
          Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;