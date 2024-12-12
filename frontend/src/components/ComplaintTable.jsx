import React from "react";

const ComplaintTable = ({ complaints, onComplaintClick }) => {
  // complaints[0].status="Completed";
  console.log(complaints);
  
  return (
  
    <div className="overflow-x-auto min-h-screen">
      {/* {console.log(complaints)} */}
      <table className="min-w-full bg-white rounded text-sm">
      <thead className="hidden sm:table-header-group sm:bg-gray-200 rounded">
      <tr>
            <th className=" px-4 py-2 text-left">Ref No.</th>
            {/* <th className=" px-4 py-2 text-left">Seat</th> */}
            <th className=" px-4 py-2 text-left">Issue Type</th>
            <th className=" px-4 py-2 text-left">Severity</th>
            <th className=" px-4 py-2 text-left">Status</th>
            <th className=" px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody className="bg-gray-100 ">
          {complaints.map((complaint) => (
            <tr
              key={complaint.complaintId}
              className="bg-white hover:bg-gray-50 cursor-pointer h-16 rounded  border-4 "
              onClick={() => onComplaintClick(complaint)}
            >
              <td className=" px-4 py-2 text-blue-600 font-semibold ">{complaint.complaintId}</td>
              {/* <td className=" px-4 py-2">{complaint.seat}</td> */}
              <td className=" px-4 py-2">{complaint.category}</td>
             <td
  className={` px-4 py-2 ${
    complaint.severity === "High"
      ? "text-red-600 font-semibold"
      : complaint.severity === "Medium"
      ? "text-yellow-500"
      : "text-green-600"
  }`}
>
  {complaint.severity}
</td>
              {(complaint.resolved===0)?(<td className="text-yellow-500">Pending</td>):(<td className="text-green-600">Completed</td>)}
              <td className=" px-4 py-2">{complaint.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintTable;