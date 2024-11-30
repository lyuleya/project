import React from "react";
import RoomList from "../../components/room-list";

const Main = ({ rooms }) => {
  return (
    <main className="container mt-5 mb-5">
      <h1 className="hidden-title">Available Rooms</h1>
      <RoomList rooms={rooms} />
    </main>
  );
};

export default Main;
