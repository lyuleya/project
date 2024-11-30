import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./form";

const SignUp = () => (
  <main className="container mt-5 auth-page">
    <h1 className="hidden-title">Sign Up</h1>
    <SignUpForm />
    <div className="mt-3 text-center">
      <span>
        Already have an account?{" "}
        <Link to="/sign-in" className="btn btn-link">
          Sign In
        </Link>
      </span>
    </div>
  </main>
);

export default SignUp;
