import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "../../pages/header";
import Footer from "../../pages/footer";
import Main from "../../pages/main";
import UserBookings from "../../pages/user-bookings";
import RoomDetails from "../../pages/room-details";
import SignIn from "../../pages/sign-in";
import SignUp from "../../pages/sign-up";
import Loader from "../../components/loader";
import { getUserFromLocalStorage, saveUserToLocalStorage } from "../../utils";
import { fetchAllBookings, fetchRooms } from "../api";

const App = () => {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = user && user.role === "admin";

  const handleLogin = (userData) => {
    setUser(userData);
    saveUserToLocalStorage(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

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
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Main role={user.role} initialData={data} />
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
  );
};

export default App;