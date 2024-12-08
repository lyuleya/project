import React from "react";
import { useNavigate } from "react-router-dom";

import userProfile from "../../assets/icons/user.svg";
import Button from "../../components/common/button";

const Profile = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const isAdmin = user.role === "admin";

  const handleSignOut = () => {
    onLogout();
    navigate("/sign-in");
  };

  const handleNavigateToBookings = () => {
    navigate("/bookings");
  };

  return (
    <div className="dropdown header-profile-dropdown">
      <Button
        className="btn d-flex align-items-center p-10 border-0"
        ariaLabel="Profile Dropdown"
        id="profileDropdown"
        alt="profile"
        icon={userProfile}
      />
      <ul
        className="dropdown-menu header-dropdown-menu shadow"
        aria-labelledby="profileDropdown"
      >
        {!isAdmin && (
          <>
            <li>
              <Button
                className="dropdown-item header-dropdown-item"
                onClick={handleNavigateToBookings}
              >
                {user?.name || "Unknown User"}
              </Button>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
          </>
        )}
        <li>
          <Button
            className="dropdown-item header-dropdown-item text-danger"
            onClick={handleSignOut}
          >
            Log Out
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
