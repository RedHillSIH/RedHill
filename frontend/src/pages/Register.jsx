import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarSimple from '../components/NavbarSimple';

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
    };
    const api = import.meta.env.VITE_API_URL;
    await axios
      .post(`${api}user/createUser`, userInfo)
      .then((res) => {
        alert('Registration Successful');
        navigate('/');
    })
      .catch((err) => {
        if (err.response) {
          alert('Error: ' + err.response.data.message);
        }
      });
  };

  return (
    <>
     <NavbarSimple></NavbarSimple>
   
    <div
      className="min-h-screen w-full flex justify-center items-center"
      style={{
        backgroundImage: `url('https://railmadad.indianrailways.gov.in/madad/final/images/body-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white shadow-md rounded-lg px-6 py-8 w-full max-w-md">
        <h2 className="text-center font-bold text-2xl text-[#75002b] mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
            {errors.name && <span className="text-red-500 text-sm">This field is required.</span>}
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
            {errors.email && <span className="text-red-500 text-sm">This field is required.</span>}
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone', { required: true, pattern: /^[0-9]{10}$/ })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
            {errors.phone && <span className="text-red-500 text-sm">A valid phone number is required.</span>}
          </div>
          <div className="mb-6">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
            {errors.password && <span className="text-red-500 text-sm">This field is required.</span>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#75002b] hover:bg-[#930b3e] text-white font-bold py-2 px-4 rounded w-full"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center text-black mt-4">
              Already have an account?{' '}
              <a className="text-blue-500 hover:text-blue-700" href="/login">
                Log-In
              </a>
            </p>
      </div>
    </div>
    <div className=" p-2 fixed-bottom bg-[#75002b] text-white text-1.5xl text-center">Copyright ©2019 RAILMADAD. All Rights Reserved.</div>

    </>
  );
}

export default Register;
