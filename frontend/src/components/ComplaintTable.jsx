import React from "react";

const ComplaintTable = ({ complaints, onComplaintClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Ref No.</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Seat</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Issue Type</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Severity</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr
              key={complaint.id}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => onComplaintClick(complaint)}
            >
              <td className="border border-gray-300 px-4 py-2">{complaint.id}</td>
              <td className="border border-gray-300 px-4 py-2">{complaint.seat}</td>
              <td className="border border-gray-300 px-4 py-2">{complaint.issueType}</td>
             <td
  className={`border border-gray-300 px-4 py-2 ${
    complaint.severity === "High"
      ? "text-red-600 font-bold"
      : complaint.severity === "Medium"
      ? "text-yellow-500"
      : "text-green-600"
  }`}
>
  {complaint.severity}
</td>
              <td className="border border-gray-300 px-4 py-2">{complaint.status}</td>
              <td className="border border-gray-300 px-4 py-2">{complaint.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintTable;