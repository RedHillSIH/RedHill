import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar';
import axios from "axios"
import ComplaintTable from '../components/ComplaintTable';
import ComplaintModal from '../components/ComplaintModal';
import ComplaintModalUser from '../components/ComplaintModalUser';
import ChatWidget from "../components/ChatWidget"
import { Send, Image, Paperclip, Mic, X } from 'lucide-react';


// loading gif - https://railmadad.indianrailways.gov.in/madad/final/images/RailMadad.gif
// logo- https://railmadad.indianrailways.gov.in/madad/final/images/logog20.png
// bg- https://railmadad.indianrailways.gov.in/madad/final/images/body-bg.jpg


function HomePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioPreview, setAudioPreview] = useState(null);
  let auFile;
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [selectedCategory, setSelectedCategory] = useState("currcomp.category" || "");
  const [selectedSubCategory, setSelectedSubCategory] = useState("currcomp.subCategory" || "");
  const [compreg, setcompreg] = useState(false);

  const [currcomp,setcurrcomp] = useState(
    {
      complaintId: "123456465129",
      // seat: "B2 26",
      category: "Coach-Cleanliness",
      severity: "Low",
      subCategory: "Toilet",
      mobileNo:"123",
      pnrNo:"123",


    }
   
  );

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
  
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
  
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        
        // Create a File object to work with your existing handleInputChange
        const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
        
        // Trigger input change with the audio file
        auFile=audioFile
        const event = {
          target: {
            name: 'audioFile',
            type: 'file',
            files: [audioFile]
          }
        };
        
        handleInputChange(event);
        // Create audio preview
        setAudioPreview({
          url: URL.createObjectURL(audioBlob)
        });
      };
  
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // console.log(formData);
    }
  };
  
  const clearAudioPreview = () => {
    setAudioPreview(null);
    
    // Reset audio file in form data
    setFormData((prevData) => {
      const newFormData = { ...prevData };
      delete newFormData.audioFile;
      return newFormData;
    });
  };
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const handleComplaintClick = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleCloseModal = () => {
    setSelectedComplaint(null);
  };


  const handleUpdate = () => {
    // Call the update function (replace with actual PUT API logic)
    const onUpdateCategory={
      "complaintId":currcomp.complaintId,
      "category": selectedCategory,
      "subCategory": selectedSubCategory
    };
    alert("Category and Subcategory updated successfully!");
  };


    const [selectedOption, setSelectedOption] = useState("TRAIN");
    const[islogged,setislogged]=useState(false);
    const[complaints,setComplaints]=useState([]);
    const [formData, setFormData] = useState({
      mobileNo: "",
      otp: "",
      pnrNo: "",
      // incidentDate: "",
      file:[],
      files:[],
      grievanceDescription: "",
    });
    const [otpGenerated, setOtpGenerated] = useState("");

    // if(islogged===true){

    // }


    const convert = async (data) => {
      const op = []; // Use an array to store the uploaded file links
      for (const file of data.file) { // Use 'const' in the for...of loop
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', import.meta.env.VITE_APP_UPLOAD_PRESET);
  
          try {
              const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUD_NAME}/auto/upload`, {
                  method: 'POST',
                  body: formData,
              });
  
              const responseData = await response.json();
  
              if (response.ok) {
                  // Add the uploaded image's URL to the output array
                  op.push(responseData.secure_url);
              } else {
                  console.error(`Error uploading file: ${responseData.error.message}`);
              }
          } catch (error) {
              console.error(`Network error: ${error.message}`);
          }
      }
      return op; // Return the array of uploaded file links
  };
  


    useEffect(() => {
      //setLoad(true);
      const getUser = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}user/get`, { withCredentials: true });
          if (res.data.loggedin === false) {
            // navigate("/");
            setislogged(false)
          } else {
            // setLoad(false);
            
            setislogged(true);
            // console.log(res.data.user);

            // setComplaints(res.data.myComplaints);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }, []);

    useEffect(() => {
      //setLoad(true);
      const getComp = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}user/getComplaints`, { withCredentials: true });
          if (res.data.loggedin === false) {
            // navigate("/");
            setislogged(false)
          } else {
            // setLoad(false);
            
            setislogged(true);
            //setComplaints(res.data.myComplaints.myComplaints)
            // console.log(res.data.myComplaints)
            setComplaints(res.data.myComplaints)

          }
        } catch (error) {
          console.log(error);
        }
      };
      getComp();
      // console.log(complaints)
    }, []);
  
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

    const categories = {
      "Medical Assistance": ["Medical Assistance"],
      "Security": [
        "Eve-teasing/ /Misbehaviour with lady passengers/Rape",
        "Theft of Passengers Belongings/Snatching",
        "Unauthorized person in Ladies/Disabled 03/1 Comp Coach/SLR/Reserve Coach",
        "Harassment/Extortion by Security Personnel/Railway personnel",
        "Nuisance by Hawkers/Beggar/Eunuch",
        "Luggage Left Behind/Unclaimed/Suspected Articles",
        "Passenger Missing/Not responding call",
        "Smoking/Drinking Alcohol/Narcotics",
        "Dacoity/Robbery/Murder/Riots",
        "Quarrelling/Hooliganism",
        "Passenger fallen down",
        "Nuisance by passenger",
        "Misbehaviour",
        "Others",
      ],
      "Divyangjan Facilities": [
        "Divyangjan coach unavailability",
        "Divyangjan toilet /washbasin",
        "Braille signage in coach",
        "Others",
      ],
      "Facilities for Women with Special needs": ["Baby Food"],
      "Electrical Equipment": [
        "Air Conditioner",
        "Fans",
        "Lights",
        "Charging Points",
        "Others",
      ],
      "Coach-Cleanliness": [
        "Toilet",
        "Washbasin",
        "Cockroach / Rodents",
        "Coach Interior",
        "Coach Exterior",
        "Others",
      ],
      "Punctuality": ["NTES APP", "Late Running", "Others"],
      "Water Availability": [
        "Packages Drinking Water / Rail Neer",
        "Toilet",
        "Washbasin",
        "Others",
      ],
      "Coach - Maintenance": [
        "Window/Seat Broken",
        "Window/Door locking problem",
        "Tap leaking/Tap not working",
        "Broken/Missing Toilet Fittings",
        "Jerks/Abnormal Sound",
        "Others",
      ],
      "Catering & Vending Services": [
        "Overcharging",
        "Service Quality & Hygiene",
        "Food Quality & Quantity",
        "E-Catering",
        "Food & Water Not Available",
        "Others",
      ],
      "Staff Behaviour": ["Staff Behaviour"],
      "Corruption/ Bribery": ["Corruption/ Bribery"],
      "Bed Roll": ["Dirty / Torn", "Overcharging", "Non Availability", "Others"],
      "Miscellaneous": ["Miscellaneous"],
    };
  

    
  
    // Handle form inputs
    const handleInputChange = (e) => {
      const { name, value, type, files } = e.target;
    
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "file" ? [...files] : value, // Handle multiple files as an array
      }));
    };
    
  
    // Handle form submission
    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   if (formData.otp !== otpGenerated) {
    //     alert("Invalid OTP. Please try again.");
    //     return;
    //   }
    //   const jsonData = {
    //     mobileNo: formData.mobileNo,
    //     pnrNo: formData.pnrNo,
    //     // incidentDate: formData.incidentDate,
    //     fileName: formData.file ? formData.file.name : null,
    //     grievanceDescription: formData.grievanceDescription,
    //   };
    //   console.log("Form Data to be sent to backend:", jsonData);
    //   alert("Form submitted successfully!");
    // };

   
    


    const handleSubmit = async (e) => {
      console.log(audioPreview)
      e.preventDefault(); // Prevent the default form submission
      try {
        // Fetch the blob data from the Blob URL
        const responseAudio= await fetch(audioPreview);
        const blob = await responseAudio.blob();
        const fileAudio = new File([blob], "userAudio", { type: blob.type });
        console.log(fileAudio); // The File object
        const formDataAudio = new FormData();
          formDataAudio.append('file', fileAudio);
          formDataAudio.append('upload_preset', import.meta.env.VITE_APP_UPLOAD_PRESET);
          try {
            const responseAudio = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUD_NAME}/auto/upload`, {
                method: 'POST',
                body: formDataAudio,
            });

            const responseDataAudio = await responseAudio.json();

            if (responseAudio.ok) {
                // Add the uploaded image's URL to the output array
                let myAudioUrl=responseDataAudio.secure_url;
                console.log(myAudioUrl)
            } else {
                console.error(`Error uploading file: ${responseDataAudio.error.message}`);
            }
        } catch (error) {
            console.error(`Network error: ${error.message}`);
        }

    } catch (error) {
        console.error("Error creating file from Blob URL:", error);
    }
      return;
      if (formData.otp !== otpGenerated) {
        alert("Invalid OTP. Please try again.");
        return;
      }
    
      try {
        const uploadedFiles = await convert(formData); // Ensure file conversion is processed
        // console.log(uploadedFiles)
        // console.log("starting")
        // setFormData((prevData) => ({
        //   ...prevData,
        //   files: uploadedFiles,
        // }));
        let tempObj=formData
        tempObj.files=uploadedFiles
        // console.log(tempObj.files)

        await axios
        .post(`${import.meta.env.VITE_API_URL}comp/create`,tempObj,{ withCredentials: true })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
             alert('Complaint Registered');
             console.log(res.data);
             setSelectedOption("currComp")
             setComplaints(res.data)
             setcompreg(true);
            // navigate('/');
          }
        })


        // Add logic to send `formData` to the backend or perform necessary actions
      } catch (error) {
        console.error("Error during form submission:", error.message);
      }
    };
    
  
    const renderContent = () => {
      switch (selectedOption) {
        case "TRAIN":
          return (
            <div className="shadow-md w-full  p-4 rounded-md ">
              <h1 className="text-2xl font-bold text-[#75002b] mt-2 mb-2">Grievance Detail</h1>
              <p className="text-sm text-right text-red-500">*Mandatory Fields</p>
              <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
  {/* Mobile Number */}
  <div className="flex flex-col">
    <label className="text-gray-700 font-medium">Mobile No. *</label>
    <input
      type="text"
      name="mobileNo"
       placeholder="Enter Mobile No."
       className="border p-2 rounded-md flex-1"
      value={formData.mobileNo}
      onChange={handleInputChange}
    />
    <button type="button" className="bg-[#75002b] hover:bg-red-700 text-white px-2 py-2 mx-2 my-2 rounded-md" onClick={handleGetOtp}>Get OTP</button>
  </div>

  {/* OTP */}
  <div className="flex flex-col">
    <label className="text-gray-700 font-medium ">OTP *</label>
    <input
      type="text"
      name="otp"
                    placeholder="Enter OTP"
                    className="border p-2 rounded-md"
      value={formData.otp}
      onChange={handleInputChange}
    />
  </div>
  <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">PNR No </label>
                  <input
                    type="text"
                    name="pnrNo"
                    placeholder="Enter PNR No."
                    className="border p-2 rounded-md"
                    value={formData.pnrNo}
                    onChange={handleInputChange}
                  />
                </div>
                

  {/* File Input */}
  <div className="flex flex-col">
    <label className="text-gray-700 font-medium">Upload File <span className=" text-green-600">(Note:Both PNR and issue can be extracted from media.)</span></label>
    <input
      type="file"
      name="file"
      multiple // Allow multiple file uploads
      className="border p-2 rounded-md"

      onChange={handleInputChange}
    />
  </div>
    


  {/* Grievance Description */}
  <div className="col-span-2 flex flex-col">
    <label className="text-gray-700 font-medium">Grievance Description </label>
    <textarea
      name="grievanceDescription"
                    className="border p-2 rounded-md"
                    rows="4"
                    placeholder="Enter your grievance details..."
      value={formData.grievanceDescription}
      onChange={handleInputChange}
    />
  </div>

     

  {/* Submit Button */}
  {/* <div className="col-span-2">
    <button type="submit">Submit</button>
  </div>
  <button
  type="reset"
  className="bg-red-200 hover:bg-red-400 px-4 py-2 mb-6 rounded-md"
  onClick={() =>
    setFormData({
      mobileNo: "",
      otp: "",
      pnrNo: "",
      file: [], // Reset file to an empty array
      grievanceDescription: "",
    })
  }
>
  Reset
</button> */}
<div className="col-span-2 flex justify-end space-x-4">
   {/* Voice Input Section */}
   <div className=" flex-col col-span-1">
          <label className="text-gray-700 font-medium">Voice Input</label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-2 rounded-lg ${
                isRecording 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-[#75002b] text-white'
              }`}
            >
              <Mic className="w-5 h-5" />
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            
            {audioPreview && (
              <div className="flex items-center space-x-2">
                <audio controls className="h-10">
                  <source src={audioPreview.url} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
                <button 
                  type="button"
                  onClick={clearAudioPreview}
                  className="bg-red-500 text-white rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
<button
  type="reset"
  className="bg-[#75002b] text-white px-4 py-2 rounded-md hover:bg-red-700"
  onClick={() =>
    setFormData({
      mobileNo: "",
      otp: "",
      pnrNo: "",
      file: [], // Reset file to an empty array
      grievanceDescription: "",
    })
  }
>
  Reset
</button>
                  <button
                    type="submit"
                    className="bg-[#75002b] text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Submit
                  </button>
                </div>

</form>

            </div>
          );
        case "currComp":
          return (
            <div className="shadow-md w-full p-4 rounded-md border mt-4">
      <h1 className="text-2xl font-bold text-[#75002b] mt-2 mb-4">Complaint Details</h1>
      <p className=' text-green-700 mx-2 my-2'>Your complaint has been filed with the following details. In case of any error kindly update.</p>
      <div className="grid grid-cols-2 gap-4">
        {/* Complaint ID */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Complaint ID</label>
          <p className="border p-2 rounded-md bg-gray-100">{currcomp.complaintId}</p>
        </div>

        {/* Mobile Number */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Mobile No.</label>
          <p className="border p-2 rounded-md bg-gray-100">{currcomp.mobileNo}</p>
        </div>

        {/* PNR Number */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">PNR No.</label>
          <p className="border p-2 rounded-md bg-gray-100">{currcomp.pnrNo} </p>
        </div>

        {/* Grievance Description */}
        <div className="col-span-2 flex flex-col">
          <label className="text-gray-700 font-medium">Grievance Description</label>
          <p className="border p-2 rounded-md bg-gray-100">{currcomp.grievanceDescription}</p>
        </div>

                {/* Category Dropdown */}
                <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sub-Category Dropdown */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Sub-Category</label>
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="">Select Sub-Category</option>
            {(categories[selectedCategory] || []).map((subCategory) => (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
        </div>

        {/* Update Button */}
        <div className="col-span-2 flex justify-end mt-4">
          <button
            onClick={handleUpdate}
            className="bg-[#75002b] text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
          );
          case "Complaints":
            if(islogged === false){
              return(
                <div className="bg-white shadow-md rounded-md p-8 w-full">
              <h1 className="text-2xl font-bold text-[#75002b] mb-4">Complaints</h1>
              <form>
              <p className="text-gray-500">Please <a href="/login" className='font-semibold text-blue-600'>login</a> to review your past complaints.</p>
              </form>
            </div>

              )
            }
            else{

              return (

                <div className="bg-white shadow-md rounded-md p-8 w-full max-w-4xl overflow-scroll">
                  
                  <h1 className="text-2xl font-bold text-[#75002b] mb-4">Complaints</h1>
                  <div className= "h-96 ">
                  <main className="flex-1 p-6 overflow-y-auto">
              <ComplaintTable
                complaints={complaints}
                onComplaintClick={handleComplaintClick}
              />
              {selectedComplaint && (
                <ComplaintModalUser
                  complaint={selectedComplaint}
                  onClose={handleCloseModal}
                />
              )}
            </main>
                  </div>
                  
                </div>
              );

            }
          
        default:
          return null;
      }
    }



  return (
    <div className='h-screen'>
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
            <div className=' h-3/4  w-2.5/3 mx-auto my-auto items-center md:flex  bg-white/70 rounded-t rounded-b'>
            <div className="md:h-full  bg-[#930b3e] w-full md:w-60 text-white  text-2xl border-t border-l border-b rounded">
            <ul className="rounded-t rounded-l ">
                <li
                className={`border-b p-2 text-lg font-medium cursor-pointer ${
                  selectedOption === "TRAIN" ? "bg-[#75002b] underline rounded" : ""
                }`}
                onClick={() => setSelectedOption("TRAIN")}
              >
                TRAIN
              </li>
              {compreg?(<li
                className={`border-b p-2 text-lg font-medium cursor-pointer ${
                  selectedOption === "currComp" ? "bg-[#75002b] underline" : ""
                }`}
                onClick={() => setSelectedOption("currComp")}
              >
                Current Complaint
              </li> ):(<div></div>)
              } 
              {/* <li
                className={`border-b p-2 text-lg font-medium cursor-pointer ${
                  selectedOption === "currComp" ? "bg-[#75002b] underline" : ""
                }`}
                onClick={() => setSelectedOption("currComp")}
              >
                Current Complaint
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
            <div className="overflow-hidden">
            {renderContent()}
            </div>
            
                     </div>
        </div>
        <div className="">
          <ChatWidget></ChatWidget>
        </div>
        <div className=" p-2 fixed-bottom bg-[#75002b] text-white text-1.5xl text-center">Copyright ©2019 RAILMADAD. All Rights Reserved.</div>
    </div>
  )
}

export default HomePage