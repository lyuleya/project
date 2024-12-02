import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Bookings from "../../pages/bookings";
import Header from "../../pages/header";
import Footer from "../../pages/footer";
import Main from "../../pages/main";
import RoomDetails from "../../pages/room-details";
import SignIn from "../../pages/sign-in";
import SignUp from "../../pages/sign-up";
import { getUserFromLocalStorage, saveUserToLocalStorage } from "../../utils";
import { fetchRooms } from "../api";

const App = () => {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogin = (userData) => {
    setUser(userData);
    saveUserToLocalStorage(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await fetchRooms();
        setRooms(data);
      } catch (error) {
        console.debug("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  if (loading) {
    return <main></main>;
  }

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={user ? <Main rooms={rooms} /> : <Navigate to="/sign-in" />}
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
          element={user ? <Bookings user={user} /> : <Navigate to="/sign-in" />}
        />
        <Route path="*" element={<Navigate to={user ? "/" : "/sign-in"} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;