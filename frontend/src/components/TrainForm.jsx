import React from "react";

function TrainForm() {
  return (
    <div className="bg-white shadow-md rounded-md p-8 w-full max-w-4xl ">
      <h1 className="text-2xl font-bold text-[#75002b] mb-4">Grievance Detail</h1>
      <p className="text-sm text-right text-red-500">*Mandatory Fields</p>
      <form className="grid grid-cols-2 gap-6">
        {/* Mobile Number */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Mobile No.</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter Mobile No."
              className="border p-2 rounded-md flex-1"
            />
            <button className="bg-[#75002b] text-white px-4 py-2 rounded-md">Get OTP</button>
          </div>
        </div>

        {/* PNR No */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">PNR No *</label>
          <input
            type="text"
            placeholder="Enter PNR No."
            className="border p-2 rounded-md"
          />
        </div>

        {/* Type */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Type *</label>
          <select className="border p-2 rounded-md">
            <option>--Select--</option>
            <option>Type 1</option>
            <option>Type 2</option>
          </select>
        </div>

        {/* Sub Type */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Sub Type *</label>
          <select className="border p-2 rounded-md">
            <option>--Select--</option>
            <option>Sub Type 1</option>
            <option>Sub Type 2</option>
          </select>
        </div>

        {/* Incident Date */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Incident Date *</label>
          <input type="datetime-local" className="border p-2 rounded-md" />
        </div>

        {/* Upload File */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">
            Upload File (PDF, JPG, PNG, MP4 up to 5 MB)
          </label>
          <input
            type="file"
            className="border p-2 rounded-md"
            accept=".pdf, .jpg, .jpeg, .png, .mp4"
          />
        </div>

        {/* Grievance Description */}
        <div className="col-span-2 flex flex-col">
          <label className="text-gray-700 font-medium">Grievance Description *</label>
          <textarea
            className="border p-2 rounded-md"
            rows="4"
            placeholder="Enter your grievance details..."
          ></textarea>
          <p className="text-sm text-gray-500 mt-2">
            {/* Note: Special characters {! @ # $ ^ ; & + = × ÷ * '} are not permitted */}
          </p>
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex justify-end space-x-4">
          <button
            type="reset"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-[#75002b] text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default TrainForm;
