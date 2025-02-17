import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Pages/Header';
import Footer from '../Pages/Footer'
const AppLayout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default AppLayout