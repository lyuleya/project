import React from "react";

import { FILTER_FIELDS } from "./constants";
import Button from "../common/button";
import Input from "../common/input";

import "./style.css";

const Filter = ({
  role,
  filters,
  setFilters,
  errors,
  setErrors,
  onApply,
  onClear,
}) => {
  const fields = FILTER_FIELDS[role];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value === "" ? "" : value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false,
      }));
    }
  };

  return (
    <div className="mb-4 p-3 border rounded position-relative">
      <Button
        className="btn-close position-absolute top-0 end-0 m-2"
        ariaLabel="Clear filters"
        onClick={onClear}
        title="Clear filters"
      />
      <div className="row g-3">
        {fields.map((field) => (
          <div key={field.name} className={`col-md-${field.size}`}>
            <label htmlFor={field.name} className="form-label">
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                className={`form-control ${
                  errors[field.name] ? "is-invalid" : ""
                }`}
                value={filters[field.name]}
                onChange={handleInputChange}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                type={field.type}
                name={field.name}
                className={errors[field.name] ? "is-invalid" : ""}
                value={filters[field.name]}
                min={field.min}
                max={field.max}
                onChange={handleInputChange}
              />
            )}
          </div>
        ))}
        <div className="col-md-2 align-self-end">
          <Button className="btn filter-button w-100" onClick={onApply}>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
