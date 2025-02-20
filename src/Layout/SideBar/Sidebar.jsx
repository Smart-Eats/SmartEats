import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css"; 
import { DarkMode } from "../../Store/DarkModeStore";
const Sidebar = () => {
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
              <img src="./Images/logo.png" alt="Logo" />
            </span>
            <div className="text logo-text">
              <span className="name">Codinglab</span>
              <span className="profession">Web developer</span>
            </div>
          </div>
          <i className="bx bx-chevron-right toggle" onClick={toggleSidebar}></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <li className="search-box">
              <i className="bx bx-search icon"></i>
              <input type="text" placeholder="Search..." />
            </li>

            <ul className="menu-links">
             
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-bar-chart-alt-2 icon"></i>
                  <span className="text nav-text">Revenue</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-bell icon"></i>
                  <span className="text nav-text">Notifications</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-pie-chart-alt icon"></i>
                  <span className="text nav-text">Analytics</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-heart icon"></i>
                  <span className="text nav-text">Likes</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-wallet icon"></i>
                  <span className="text nav-text">Wallets</span>
                </a>
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