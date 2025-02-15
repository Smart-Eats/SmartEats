import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="nav-container">
        <div className="logo">
          <h1>SmartEats</h1>
        </div>
        <div className="nav-sec">
          <ul className="navbar-list">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/feature">Feature</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
        <div className="button-sec">
          <button className="login-but">Log In</button>
          <button className="signup-but">Sign Up</button>
        </div>
      </div>
    </>
  );
};

export default Header;
