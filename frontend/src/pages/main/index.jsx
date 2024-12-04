import React, { useState } from "react";
import RoomList from "../../components/room-list";
import BookingList from "../../components/booking-list";
import Filter from "../../components/filter";
import { fetchFilteredRooms, fetchFilteredBookings } from "../../modules/api";
import { validateFilters } from "../../utils";

const Main = ({ role, initialData }) => {
  const isAdmin = role === "admin";

  const [filters, setFilters] = useState(
    isAdmin
      ? { startDate: "", endDate: "", status: "all" }
      : { startDate: "", endDate: "", guests: 1 }
  );
  const [filteredData, setFilteredData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleFilter = async () => {
    const errors = validateFilters(filters);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const fetchData = isAdmin ? fetchFilteredBookings : fetchFilteredRooms;
      const data = await fetchData(filters);
      setFilteredData(data);
    } catch (error) {
      console.debug(
        `Error fetching filtered ${isAdmin ? "bookings" : "rooms"}:`,
        error
      );
      setFilteredData([]);
    }
  };

  return (
    <main className="container my-5">
      <h1 className="hidden-title">
        {isAdmin ? "Admin Dashboard" : "Available Rooms"}
      </h1>
      <Filter
        role={role}
        filters={filters}
        setFilters={setFilters}
        errors={errors}
        setErrors={setErrors}
        onApply={handleFilter}
      />
      {filteredData.length > 0 ? (
        isAdmin ? (
          <BookingList bookings={filteredData} />
        ) : (
          <RoomList rooms={filteredData} />
        )
      ) : (
        <p>
          {isAdmin
            ? "No bookings available for these filters."
            : "No available rooms for these dates."}
        </p>
      )}
    </main>
  );
};

export default Main;