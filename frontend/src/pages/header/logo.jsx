import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ onLogoClick }) => (
  <Link to="/" className="header-logo" onClick={onLogoClick}>
    Hotel Logo
  </Link>
);

export default Logo;