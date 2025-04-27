import React, { useState } from 'react';
import { Link } from "react-router-dom";
import useLogin from '../hooks/useLogin';

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    rememberMe: false
  });

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="card w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl border border-white/30">
        <div className="card-body p-8">
          {/* Header with logo */}
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl font-bold text-center mb-2">
              <span className="text-gray-800">Welcome to </span>
              <span className="text-primary">Chatter</span>
              <span className="text-secondary">Box</span> 💬
            </h1>
            <p className="text-gray-500">Your friendly neighborhood chat app</p>
          </div>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-600">Username</span>
              </label>
              <input
                type="text"
                placeholder="cool_user123"
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                className="input input-bordered w-full bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary text-gray-800 placeholder-gray-500"
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-600">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                className="input input-bordered w-full bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary text-gray-800 placeholder-gray-500"
                required
                minLength={6}
              />
            </div>

            {/* Remember Me */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={inputs.rememberMe}
                  onChange={(e) => setInputs({ ...inputs, rememberMe: e.target.checked })}
                />
                <span className="label-text text-gray-600">Keep me logged in</span>
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-4 rounded-xl shadow-md hover:shadow-lg transition-all"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Let's Chat! 🚀"
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-4">
              <span className="text-gray-600">New here? </span>
              <Link to="/signup" className="link link-primary font-medium">Join the fun!</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}