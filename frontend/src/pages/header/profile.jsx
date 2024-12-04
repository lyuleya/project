import React from "react";
import userProfile from "../../assets/icons/user.svg";
import { useNavigate } from "react-router-dom";

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
      <button
        className="btn d-flex align-items-center p-10 border-0"
        type="button"
        id="profileDropdown"
      >
        <img src={userProfile} alt="profile" />
      </button>
      <ul
        className="dropdown-menu header-dropdown-menu shadow"
        aria-labelledby="profileDropdown"
      >
        {!isAdmin && (
          <>
            <li>
              <button
                className="dropdown-item header-dropdown-item"
                onClick={handleNavigateToBookings}
              >
                {user?.name || "Unknown User"}
              </button>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
          </>
        )}
        <li>
          <button
            className="dropdown-item header-dropdown-item text-danger"
            onClick={handleSignOut}
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Profile;