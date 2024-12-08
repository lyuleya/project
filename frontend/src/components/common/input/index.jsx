import React from "react";

const Input = ({
  type = "text",
  name,
  id,
  className = "",
  value,
  onChange,
  required = false,
  placeholder,
  min,
  max,
  ...rest
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id || name}
      className={`form-control ${className}`}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      min={min}
      max={max}
      {...rest}
    />
  );
};

export default Input;
