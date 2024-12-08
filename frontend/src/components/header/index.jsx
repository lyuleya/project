import React from "react";

import Logo from "./logo";
import Profile from "./profile";

import "./style.css";

const Header = ({ user, onLogout, onLogoClick }) => (
  <header className="navbar header">
    <div className="container">
      <Logo onLogoClick={onLogoClick} />
      {user && (
        <div className="d-flex align-items-center">
          <Profile user={user} onLogout={onLogout} />
        </div>
      )}
    </div>
  </header>
);

export default Header;
