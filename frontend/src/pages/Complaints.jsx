import React, { useEffect, useState } from 'react'
import ComplaintModal from '../components/ComplaintModal';
import ComplaintTable from '../components/ComplaintTable';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Complaints() {
    const navigate = useNavigate();
    const[name,setname]=useState();
    const[id,setid]=useState();

    const [isLogged, setIsLogged] = useState(false);
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    // Fetch user authentication status
    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}emp/get`, { 
                    withCredentials: true 
                });

                if (res.data.loggedin === false) {
                    setIsLogged(false);
                    navigate("/login");
                } else {
                    setIsLogged(true);
                    setname(res.data.user.name);
                    setid(res.data.user.employeeId)
                    // console.log(user);
                   
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
                navigate("/");
            }
        };

        checkUserAuth();
    }, [navigate]);

    // Fetch complaints
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}emp/complaints`, { 
                    withCredentials: true 
                });

                if (res.data.loggedin === true) {
                    setComplaints(res.data.myComplaints || []);
                    setIsLogged(true);
                } else {
                    setIsLogged(false);
                    navigate("/");
                }
            } catch (error) {
                console.error("Failed to fetch complaints:", error);
                setComplaints([]);
                navigate("/");
            }
        };

        if (isLogged) {
            fetchComplaints();
        }
    }, [isLogged, navigate]);

    const handleComplaintClick = (complaint) => {
        setSelectedComplaint(complaint);
    };
    
    const handleCloseModal = () => {
        setSelectedComplaint(null);
    };
    
    return (
        <div className="h-screen">
            <Navbar islogged={isLogged} />
            <div className="flex h-screen bg-gray-100">
                {/* <Sidebar selected="Complaints" /> */}
                
                <div className="flex-1 flex flex-col">
                    <header className="bg-white flex justify-between shadow p-4">
                        <h1 className="text-2xl text-red-700 font-bold">Complaints</h1>
                        <h1 className="text-2xl font-bold">{name}</h1>
                        <h1 className="text-2xl font-bold text-blue-500">Id:{id}</h1>


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
        </div>
    );
}

export default Complaints;