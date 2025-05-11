import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css"; 
import {NavLink, useNavigate} from 'react-router-dom'
import axios from "axios";

const Sidebar = () => {
  const urlApi = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    useEffect(()=>{
    setIsSidebarOpen(true);
  },[])
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${urlApi}/auth/smarteats/logout`,{
        withCredentials:true
      });
      navigate("/");
      
    } catch (error) {
      
    }
  }

  return (
    <>
      <nav className={`sidebar ${isSidebarOpen ? "close" : ""}`}>
        <header>
          <div className="image-text">
            <span className="image">
              <img src="/Images/logo.jpg" alt="Logo" onClick={()=>{navigate('/layout/home')}}/>
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
              <NavLink to="/layout/upload">
                  <i className="bx bx-upload icon upload"></i>
                  <span className="text nav-text">Upload Image</span>
                </NavLink>
              </li>
              <li className="nav-link">
              <NavLink to="/layout/barcode">
                  <img src="/Images/barcode/barcode-scan.png" className="icon img_icon" alt="" srcSet="" />
                  <span className="text nav-text">Upload Image</span>
                </NavLink>
              </li>
              <li className="nav-link">
              <NavLink to="/layout/nutrition-finder">
                  <img src="/Images/nutrition-finder.png" className="icon img_icon" alt="" srcSet="" />
                  <span className="text nav-text">Nutrition Finder</span>
                </NavLink>
              </li>
              <li className="nav-link">
              <NavLink to="bmi-calculator/select">
                  <img src="/Images/bmi.png" className="icon img_icon" alt="" srcSet="" />
                  <span className="text nav-text">BMI</span>
                </NavLink>
              </li>
              <li className="nav-link">
              <NavLink to="/layout/result">
                  <img src="/Images/preview.png" alt="" srcSet="" className="icon img_icon"/>
                  <span className="text nav-text">Output</span>
                </NavLink>
              </li>
              <li className="nav-link">
              <NavLink to="/layout/health-form">
                  <img src="/Images/form.png" className="icon img_icon" alt="" srcSet="" />
                  <span className="text nav-text">User Data</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="bottom-content">
            <li className=""> 
              <button  onClick={handleLogout} className="logout-button">
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </button>
            </li>

            
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;