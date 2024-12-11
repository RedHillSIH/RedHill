
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NavbarSimple from '../components/NavbarSimple';
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const userInfo = {
      phone: data.phone,
      password: data.password,
    };
    console.log(userInfo);
    const api=import.meta.env.VITE_API_URL;
    await axios
      .post(`${api}user/login`,userInfo, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          alert('Log-In Successful');
          navigate('/');
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          alert('Error: ' + err.response.data.message);
        }
      });
  };

  return (
    <>
    <NavbarSimple></NavbarSimple>
      <div className="min-h-screen w-full grid justify-center items-center " style={{
          backgroundImage: `url('https://railmadad.indianrailways.gov.in/madad/final/images/body-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          
        }}>
        <div className="w-full  justify-center items-center">
          <div className="bg-white shadow-md rounded-lg px-8 py-10">
            <h2 className="text-center font-bold text-2xl text-[#75002b] mb-6">Log-In</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="phone">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.phone && <span className="text-red-500 text-sm">This field is required.</span>}
              </div>
              <div className="mb-6">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register('password', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.password && <span className="text-red-500 text-sm">This field is required.</span>}
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-[#75002b] hover:bg-[#930b3e] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Log In
                </button>
              </div>
            </form>
            <p className="text-center text-black mt-4">
              New to Railmadad?{' '}
              <a className="text-blue-500 hover:text-blue-700" href="/register">
                Sign-Up
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className=" p-2 fixed-bottom bg-[#75002b] text-white text-1.5xl text-center">Copyright ©2019 RAILMADAD. All Rights Reserved.</div>

    </>
  );
}

export default Login;