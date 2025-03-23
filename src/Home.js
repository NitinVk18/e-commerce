import React from "react";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center font-poppins">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 animate-fadeIn">
        Welcome to the Home Page
      </h1>
      <a
        href="login"
        className="px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg shadow-md transition-all duration-300 transform hover:bg-blue-600 hover:scale-105 focus:ring-4 focus:ring-blue-300"
      >
        Login
      </a>
    </div>
  );
}
