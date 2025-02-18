import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import FeaturesPage from "./Pages/FeaturesPage";
import ContactPage from "./Pages/ContactPage";
import MainLoginPage from "./Components/Login_Signup/MainLoginPage";
import AppLayout from "./Layout/AppLayout";
import ErrorPage from "./Components/Error/ErrorPage";
import "./index.css";
import Sidebar from "./Layout/SideBar/Sidebar";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement:<ErrorPage/>,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
          path: "/feature",
          element: <FeaturesPage />,
        },
        
      ],
    },
    {
      path: "/login",
      element: <MainLoginPage />,
    },
    {
      path: "/sidebar",
      element: <Sidebar />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
