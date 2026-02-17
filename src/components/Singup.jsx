import React, { useState } from "react";
import supabase from "../config/supabase";
import "../App.css"



const Signup = ({switchToLogin}) => {
  const [value, setValue] = useState({
    fullName: "",
    email: "",
    pass: "",
  });

  const handlechange = (e) => {
    setValue({
      ...value,
    [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: value.email,
      password: value.pass,
    });

    if (data) {
 console.log(data);
switchToLogin();
    } 
    
    if (error) console.log(error);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>
        <p className="subtitle">Sign up to get started</p>

        <form onSubmit={handlesubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              name="fullName"
              onChange={handlechange}
              type="text"
              value={value.fullName}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              onChange={handlechange}
              type="email"
              value={value.email}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              name="pass"
              onChange={handlechange}
              type="password"
              value={value.pass}
              placeholder="Enter password"
              required
            />
          </div>

          <button className="signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
