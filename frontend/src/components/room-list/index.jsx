import React from "react";

import RoomCard from "../room-card";

const RoomList = ({ rooms }) => {
  return (
    <div className="row">
      {rooms.map((room) => (
        <div className="col-md-4 mb-4" key={room.id}>
          <RoomCard room={room} />
        </div>
      ))}
    </div>
  );
};

export default RoomList;
