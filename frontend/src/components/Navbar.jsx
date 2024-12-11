import React from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";

function Navbar({islogged}) {

    const handleLogOut = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}user/logout`, { withCredentials: true });
          if (res.data === "Unauthorised Request") {
            islogged=false;
            navigate("/");

          } else {
          }
        } catch (error) {
          console.error("Logout error:", error);
        }
      };
  return (
    <div className="h-fit items-center justify-between bg-white min-w-full p-3 md:flex md:justify-between bg-center ">
    <div className='flex justify-center'>
        <img className="md:h-8 h-8 mx-2 mt-2" src="https://railmadad.indianrailways.gov.in/madad/final/images/logog20.png"></img>
        <div >
            <h1 className='md:text-xl font-bold text-[#75002b]'>RailMadad</h1>
            <p className='md:text-[12px] md:w-13 font-bold'>For Inquiry, Assistance & </p>
            <p className='md:text-[12px] md:w-13 font-bold'>Grievance Redressal</p>

        </div>
    </div>
    <div className='md:flex md:justify-center hidden'>
        <div className='bg-red-800 rounded-md  p-2 h-10 flex justify-center mx-2'>
        <p className='text-white font-bold'>139</p>
        </div>
   
        <p className='mt-2'>for security/medical assistance</p>
    </div>
   {islogged?( 
     <div className="justify-center">
<button 
  className='bg-red-800 p-2 rounded text-white hover:bg-[#75002b] hover:text-white mx-2' 
  onClick={handleLogOut}
>
  Log-Out
</button>
    </div>):(
        <div className='justify-center flex '>
       <a href='/login'><button className='bg-[#dcdef9] p-2 rounded hover:bg-[#75002b] hover:text-white  mx-2'  >Log In</button></a> 
       <a href='/register'><button className='bg-[#efe4e8] p-2 rounded hover:bg-[#75002b]  mx-2 '>Signup</button></a> 

    </div>
       
    )}
</div>
  )
}

export default Navbar