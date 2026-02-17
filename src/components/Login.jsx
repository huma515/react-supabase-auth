import React, { useState } from "react";
import supabase from "../config/supabase"; // Make sure this path is correct
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ onLoginSuccess }) => {
  const [loginvalue, loginsetValue] = useState({
    email: "",
    pass: "",
  });

  const [loading, setLoading] = useState(false); // Optional: show loading state
  const [errorMsg, setErrorMsg] = useState(""); // Optional: show error messages

  const handlechange = (e) => {
    loginsetValue({
      ...loginvalue,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginvalue.email,
        password: loginvalue.pass,
      });

      if (error) {
        console.log("Login error:", error.message);
        setErrorMsg(error.message);
        setLoading(false);
        return; // stop execution if login fails
      }

      if (data && data.user) {
        console.log("Login successful:", data.user);
        onLoginSuccess(); // Only call this if user exists
      } else {
        console.log("User not found or email not confirmed.");
        setErrorMsg("Invalid credentials or user not found.");
      }
    } catch (err) {
      console.log("Unexpected error:", err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-3">Login</h3>
        <p className="text-center text-muted mb-4">Enter your email and password</p>

        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              value={loginvalue.email}
              onChange={handlechange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              name="pass"
              type="password"
              value={loginvalue.pass}
              onChange={handlechange}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {errorMsg && (
            <p className="text-center text-danger mt-3">{errorMsg}</p>
          )}
        </form>

        <p className="text-center text-muted mt-3">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
