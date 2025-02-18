import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Pages/Footer'
import Sidebar from './SideBar/Sidebar';
import './AppLayout.css';
const AppLayout = ({ showSidebar = true }) => {
  return (
    <div className="layout">
      {showSidebar && <Sidebar />} 
      <div className={`content ${showSidebar ? 'with-sidebar' : 'without-sidebar'}`}>
        <Outlet /> 
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default AppLayout