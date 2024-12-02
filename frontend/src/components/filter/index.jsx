import React from "react";

const Filter = ({ filters, setFilters, errors, setErrors, onApply }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]:
        name === "guests" && value !== ""
          ? Math.max(1, parseInt(value, 10))
          : value === ""
          ? ""
          : value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false,
      }));
    }
  };

  return (
    <div className="mb-4 p-3 border rounded">
      <div className="d-flex gap-3 align-items-center">
        <div className="col-md-4">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
            value={filters.startDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
            value={filters.endDate}
            min={filters.startDate || new Date().toISOString().split("T")[0]}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="guests" className="form-label">
            Guests
          </label>
          <input
            type="number"
            id="guests"
            name="guests"
            className="form-control"
            min={1}
            max={5}
            value={filters.guests}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2 flex-fill align-self-stretch">
          <button className="btn custom-button h-100 w-100" onClick={onApply}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;