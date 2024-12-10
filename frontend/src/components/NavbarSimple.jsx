import React from 'react'

function NavbarSimple() {
  return (
    <div>{/* Navbar with just logo */}
    <div className="min-h-12 items-center bg-white min-w-full p-3 md:flex md:justify-between bg-center">
           <div className='flex '>
               <a href='/' className='flex'> <img className="h-12 mx-2 mt-2" src="https://railmadad.indianrailways.gov.in/madad/final/images/logog20.png">
               </img>
               <div >
                   <h1 className='text-xl font-bold text-[#75002b]'>RailMadad</h1>
                   <p className='text-[12px] w-13 font-bold'>For Inquiry, Assistance & </p>
                   <p className='text-[12px] w-13 font-bold'>Grievance Redressal</p>

               </div></a>
              
           </div>
           <div className='flex'>
               <div className='bg-red-800 rounded-md  p-2 h-10 flex justify-center mx-2'>
               <p className='text-white font-bold'>139</p>
               </div>
          
               <p className='mt-2'>for security/medical assistance</p>
           </div>
           {/* <div>
               <button className='bg-[#dcdef9] p-2 rounded hover:bg-[#75002b] hover:text-white  mx-2'>Log In</button>
               <button className='bg-[#efe4e8] p-2 rounded hover:bg-[#75002b] hover:text-white  mx-2 '>Signup</button>

           </div> */}
       </div></div>
  )
}

export default NavbarSimple