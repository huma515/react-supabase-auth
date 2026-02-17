import React, { useState } from "react";
import supabase from "../config/supabase";
import "../App.css"; // CSS file for styling

const Signup = ({ switchToLogin }) => {
  const [value, setValue] = useState({
    fullName: "",
    email: "",
    pass: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handlechange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email: value.email,
        password: value.pass,
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      if (data && data.user) {
        setSuccessMsg("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          switchToLogin();
        }, 2000);
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card shadow-lg">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Sign up to get started</p>

        <form onSubmit={handlesubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="fullName"
              type="text"
              value={value.fullName}
              onChange={handlechange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={value.email}
              onChange={handlechange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="pass"
              type="password"
              value={value.pass}
              onChange={handlechange}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          {successMsg && <p className="success-msg">{successMsg}</p>}
        </form>

        <p className="signup-footer">
          Already have an account? <a href="#" onClick={switchToLogin}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
