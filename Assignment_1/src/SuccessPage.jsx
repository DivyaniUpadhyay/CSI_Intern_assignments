import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Form.css";

function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    // If no data, redirect to form
    navigate("/", { replace: true });
    return null;
  }

  return (
    <div className="form-wrapper" role="main">
      <div className="form-container success-page">
        <h2>Registration Successful!</h2>
        <p>Here are your submitted details:</p>
        <ul>
          <li>
            <strong>First Name:</strong> {data.firstName}
          </li>
          <li>
            <strong>Last Name:</strong> {data.lastName}
          </li>
          <li>
            <strong>Username:</strong> {data.username}
          </li>
          <li>
            <strong>Email:</strong> {data.email}
          </li>
          <li>
            <strong>Password:</strong> {`*`.repeat(data.password.length)}
          </li>
          <li>
            <strong>Phone:</strong> {data.phoneCode} {data.phoneNumber}
          </li>
          <li>
            <strong>Country:</strong> {data.country}
          </li>
          <li>
            <strong>City:</strong> {data.city}
          </li>
          <li>
            <strong>PAN No.:</strong> {data.pan}
          </li>
          <li>
            <strong>Aadhar No.:</strong> {data.aadhar}
          </li>
        </ul>

        <button onClick={() => navigate("/", { replace: true })}>
          Back to Form
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
