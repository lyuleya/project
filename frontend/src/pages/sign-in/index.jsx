import React from "react";
import { Link } from "react-router-dom";

import SignInForm from "./sign-in-form";

const SignIn = ({ onLogin }) => (
  <main className="container my-5 auth-page">
    <h1 className="hidden-title">Sign In</h1>
    <SignInForm onLogin={onLogin} />
    <div className="mt-3 text-center">
      <span>
        Don't have an account?{" "}
        <Link to="/sign-up" className="btn btn-link">
          Sign Up
        </Link>
      </span>
    </div>
  </main>
);

export default SignIn;
