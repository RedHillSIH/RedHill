import React, { useState } from "react";

const ComplaintModalUser = ({ complaint, onClose }) => {
//   const [otp, setOtp] = useState("");

//   const handleOtpSubmit = () => {
//     if (otp === "1234") {
//       alert("Complaint successfully completed!");
//       onClose();
//     } else {
//       alert("Invalid OTP. Please try again.");
//     }
//   };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Complaint Details</h2>
        <h2>Media</h2>
        <img src={complaint.media} className="h-20 w-20"></img>
        <p className="mb-2">
          <strong>ID:</strong> {complaint.complaintId}
        </p>
        
        {/* <p className="mb-2">
          <strong>Seat:</strong> {complaint.seat}
        </p> */}
        <p className="mb-2">
          <strong>Issue:</strong> {complaint.category}
        </p>
        <p className="mb-2">
          <strong>Severity:</strong> {complaint.severity}
        </p>
        <p className="mb-2">
        
          <strong>Status:</strong> {complaint.resolved}
        </p>
        <p className="mb-4">
          <strong>Date:</strong> {complaint.createdAt}
        </p>

        {/* OTP Section
        <div className="mb-4">
          <label htmlFor="otp" className="block text-sm font-medium">
            Enter OTP to complete complaint:
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          className="bg-[#75002b] text-white px-4 py-2 rounded hover:bg-[#930b3e] transition"
          onClick={handleOtpSubmit}
        >
          Submit OTP
        </button> */}
      </div>
    </div>
  );
};

export default ComplaintModalUser;
