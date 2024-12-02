import React, { useState } from "react";
import RoomList from "../../components/room-list";
import Filter from "../../components/filter";

import { fetchFilteredRooms } from "../../modules/api";
import { validateFilters } from "../../utils";

const Main = ({ rooms }) => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    guests: 1,
  });

  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [errors, setErrors] = useState({});

  const handleFilter = async () => {
    const errors = validateFilters(filters);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const data = await fetchFilteredRooms(filters);
      setFilteredRooms(data);
    } catch (error) {
      console.debug("Error fetching filtered rooms:", error);
    }
  };

  return (
    <main className="container my-5">
      <h1 className="hidden-title">Available Rooms</h1>

      <Filter
        filters={filters}
        setFilters={setFilters}
        errors={errors}
        setErrors={setErrors}
        onApply={handleFilter}
      />

      {filteredRooms.length ? (
        <RoomList rooms={filteredRooms} />
      ) : (
        <p className="text-center">No available rooms for these dates.</p>
      )}
    </main>
  );
};

export default Main;