import React from "react";

const RadioButton = ({
  name = "role",
  id,
  value,
  checked,
  onChange,
  className = "form-check-input",
  required = false,
  ...rest
}) => {
  return (
    <input
      type="radio"
      name={name}
      id={id || name}
      value={value}
      checked={checked}
      onChange={onChange}
      required={required}
      className={`form-check-input ${className}`}
      {...rest}
    />
  );
};

export default RadioButton;
