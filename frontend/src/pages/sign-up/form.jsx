import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../modules/api";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
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

    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    try {
      await registerUser(formData.name, formData.email, formData.password, formData.role);
      navigate("/sign-in");
    } catch (error) {
      setErrorMessage("User already exists or registration failed.");
      console.error("Registration error:", error);
    }
  };

  return (
    <form className="card p-4 shadow-sm auth-form" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-center">Sign Up</h2>
      <div className="mb-2">
        <label htmlFor="name" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
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
      <div className="mb-2">
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
      <div className="mb-2">
        <label className="form-label">Role</label>
        <div className="d-flex justify-content-evenly">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="roleUser"
              value="user"
              checked={formData.role === "user"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="roleUser">
              User
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="roleAdmin"
              value="admin"
              checked={formData.role === "admin"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="roleAdmin">
              Admin
            </label>
          </div>
        </div>
      </div>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <button type="submit" className="btn btn-primary w-100 custom-button">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
