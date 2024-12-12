import React, { useState } from "react";

const ComplaintModal = ({ complaint, onClose }) => {
  const [otp, setOtp] = useState("");

  const handleOtpSubmit = () => {
    if (otp === "1234") {
      alert("Complaint successfully completed!");
      onClose();
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

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
        <p className="mb-2">
          <strong>ID:</strong> {complaint.complaintId}
        </p>
        <p className="mb-4">
          <strong>Name</strong> {complaint.name}
        </p>
        <p className="mb-4">
          <strong>Phone:</strong> {complaint.phone}
        </p>
        <p className="mb-2">
          <strong>Train No:</strong> {complaint.trainCode}
        </p>
        <p className="mb-2">
          <strong>Train name:</strong> {complaint.trainName}
        </p>
        <p className="mb-2 items-center">
          <h2 className="font-bold">Media:</h2>
          <img className="h-36 w-36 mx-auto " src={complaint.media}></img>
        </p>
        <p className="mb-2">
          <strong>Severity:</strong> {complaint.severity}
        </p>
        <p className="mb-2">
          <strong>Category:</strong> {complaint.category}
        </p>
        <p className="mb h-fit flex overflow-y-scroll">
          <strong>SubCategory:</strong> {complaint.subCategory}
        </p>
        <p className="mb-4">
          <strong>Description:</strong> {complaint.description}
        </p>
        <p className="mb-4">
          <strong>Date:</strong> {complaint.createdAt}
        </p>

        {/* OTP Section */}
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
        </button>
      </div>
    </div>
  );
};

export default ComplaintModal;
