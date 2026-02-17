import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Welcome = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg p-5 text-center"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h1 className="text-success mb-3">✅ Welcome!</h1>

        <p className="text-muted fs-5">
          You have successfully logged in.
        </p>

        <p className="text-secondary">
          Thank you for using our application. Enjoy your experience 🚀
        </p>

        <button className="btn btn-primary mt-3">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Welcome;
