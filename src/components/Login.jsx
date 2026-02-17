import React, { useState } from "react";
import supabase from "../config/supabase";
import "../App.css"; // CSS file for styling

const Login = ({ onLoginSuccess }) => {
  const [loginvalue, loginsetValue] = useState({
    email: "",
    pass: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (data && data.user) {
        onLoginSuccess();
      } else {
        setErrorMsg("Invalid credentials or user not found.");
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card shadow-lg">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Log in to your account</p>

        <form onSubmit={handlesubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={loginvalue.email}
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
              value={loginvalue.pass}
              onChange={handlechange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {errorMsg && <p className="error-msg">{errorMsg}</p>}
        </form>

        <p className="login-footer">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
