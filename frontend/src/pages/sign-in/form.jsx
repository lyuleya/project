import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../modules/api";

const SignInForm = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    try {
      const user = await loginUser(formData.email, formData.password);
      onLogin(user);
      navigate("/");
    } catch (error) {
      setErrorMessage("Invalid email or password.");
      console.error("Login error:", error);
    }
  };

  return (
    <form className="card p-4 shadow-sm auth-form" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-center">Sign In</h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <button type="submit" className="btn w-100 custom-button">
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
