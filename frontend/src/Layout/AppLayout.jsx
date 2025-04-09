import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar/Sidebar";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import "./AppLayout.css";
const AppLayout = ({ showSidebar = true }) => {
  return (
    <div className="layout">
      {showSidebar && <Sidebar />}

      <div
        className={`content ${
          showSidebar ? "with-sidebar" : "without-sidebar"
        }`}
      >
        <Navbar />
        <div className="main">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
