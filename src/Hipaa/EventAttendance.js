import React, { useState } from "react";

const EventAttendanceForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    phone: "",
    signature: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.position ||
      !formData.phone ||
      !formData.signature
    ) {
      alert("All fields are required!");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <h2>Event Attendance Confirmation Form</h2>
      <p>
        <strong>Event Name:</strong> In-Service for HIPAA Compliance Training
        Program
      </p>
      <p>
        <strong>Date:</strong> April 09, 2024
      </p>
      <p>
        <strong>Time:</strong> 12:30 PM
      </p>
      <p>
        <strong>Venue:</strong> 3305 W Spring Mountain Rd Ste 82, Las Vegas, NV
        89102
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Position:
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Signature (Type your name):
            <input
              type="text"
              name="signature"
              value={formData.signature}
              onChange={handleChange}
              required
            />
          </label>

          <p>
            I, the undersigned, confirm my attendance at the above-mentioned
            event. I understand the importance of my participation and will make
            every effort to be present.
          </p>

          <p>
            <strong>Terms and Conditions:</strong> By confirming my attendance,
            I agree to abide by the rules and regulations set forth by the
            organizers for the smooth conduct of the event.
          </p>

          <button type="submit">Confirm Attendance</button>
        </form>
      ) : (
        <div className="confirmation-message">
          <h3>Thank You, {formData.fullName}!</h3>
          <p>Your attendance has been confirmed.</p>
        </div>
      )}
    </div>
  );
};

export default EventAttendanceForm;
