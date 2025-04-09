import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css"; 
import { DarkMode } from "../../Store/DarkModeStore";
import {NavLink, useNavigate} from 'react-router-dom'
import { GoUpload } from "react-icons/go";
const Sidebar = () => {
  const navigate = useNavigate()
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {isDarkMode,setIsDarkMode} = useContext(DarkMode);
    useEffect(()=>{
    setIsSidebarOpen(true);
  },[])
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark", !isDarkMode);
  };

  return (
    <>
      <nav className={`sidebar ${isSidebarOpen ? "close" : ""}`}>
        <header>
          <div className="image-text">
            <span className="image">
              <img src="./Images/logo.jpg" alt="Logo" onClick={()=>{navigate('/')}}/>
            </span>
            <div className="text logo-text">
              <span className="name"><span className="firsTLetter">S</span>mart </span>
              <span className="profession"> <span className="firsTLetter">E</span>ats</span>
            </div>
          </div>
          <i className="bx bx-chevron-right toggle" onClick={toggleSidebar}></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            

            <ul className="menu-links">
             
              <li className="nav-link">
                <NavLink to='/upload'>
                  <i className="bx bx-upload icon upload"></i>
                  <span className="text nav-text">Upload Image</span>
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink to='/calorieCounter'>
                  <img src="./Images/calories.png" className="icon img_icon" alt="" srcset="" />
                  <span className="text nav-text">Calorie Counter</span>
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink to='/bmiCalculator'>
                  <img src="./Images/bmi.png" className="icon img_icon" alt="" srcset="" />
                  <span className="text nav-text">BMI</span>
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink to='/meal'>
                  <img src="./Images/meal.png" alt="" srcset="" className="icon img_icon"/>
                  <span className="text nav-text">Meal Planning</span>
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink to='/chatBot'>
                  <img src="/Images/chatbot.png" className="icon img_icon" alt="" srcset="" />
                  <span className="text nav-text">Chat Bot</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="bottom-content">
            <li className="">
              <a href="#">
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </a>
            </li>

            <li className="mode">
              <div className="sun-moon">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>
              <span className="mode-text text">
                {isDarkMode ? "Light mode" : "Dark mode"}
              </span>
              <div className="toggle-switch" onClick={toggleDarkMode}>
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;