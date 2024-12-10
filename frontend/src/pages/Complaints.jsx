import React, { useState } from 'react'
import ComplaintModal from '../components/ComplaintModal';
import ComplaintTable from '../components/ComplaintTable';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';


function Complaints() {
    // Complaints data is stored in the state
    const [complaints] = useState([
        {
          id: "123456465129",
          seat: "B2 26",
          issueType: "Blanket",
          severity: "High",
          status: "Completed",
          date: "Sept 05, 2024",
        },
        {
          id: "123456465126",
          seat: "S7 60",
          issueType: "Cleanliness",
          severity: "High",
          status: "Completed",
          date: "Sept 05, 2024",
        },
      ]);
    
      const [selectedComplaint, setSelectedComplaint] = useState(null);
    
      const handleComplaintClick = (complaint) => {
        setSelectedComplaint(complaint);
      };
    
      const handleCloseModal = () => {
        setSelectedComplaint(null);
      };
    
      return (
        <>
        <Navbar islogged={true}></Navbar>
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <Sidebar selected="Complaints" />
    
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <header className="bg-white shadow p-4">
              <h1 className="text-2xl font-bold">Statistics</h1>
            </header>
            <main className="flex-1 p-6 overflow-y-auto">
              <ComplaintTable
                complaints={complaints}
                onComplaintClick={handleComplaintClick}
              />
              {selectedComplaint && (
                <ComplaintModal
                  complaint={selectedComplaint}
                  onClose={handleCloseModal}
                />
              )}
            </main>
          </div>
        </div>
        </>
      );
      
}

export default Complaints