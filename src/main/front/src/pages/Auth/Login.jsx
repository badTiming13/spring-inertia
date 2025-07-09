import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import { User, Lock, AlertTriangle, Eye, EyeOff } from 'lucide-react';

export default function Login({ error }) {
  const { data, setData } = useForm({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center justify-center">
        
        {/* Left Side - Form */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 relative z-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 flex items-center justify-center">
                <img src="/m.svg" alt="Logo" className="w-32 h-32 object-contain" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
        
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center text-red-700">
              <AlertTriangle className="h-5 w-5 mr-3 text-red-500 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form
            action="/login"
            method="post"
            data-inertia="false"
            className="space-y-6"
          >
            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                User name
              </label>
              <div className="relative">
                <input
                  name="username"
                  type="text"
                  value={data.username}
                  onChange={e => setData("username", e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
                  placeholder="Enter user name"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  onChange={e => setData("password", e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

           

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 px-6 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">Don't have an account </span>
            <a href="#" className="text-sm text-pink-600 hover:text-pink-700 font-medium">
              Register here
            </a>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:block lg:w-1/2 lg:ml-16">
          <div className="relative">
            {/* Background Elements */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-40 -right-10 w-32 h-32 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>

            {/* Main Illustration Container */}
            <div className="relative bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl p-12 shadow-2xl">
              
              {/* Security Elements */}
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  {/* Shield/Lock Icon */}
                  <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                    <Lock className="h-12 w-12 text-white" />
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-300 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Decorative Lines */}
              <div className="space-y-3 mb-8">
                <div className="h-2 bg-pink-300 rounded-full w-3/4 mx-auto animate-pulse"></div>
                <div className="h-2 bg-pink-400 rounded-full w-1/2 mx-auto animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="h-2 bg-pink-300 rounded-full w-2/3 mx-auto animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

              {/* Bottom Elements */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                  <Lock className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Decorative Plants/Elements */}
              <div className="absolute bottom-0 left-4">
                <div className="w-2 h-16 bg-gradient-to-t from-pink-600 to-pink-400 rounded-full"></div>
                <div className="w-8 h-8 bg-pink-400 rounded-full -mt-2 ml-1"></div>
              </div>
              
              <div className="absolute top-8 right-8">
                <div className="w-4 h-12 bg-gradient-to-t from-pink-500 to-pink-300 rounded-full transform rotate-12"></div>
                <div className="w-6 h-6 bg-pink-300 rounded-full -mt-1 ml-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}