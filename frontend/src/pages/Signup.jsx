import React, { useState } from 'react';
import GenderCheckbox from "./GenderCheckbox.jsx";
import {Link} from "react-router-dom";
import useSignup from '../hooks/useSignup.js';

export default function Signup() {
  const [Inputs , SetInputs]  = useState({
    fullName : "",
    userName :"",
    password : "",
    confirmPassword :"",
    gender :""
})

const {loading , signup } = useSignup();

const handleCheckBoxChange = (gender) =>{
  SetInputs({...Inputs,gender})
}
const handleSubmit =  async (e)=>{
  e.preventDefault();
  await signup(Inputs);
  
  console.log(Inputs);
}


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="card w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl border border-white/30">
        <div className="card-body p-8">
          {/* Header with logo */}
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl font-bold text-center mb-2">
              <span className="text-gray-800">Join </span>
              <span className="text-primary">Chatter</span>
              <span className="text-secondary">Box</span> 💬
            </h1>
            <p className="text-gray-500">Let's get you started!</p>
          </div>

          {/* Signup Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-600">Full Name</span>
              </label>
              <input  value= {Inputs.fullName}
              onChange = {(e) => SetInputs({... Inputs , fullName:e.target.value})}
                type="text" 
                placeholder="John Doe" 
                className="input input-bordered w-full bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary text-gray-800 placeholder-gray-500" 
              />
            </div>

            {/* Username Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-600">Username</span>
              </label>
              <input 
                type="text" 
                placeholder="johndoe" 
                value={Inputs.userName}
                onChange={(e) =>SetInputs({...Inputs , userName:e.target.value})}
                className="input input-bordered w-full bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary text-gray-800 placeholder-gray-500" 
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-600">Password</span>
              </label>
              <input 
                type="password" 
                value={Inputs.password}
                onChange={(e) =>SetInputs({...Inputs , password:e.target.value})}
                placeholder="••••••••" 
                className="input input-bordered w-full bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary text-gray-800 placeholder-gray-500" 
              />
            </div>

            {/* Confirm Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-600">Confirm Password</span>
              </label>
              <input 
              value={Inputs.confirmPassword}
              onChange={(e) =>SetInputs({...Inputs , confirmPassword:e.target.value})}
                type="password" 
                placeholder="••••••••" 
                className="input input-bordered w-full bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary text-gray-800 placeholder-gray-500" 
              />
            </div>

            {/* Gender Selection */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-600">Gender</span>
              </label>
              <GenderCheckbox onCheckboxChange = {handleCheckBoxChange} selectedGender = {Inputs.gender} />
            </div>

            {/* Login Link */}
            <div className="text-center mt-4">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login" className="link link-primary font-medium">Login here</Link>
            </div>

            {/* Sign Up Button */}
            <button 
              type="submit" 
              className="btn btn-primary w-full mt-4 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Create Account 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}