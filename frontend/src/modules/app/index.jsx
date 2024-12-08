import React, { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Footer from "../../components/footer";
import Header from "../../components/header";
import Loader from "../../components/loader";
import Main from "../../pages/main";
import RoomDetails from "../../pages/room-details";
import SignIn from "../../pages/sign-in";
import SignUp from "../../pages/sign-up";
import UserBookings from "../../pages/user-bookings";
import { getUserFromLocalStorage, saveUserToLocalStorage } from "../../utils";
import { fetchAllBookings, fetchRooms } from "../api";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterResetTrigger, setFilterResetTrigger] = useState(false);
  const isAdmin = user && user.role === "admin";

  const handleLogin = useCallback((userData) => {
    setUser(userData);
    saveUserToLocalStorage(userData);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  const handleLogoClick = useCallback(() => {
    setFilterResetTrigger((prev) => !prev);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const fetchingData = isAdmin
          ? await fetchAllBookings()
          : await fetchRooms();
        setData(fetchingData);
      } catch (error) {
        console.debug("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, isAdmin]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Router>
        <Header
          user={user}
          onLogout={handleLogout}
          onLogoClick={handleLogoClick}
        />
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Main
                  role={user.role}
                  initialData={data}
                  filterResetTrigger={filterResetTrigger}
                />
              ) : (
                <Navigate to="/sign-in" />
              )
            }
          />
          <Route
            path="/sign-in"
            element={
              !user ? <SignIn onLogin={handleLogin} /> : <Navigate to="/" />
            }
          />
          <Route
            path="/sign-up"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/rooms/:roomId"
            element={
              user ? <RoomDetails user={user} /> : <Navigate to="/sign-in" />
            }
          />
          <Route
            path="/bookings"
            element={
              user ? <UserBookings user={user} /> : <Navigate to="/sign-in" />
            }
          />
          <Route path="*" element={<Navigate to={user ? "/" : "/sign-in"} />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
