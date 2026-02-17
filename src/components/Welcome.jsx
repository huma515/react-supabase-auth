import React from "react";
import "../App.css"; // CSS file for styling

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-card shadow-lg text-center">
        <h1 className="welcome-title">✅ Welcome!</h1>

        <p className="welcome-message">
          You have successfully logged in.
        </p>

        <p className="welcome-submessage">
          Thank you for using our application. Enjoy your experience 🚀
        </p>
      </div>
    </div>
  );
};

export default Welcome;
