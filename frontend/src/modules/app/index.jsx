import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "../../pages/header";
import SignIn from "../../pages/sign-in";
import SignUp from "../../pages/sign-up";
import Main from "../../pages/main";
import { getUserFromLocalStorage, saveUserToLocalStorage } from "../../utils";
import { Footer } from "../../pages/footer";
import "./style.css";

const App = () => {
  const [user, setUser] = useState(getUserFromLocalStorage());

  const handleLogin = (userData) => {
    setUser(userData);
    saveUserToLocalStorage(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="app-container">
        <Header user={user} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={user ? <Main /> : <Navigate to="/sign-in" />}
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
          <Route path="*" element={<Navigate to={user ? "/" : "/sign-in"} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
