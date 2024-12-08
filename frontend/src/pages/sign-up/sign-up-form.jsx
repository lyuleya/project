import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../components/common/button";
import Input from "../../components/common/input";
import RadioButton from "../../components/common/radio-button";
import { registerUser } from "../../modules/api";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

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
      return;
    }

    try {
      await registerUser(formData.name, formData.email, formData.password);
      navigate("/sign-in");
    } catch (error) {
      const message = "User already exists or registration failed.";
      toast.error(message);
      console.debug("Registration error:", error);
    }
  };

  return (
    <form className="card p-4 shadow-sm auth-form" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-center">Sign Up</h2>
      <div className="mb-2">
        <label htmlFor="name" className="form-label">
          Full Name
        </label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Role</label>
        <div className="d-flex justify-content-evenly">
          <div className="form-check">
            <RadioButton
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
            <RadioButton
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
      <Button type="submit" className="w-100 custom-button">
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
