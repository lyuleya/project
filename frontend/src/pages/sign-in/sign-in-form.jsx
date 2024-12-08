import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../components/common/button";
import Input from "../../components/common/input";
import { loginUser } from "../../modules/api";

const SignInForm = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

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
      return;
    }

    try {
      const user = await loginUser(formData.email, formData.password);
      onLogin(user);
      navigate("/");
    } catch (error) {
      const message = "Invalid email or password.";
      toast.error(message);
      console.debug("Login error:", error);
    }
  };

  return (
    <form className="card p-4 shadow-sm auth-form" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-center">Sign In</h2>
      <div className="mb-3">
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
      <div className="mb-3">
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
      <Button type="submit" className="w-100 custom-button">
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
