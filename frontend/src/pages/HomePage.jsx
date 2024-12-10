import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';

// loading gif - https://railmadad.indianrailways.gov.in/madad/final/images/RailMadad.gif
// logo- https://railmadad.indianrailways.gov.in/madad/final/images/logog20.png
// bg- https://railmadad.indianrailways.gov.in/madad/final/images/body-bg.jpg


function HomePage() {
    const [selectedOption, setSelectedOption] = useState("TRAIN");
    const[islogged,setislogged]=useState(false);
    const[complaints,setComplaints]=useState([]);
    const [formData, setFormData] = useState({
      mobileNo: "",
      otp: "",
      pnrNo: "",
      incidentDate: "",
      file: null,
      grievanceDescription: "",
    });
    const [otpGenerated, setOtpGenerated] = useState("");
  
    // Dummy OTP Generator
    const handleGetOtp = () => {
      if (formData.mobileNo.trim().length === 10) {
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
        setOtpGenerated(generatedOtp);
        alert(`Your OTP is: ${generatedOtp}`); // Display OTP (simulate SMS)
      } else {
        alert("Please enter a valid 10-digit mobile number.");
      }
    };


    
  
    // Handle form inputs
    const handleInputChange = (e) => {
      const { name, value, type, files } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "file" ? files[0] : value,
      }));
    };
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.otp !== otpGenerated) {
        alert("Invalid OTP. Please try again.");
        return;
      }
      const jsonData = {
        mobileNo: formData.mobileNo,
        pnrNo: formData.pnrNo,
        incidentDate: formData.incidentDate,
        fileName: formData.file ? formData.file.name : null,
        grievanceDescription: formData.grievanceDescription,
      };
      console.log("Form Data to be sent to backend:", jsonData);
      alert("Form submitted successfully!");
    };
  
    const renderContent = () => {
      switch (selectedOption) {
        case "TRAIN":
          return (
            <div className="shadow-md w-full h-full p-4 rounded-md min-h-fit">
              <h1 className="text-2xl font-bold text-[#75002b] mb-2">Grievance Detail</h1>
              <p className="text-sm text-right text-red-500">*Mandatory Fields</p>
              <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit} >
                {/* Mobile Number */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">Mobile No.</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      name="mobileNo"
                      placeholder="Enter Mobile No."
                      className="border p-2 rounded-md flex-1"
                      value={formData.mobileNo}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="bg-[#75002b] text-white px-4 py-2 rounded-md"
                      onClick={handleGetOtp}
                    >
                      Get OTP
                    </button>
                  </div>
                </div>
  
                {/* OTP */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">OTP *</label>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    className="border p-2 rounded-md"
                    value={formData.otp}
                    onChange={handleInputChange}
                  />
                </div>
  
                {/* PNR No */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">PNR No *</label>
                  <input
                    type="text"
                    name="pnrNo"
                    placeholder="Enter PNR No."
                    className="border p-2 rounded-md"
                    value={formData.pnrNo}
                    onChange={handleInputChange}
                  />
                </div>
  
                {/* Incident Date */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">Incident Date *</label>
                  <input
                    type="datetime-local"
                    name="incidentDate"
                    className="border p-2 rounded-md"
                    value={formData.incidentDate}
                    onChange={handleInputChange}
                  />
                </div>
  
                {/* Upload File */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">
                    Upload File (PDF, JPG, PNG, MP4 up to 5 MB)
                  </label>
                  <input
                    type="file"
                    name="file"
                    className="border p-2 rounded-md"
                    accept=".pdf, .jpg, .jpeg, .png, .mp4"
                    onChange={handleInputChange}
                  />
                </div>
  
                {/* Grievance Description */}
                <div className="col-span-2 flex flex-col">
                  <label className="text-gray-700 font-medium">Grievance Description *</label>
                  <textarea
                    name="grievanceDescription"
                    className="border p-2 rounded-md"
                    rows="4"
                    placeholder="Enter your grievance details..."
                    value={formData.grievanceDescription}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
  
                {/* Buttons */}
                <div className="col-span-2 flex justify-end space-x-4">
                  <button
                    type="reset"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    onClick={() =>
                      setFormData({
                        mobileNo: "",
                        otp: "",
                        pnrNo: "",
                        incidentDate: "",
                        file: null,
                        grievanceDescription: "",
                      })
                    }
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
        case "STATION":
          return (
            <div className="bg-white shadow-md rounded-md p-8 w-full max-w-4xl">
              <h1 className="text-2xl font-bold text-[#75002b] mb-4">Station Details</h1>
              <form>
                <p className="text-gray-500">This is a blank form for now.</p>
              </form>
            </div>
          );
          case "Complaints":
          return (
            <div className="bg-white shadow-md rounded-md p-8 w-full max-w-4xl">
              <h1 className="text-2xl font-bold text-[#75002b] mb-4">Complaints</h1>
              <form>
                <p className="text-gray-500">This is a blank form for now.</p>
              </form>
            </div>
          );
        default:
          return null;
      }
    }



  return (
    <div>
        {/* <div className="min-h-12 items-center bg-white min-w-full p-3 md:flex md:justify-between bg-center">
            <div className='flex '>
                <img className="h-12 mx-2 mt-2" src="https://railmadad.indianrailways.gov.in/madad/final/images/logog20.png"></img>
                <div >
                    <h1 className='text-xl font-bold text-[#75002b]'>RailMadad</h1>
                    <p className='text-[12px] w-13 font-bold'>For Inquiry, Assistance & </p>
                    <p className='text-[12px] w-13 font-bold'>Grievance Redressal</p>

                </div>
            </div>
            <div className='flex'>
                <div className='bg-red-800 rounded-md  p-2 h-10 flex justify-center mx-2'>
                <p className='text-white font-bold'>139</p>
                </div>
           
                <p className='mt-2'>for security/medical assistance</p>
            </div>
            <div>
                <button className='bg-[#dcdef9] p-2 rounded hover:bg-[#75002b] hover:text-white  mx-2'>Log In</button>
                <button className='bg-[#efe4e8] p-2 rounded hover:bg-[#75002b] hover:text-white  mx-2 '>Signup</button>

            </div>
        </div> */}
        <Navbar islogged={islogged}></Navbar>
        {/* body */}
        <div className="min-h-screen  grid " style={{
          backgroundImage: `url('https://railmadad.indianrailways.gov.in/madad/final/images/body-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          
        }}>
            <div className=' h-3/4  w-2.5/3 mx-auto my-auto items-center flex  bg-white/70 rounded-t rounded-b'>
            <div className="h-full  bg-[#930b3e] w-60 text-white  text-2xl border-t border-l border-b rounded">
            <ul className="rounded-t rounded-l ">
                <li
                className={`border-b p-2 text-lg font-medium cursor-pointer ${
                  selectedOption === "TRAIN" ? "bg-[#75002b] underline rounded" : ""
                }`}
                onClick={() => setSelectedOption("TRAIN")}
              >
                TRAIN
              </li> 
              {/* <li
                className={`border-b p-2 text-lg font-medium cursor-pointer ${
                  selectedOption === "STATION" ? "bg-[#75002b] underline" : ""
                }`}
                onClick={() => setSelectedOption("STATION")}
              >
                STATION
              </li>      */}
              <li
                className={`border-b p-2 text-lg font-medium cursor-pointer ${
                  selectedOption === "Complaints" ? "bg-[#75002b] underline" : ""
                }`}
                onClick={() => setSelectedOption("Complaints")}
              >
                Complaints
              </li>     
               </ul>
            </div>
            <div className="h-fit">
            {renderContent()}
            </div>
            
                     </div>
        </div>
        <div className=" p-2 fixed-bottom bg-[#75002b] text-white text-1.5xl text-center">Copyright ©2019 RAILMADAD. All Rights Reserved.</div>
    </div>
  )
}

export default HomePage