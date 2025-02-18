import React from "react";
import { NavLink } from "react-router-dom";
// import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-gray-100 shadow-lg py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <h1 className="text-3xl font-extrabold text-blue-500">SmartEats</h1>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-8 ">
        {['/', '/about', '/feature', '/contact'].map((path, index) => (
          <NavLink
            key={index}
            to={path}
            className={({ isActive }) => `text-lg font-medium px-4 transition-colors ${isActive ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600 hover:text-blue-400'}`}
          >
            {path.replace('/', '') || 'Home'}
          </NavLink>
        ))}
      </nav>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button  className="px-4 py-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500">Log In</button>
        <button  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
