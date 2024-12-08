import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  ariaLabel,
  icon,
  id,
  alt,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      id={id}
      {...rest}
    >
      {icon && <img src={icon} alt={alt} />}
      {children}
    </button>
  );
};

export default Button;
